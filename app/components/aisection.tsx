"use client";
import { useState } from "react";

export default function AISection() {
  const [resume, setResume] = useState("");
  const [role, setRole] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!role.trim() || !resume.trim()) return;
    setLoading(true);
    setResult("");

    const res = await fetch("/api/cover-letter", {
      method: "POST",
      body: JSON.stringify({ role, resumeText: resume }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const charCount = resume.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cl-root {
          min-height: 100vh;
          background: #0d0d0d;
          color: #f0ece4;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 60px 24px 80px;
          position: relative;
          overflow: hidden;
        }

        .cl-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 80% 10%, rgba(212,175,90,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 10% 80%, rgba(212,175,90,0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        .cl-grid-lines {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none;
        }

        .cl-container {
          width: 100%;
          max-width: 760px;
          position: relative;
          z-index: 1;
        }

        .cl-header {
          margin-bottom: 52px;
        }

        .cl-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #d4af5a;
          margin-bottom: 16px;
        }

        .cl-eyebrow::before {
          content: '';
          width: 28px;
          height: 1px;
          background: #d4af5a;
        }

        .cl-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 6vw, 58px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #f0ece4;
        }

        .cl-title span {
          color: #d4af5a;
          font-style: italic;
        }

        .cl-subtitle {
          margin-top: 14px;
          font-size: 15px;
          color: rgba(240,236,228,0.45);
          font-weight: 300;
          line-height: 1.6;
          max-width: 460px;
        }

        .cl-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cl-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cl-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(240,236,228,0.5);
        }

        .cl-input,
        .cl-textarea {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          color: #f0ece4;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 300;
          transition: border-color 0.2s, background 0.2s;
          outline: none;
        }

        .cl-input {
          padding: 14px 18px;
        }

        .cl-textarea {
          padding: 16px 18px;
          resize: vertical;
          min-height: 200px;
          line-height: 1.65;
        }

        .cl-input::placeholder,
        .cl-textarea::placeholder {
          color: rgba(240,236,228,0.2);
        }

        .cl-input:focus,
        .cl-textarea:focus {
          border-color: rgba(212,175,90,0.5);
          background: rgba(255,255,255,0.06);
        }

        .cl-field-footer {
          display: flex;
          justify-content: flex-end;
        }

        .cl-count {
          font-size: 11px;
          color: rgba(240,236,228,0.25);
          letter-spacing: 0.05em;
        }

        .cl-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 32px;
          background: #d4af5a;
          color: #0d0d0d;
          border: none;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, opacity 0.2s;
          align-self: flex-start;
        }

        .cl-btn:hover:not(:disabled) {
          background: #e2c06a;
          transform: translateY(-1px);
        }

        .cl-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .cl-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .cl-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(13,13,13,0.3);
          border-top-color: #0d0d0d;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .cl-divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin: 8px 0;
        }

        .cl-result {
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: fadeUp 0.4s ease forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cl-result-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cl-result-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #d4af5a;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cl-result-label::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d4af5a;
        }

        .cl-copy-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 4px;
          color: rgba(240,236,228,0.55);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cl-copy-btn:hover {
          border-color: #d4af5a;
          color: #d4af5a;
        }

        .cl-result-body {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          padding: 28px 32px;
          font-size: 15px;
          line-height: 1.8;
          color: rgba(240,236,228,0.8);
          white-space: pre-line;
          font-weight: 300;
        }
      `}</style>

      <div className="cl-root">
        <div className="cl-grid-lines" />

        <div className="cl-container">
          <header className="cl-header">
            <div className="cl-eyebrow">AI-Powered</div>
            <h1 className="cl-title">
              Cover Letter<br />
              <span>Generator</span>
            </h1>
            <p className="cl-subtitle">
              Paste your resume, enter the role — get a tailored, compelling cover letter in seconds.
            </p>
          </header>

          <div className="cl-form">
            <div className="cl-field">
              <label className="cl-label">Job Role</label>
              <input
                className="cl-input"
                placeholder="e.g. Senior Product Designer at Stripe"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className="cl-field">
              <label className="cl-label">Your Resume</label>
              <textarea
                className="cl-textarea"
                placeholder="Paste your full resume here — work experience, skills, education..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                rows={10}
              />
              <div className="cl-field-footer">
                <span className="cl-count">{charCount.toLocaleString()} chars</span>
              </div>
            </div>

            <button
              className="cl-btn"
              onClick={generate}
              disabled={loading || !role.trim() || !resume.trim()}
            >
              {loading ? (
                <>
                  <span className="cl-spinner" />
                  Generating…
                </>
              ) : (
                "Generate Cover Letter"
              )}
            </button>

            {result && (
              <>
                <div className="cl-divider" />
                <div className="cl-result">
                  <div className="cl-result-header">
                    <span className="cl-result-label">Your Cover Letter</span>
                    <button className="cl-copy-btn" onClick={handleCopy}>
                      {copied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="cl-result-body">{result}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
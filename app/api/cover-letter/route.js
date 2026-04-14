export async function POST(req) {
  try {
    const { resumeText, role } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/auto",
        messages: [
          {
            role: "user",
            content: `Write a professional cover letter for ${role} using this resume:\n${resumeText}`,
          },
        ],
      }),
    });

    
    if (!response.ok) {
      const text = await response.text();
      console.error("OPENROUTER ERROR:", text);

      return Response.json(
        { error: "AI API failed", details: text },
        { status: 500 }
      );
    }

    const data = await response.json();

    console.log("AI RESPONSE:", data); // 👈 IMPORTANT

    const resultText =
      data?.choices?.[0]?.message?.content;

    if (!resultText) {
      return Response.json({
        result: "⚠️ AI returned empty response",
      });
    }

    return Response.json({ result: resultText });

  } catch (error) {
    console.error("SERVER ERROR:", error);

    return Response.json(
      { error: "Server failed" },
      { status: 500 }
    );
  }
}
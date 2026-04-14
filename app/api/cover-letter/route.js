import { connectDB } from "@/lib/mongodb";
import CoverLetter from "@/models/CoverLetter";

export async function POST(req) {
  const { resumeText, role } = await req.json();

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openrouter/auto",
        messages: [
          {
            role: "user",
            content: `Write a professional cover letter for this job role: ${role}
            
Resume:
${resumeText}

Make it concise and professional.`,
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("API RESPONSE:", data);

    return Response.json({
      result: data.choices?.[0]?.message?.content,
    });

  } catch (error) {
    console.error("ERROR:", error);

    return Response.json({
      error: error.message,
    });
  }
}
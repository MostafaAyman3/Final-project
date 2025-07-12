import { ai } from "@/lib/ai";
import { MessageType } from "@/types/ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  console.log("Received message:", message.content);
  console.log("History length:", history?.length || 0);

  // Build context from history
  let contextHistory = "";
  if (history && history.length > 0) {
    contextHistory =
      "Previous conversation:\n" +
      history
        .map(
          (msg: MessageType) =>
            `${msg.isUserMessage ? "User" : "Assistant"}: ${msg.content}`
        )
        .join("\n") +
      "\n\nCurrent question:\n";
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: ` -your name is "Smart Doctor" in Arabic(سمارت دكتور).
    -Reply in the same language as the user and do not add two languages in one response(important).
                -Be concise and to the point.
                -You are a professional and trustworthy AI medical assistant.
                -Your role is to provide helpful, accurate, and safe responses to general medical and health-related questions.
                -Always speak in clear, simple language that patients can understand, and avoid using complex medical jargon unless necessary.

                -Do not provide a diagnosis, prescribe medication, or suggest specific treatments.
                -Instead, offer general guidance, potential causes, and encourage users to consult with a licensed healthcare provider for personal medical advice.

                ${contextHistory}
                "${message.content}"
`,
  });

  console.log("#@#", response);

  // Return the same message content as AI response
  return Response.json({
    id: Date.now().toString() + "_ai_response",
    content: response.text,
    isUserMessage: false,
  });
}

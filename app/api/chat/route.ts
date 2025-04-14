import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Get the last user message
    const lastUserMessage = messages.filter((m: any) => m.role === "user").pop()

    if (!lastUserMessage) {
      return Response.json({
        role: "assistant",
        content: "नमस्ते! मैं आपकी कैसे मदद कर सकता हूं?",
      })
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: lastUserMessage.content,
      system:
        "You are a helpful assistant for Shram Setu, a platform that connects workers with employers. You help workers find jobs, create profiles, understand job requirements, and navigate the job market. Be friendly, supportive, and provide practical advice for workers looking for employment opportunities. When appropriate, respond in Hindi to make workers feel more comfortable.",
    })

    return Response.json({
      role: "assistant",
      content: text,
    })
  } catch (error) {
    console.error(error)
    return Response.json(
      {
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again later.",
      },
      {
        status: 500,
      },
    )
  }
}

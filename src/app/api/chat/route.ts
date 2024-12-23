import { createOllama } from "ollama-ai-provider";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const ollama = createOllama();

export async function POST(req: Request): Promise<Response> {
  try {
    const { messages }: { messages: { content: string; role: string }[] } =
      await req.json();
    console.log("messages: ", messages);

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid messages format", { status: 400 });
    }

    const formattedMessages = messages.map((message) => ({
      ...message,
      role: message.role || "user", // Default role to "user" if not provided
    }));

    const result = streamText({
      // model: ollama("qwen2.5:latest"),
      model: ollama("phi3"),
      messages: formattedMessages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

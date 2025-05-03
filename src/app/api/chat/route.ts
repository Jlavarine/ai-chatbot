export const runtime = "edge";

import Together from "together-ai";

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY!,
});

interface RequestBody {
  messages: Together.Chat.Completions.CompletionCreateParams.Message[];
  model: string;
}

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const { messages, model } = body;

    const response = await together.chat.completions.create({
      model,
      messages,
      stream: true,
    });

    return new Response(response.toReadableStream());
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";

    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

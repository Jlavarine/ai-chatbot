export const runtime = "edge";

import Together from "together-ai";

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages, model } = (await req.json()) as {
      messages: Together.Chat.Completions.CompletionCreateParams.Message[];
      model: string;
    };

    const response = await together.chat.completions.create({
      model,
      messages,
      stream: true,
    });

    return new Response(response.toReadableStream());
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

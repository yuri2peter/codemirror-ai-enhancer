import { Queue } from "./queue";

export function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function errorResponse(error: unknown, status = 500) {
  let message = String(error);
  if (error instanceof Error) {
    message = error.message;
  }
  return jsonResponse({ error: message }, status);
}

// SSE response, used for streaming text
// For the client, use "@/lib/fetch-event-source" to receive the stream
export function generateSseResponse(
  task: (textWriter: (text: string) => void) => Promise<void>,
) {
  const outputStream = new TransformStream();
  const writer = outputStream.writable.getWriter();
  const writeQueue = new Queue();
  const writeTextPlain = async (text: string) => {
    try {
      await writer.ready;
      const encoder = new TextEncoder();
      const data = `data: ${text}\n\n`;
      await writer.write(encoder.encode(data));
    } catch (error) {
      console.error("Error writing text:", error);
    }
  };
  const writeText = (text: string) => {
    writeQueue.add(writeTextPlain(text));
  };
  // Create a response immediately with the readable stream
  const response = new Response(outputStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });

  // Handle the task and writer closure in the background
  (async () => {
    try {
      await task(writeText);
    } catch (error) {
      console.error("Stream task error:", error);
    }
    await writeQueue.allCleared();
    writer.close();
  })();

  return response;
}

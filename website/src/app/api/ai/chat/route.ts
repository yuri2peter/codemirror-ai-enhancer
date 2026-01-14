import { guard } from 'radash';
import { google } from "@ai-sdk/google";
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { convertToModelMessages, streamText } from "ai";
import { CounterBasedRateLimiter } from '@/lib/rateLimiter/CounterBasedRateLimiter';
import { generateSseResponse } from "@/lib/sse.server";

export const maxDuration = 60; // for vercel hosting

const rateLimiter = new CounterBasedRateLimiter({
  max: 20,
  windowSeconds: 2 * 60 * 60,
});

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
  const isLimited = rateLimiter.acquire(ip);
  if (isLimited) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  const body = await guard(() => req.json());
  const parsedBody = z
    .object({
      prompt: z.string().min(1),
    })
    .safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(
      { error: parsedBody.error.message },
      { status: 400 }
    );
  }

  const { prompt } = parsedBody.data;

  const headers = new Headers();
  headers.set('Content-Type', 'text/event-stream');
  headers.set('Cache-Control', 'no-cache');
  headers.set('Connection', 'keep-alive');

  const result = streamText({
    model: google("gemini-2.5-flash"),
    providerOptions: {
      google: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    },
    messages: await convertToModelMessages([
      {
        role: "user",
        parts: [{ type: "text", text: prompt }],
      },
    ]),
  });

  return generateSseResponse(async (textWriter) => {
    for await (const chunk of result.textStream) {
      textWriter(JSON.stringify({ delta: chunk }));
    }
  });
}

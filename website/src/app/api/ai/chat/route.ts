import { guard } from 'radash';
import { NextRequest, NextResponse } from 'next/server';
import { generateOpenaiContent, generateOpenaiContentStream } from '@/lib/ai';
import { ChatHistorySchema } from '@/lib/ai';
import { z } from 'zod';
import { zodSafeType, zodSafeBoolean } from '@/lib/zod';
import { CounterBasedRateLimiter } from '@/lib/rateLimiter/CounterBasedRateLimiter';

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
      history: zodSafeType(ChatHistorySchema, []),
      stream: zodSafeBoolean(),
    })
    .safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(
      { error: parsedBody.error.message },
      { status: 400 }
    );
  }

  const { prompt, history, stream } = parsedBody.data;

  // 设置响应头，指定内容类型为text/event-stream
  const headers = new Headers();
  headers.set('Content-Type', 'text/event-stream');
  headers.set('Cache-Control', 'no-cache');
  headers.set('Connection', 'keep-alive');

  if (stream) {
    const outputStream = new TransformStream();
    const writer = outputStream.writable.getWriter();

    // 使用 generateOpenaiContentStream 函数处理流式响应
    generateOpenaiContentStream(
      prompt,
      history,
      async (completeText, chunkText) => {
        await writer.write(
          new TextEncoder().encode(
            `data: ${JSON.stringify({ completeText, chunkText })}\n\n`
          )
        );
      }
    )
      .then(() => {
        writer.close();
      })
      .catch(async (error) => {
        console.error('Error in generateOpenaiContentStream:', error);
        await writer.write(
          new TextEncoder().encode(
            `data: ${JSON.stringify({ error: 'An error occurred' })}\n\n`
          )
        );
        writer.close();
      });

    return new NextResponse(outputStream.readable, { headers });
  } else {
    try {
      const result = await generateOpenaiContent(prompt, history);
      return NextResponse.json({ result });
    } catch (error) {
      console.error('Error in generateOpenaiContent', error);
      return NextResponse.json({ error: 'An error occurred' });
    }
  }
}

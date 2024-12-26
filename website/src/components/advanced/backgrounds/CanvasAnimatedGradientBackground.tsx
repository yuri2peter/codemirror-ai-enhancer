'use client';

import { useEffect, useRef } from 'react';
import { Slider } from '@/components/ui/slider';

export interface Params {
  r1?: number;
  r2?: number;
  g1?: number;
  g2?: number;
  b1?: number;
  b2?: number;
  speed?: number; // 1 ~ 5
}

export default function CanvasAnimatedGradientBackground({
  r1 = 192,
  r2 = 256,
  g1 = 192,
  g2 = 256,
  b1 = 192,
  b2 = 256,
  speed = 3,
}: Params) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let time = 0;
    let running = true;
    const fillColor = function (
      x: number,
      y: number,
      r: number,
      g: number,
      b: number
    ) {
      context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.fillRect(x, y, 10, 10);
    };
    const R = function (x: number, y: number, time: number) {
      return Math.floor(
        r1 + (r2 - r1) * Math.cos((x * x - y * y) / 300 + time)
      );
    };
    const G = function (x: number, y: number, time: number) {
      return Math.floor(
        g1 +
          (g2 - g1) *
            Math.sin(
              (x * x * Math.cos(time / 4) + y * y * Math.sin(time / 3)) / 300
            )
      );
    };
    const B = function (x: number, y: number, time: number) {
      return Math.floor(
        b1 +
          (b2 - b1) *
            Math.sin(
              5 * Math.sin(time / 9) +
                ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
            )
      );
    };
    const startAnimation = function () {
      if (!running) return;
      for (let x = 0; x <= 31; x++) {
        for (let y = 0; y <= 31; y++) {
          fillColor(x, y, R(x, y, time), G(x, y, time), B(x, y, time));
        }
      }
      time = time + speed * 0.01;
      requestAnimationFrame(startAnimation);
    };

    startAnimation();
    return () => {
      running = false;
    };
  }, [r1, r2, g1, g2, b1, b2, speed]);
  return (
    <canvas width={32} height={32} ref={canvasRef} className="w-full h-full" />
  );
}

export function CanvasAnimatedGradientBackgroundControls({
  value,
  onChange,
}: {
  value: Params;
  onChange: (value: Params) => void;
}) {
  const {
    r1 = 192,
    r2 = 256,
    g1 = 192,
    g2 = 256,
    b1 = 192,
    b2 = 256,
    speed = 3,
  } = value;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <span>Speed: </span>
        <Slider
          min={1}
          max={5}
          value={[speed]}
          onValueChange={(range) => onChange({ ...value, speed: range[0] })}
        />
      </div>
      <div className="flex gap-2">
        <span>R: </span>
        <Slider
          min={0}
          max={256}
          value={[r1, r2]}
          onValueChange={(range) =>
            onChange({ ...value, r1: range[0], r2: range[1] })
          }
        />
      </div>
      <div className="flex gap-2">
        <span>G: </span>
        <Slider
          min={0}
          max={256}
          value={[g1, g2]}
          onValueChange={(range) =>
            onChange({ ...value, g1: range[0], g2: range[1] })
          }
        />
      </div>
      <div className="flex gap-2">
        <span>B: </span>
        <Slider
          min={0}
          max={256}
          value={[b1, b2]}
          onValueChange={(range) =>
            onChange({ ...value, b1: range[0], b2: range[1] })
          }
        />
      </div>
    </div>
  );
}

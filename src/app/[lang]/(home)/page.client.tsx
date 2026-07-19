'use client';

import { useEffect, useRef } from 'react';

type Point = {
  x: number;
  y: number;
  phase: number;
  speed: number;
};

function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  ctx.save();
  ctx.strokeStyle = 'rgba(151, 235, 225, 0.09)';
  ctx.lineWidth = 1;

  const offsetX = (time * 0.018) % 88;
  const offsetY = (time * 0.012) % 88;

  for (let x = -offsetX; x < width; x += 88) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = -offsetY; y < height; y += 88) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.restore();
}

function drawSphere(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  const cx = width * 0.72;
  const cy = height * 0.47;
  const radius = Math.min(width, height) * (width < 760 ? 0.26 : 0.31);

  const glow = ctx.createRadialGradient(
    cx - radius * 0.35,
    cy - radius * 0.35,
    radius * 0.08,
    cx,
    cy,
    radius * 1.35
  );
  glow.addColorStop(0, 'rgba(125, 255, 221, 0.64)');
  glow.addColorStop(0.36, 'rgba(30, 154, 144, 0.38)');
  glow.addColorStop(0.72, 'rgba(8, 44, 48, 0.46)');
  glow.addColorStop(1, 'rgba(94, 242, 220, 0.02)');

  ctx.save();
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.12, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(94, 242, 220, 0.34)';
  ctx.lineWidth = 1;

  for (let i = -3; i <= 3; i += 1) {
    const wobble = Math.sin(time * 0.0012 + i) * radius * 0.015;
    ctx.beginPath();
    ctx.ellipse(
      cx,
      cy + i * radius * 0.16 + wobble,
      radius * 0.96,
      radius * (0.13 + Math.abs(i) * 0.055),
      0,
      0,
      Math.PI * 2
    );
    ctx.stroke();
  }

  for (let i = -2; i <= 2; i += 1) {
    ctx.beginPath();
    ctx.ellipse(
      cx,
      cy,
      radius * (0.2 + Math.abs(i) * 0.17),
      radius * 0.96,
      Math.sin(time * 0.0005) * 0.14,
      0,
      Math.PI * 2
    );
    ctx.stroke();
  }

  ctx.restore();
}

function drawNetwork(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: { x: number; y: number },
  points: Point[]
) {
  const activePoints = points.map((point) => ({
    x:
      point.x * width +
      Math.cos(time * point.speed + point.phase) * Math.min(width, 160) * 0.05,
    y:
      point.y * height +
      Math.sin(time * point.speed + point.phase) * Math.min(height, 120) * 0.06,
  }));

  ctx.save();
  for (let i = 0; i < activePoints.length; i += 1) {
    for (let j = i + 1; j < activePoints.length; j += 1) {
      const a = activePoints[i];
      const b = activePoints[j];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance > Math.min(width, 430) * 0.34) continue;

      const opacity = Math.max(0, 1 - distance / 260);
      ctx.strokeStyle = `rgba(94, 242, 220, ${0.08 + opacity * 0.2})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }

  for (const point of activePoints) {
    const pointerBoost =
      pointer.x >= 0
        ? Math.max(
            0,
            1 - Math.hypot(point.x - pointer.x, point.y - pointer.y) / 220
          )
        : 0;
    ctx.fillStyle = `rgba(134, 240, 141, ${0.34 + pointerBoost * 0.45})`;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2.4 + pointerBoost * 2.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    const points: Point[] = [
      { x: 0.16, y: 0.24, phase: 0.2, speed: 0.00048 },
      { x: 0.31, y: 0.42, phase: 1.4, speed: 0.00038 },
      { x: 0.45, y: 0.22, phase: 2.1, speed: 0.00042 },
      { x: 0.58, y: 0.56, phase: 0.8, speed: 0.00036 },
      { x: 0.74, y: 0.34, phase: 2.8, speed: 0.0004 },
      { x: 0.83, y: 0.66, phase: 1.9, speed: 0.00032 },
      { x: 0.22, y: 0.68, phase: 2.5, speed: 0.00044 },
      { x: 0.41, y: 0.78, phase: 1.1, speed: 0.00034 },
    ];

    let raf = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: -1, y: -1 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#030607';
      ctx.fillRect(0, 0, width, height);

      const wash = ctx.createLinearGradient(0, 0, width, height);
      wash.addColorStop(0, 'rgba(94, 242, 220, 0.16)');
      wash.addColorStop(0.46, 'rgba(9, 28, 32, 0.2)');
      wash.addColorStop(1, 'rgba(255, 200, 87, 0.08)');
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      drawGrid(ctx, width, height, time);
      drawSphere(ctx, width, height, time);
      drawNetwork(ctx, width, height, time, pointer, points);

      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.18,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.72
      );
      vignette.addColorStop(0, 'rgba(3, 6, 7, 0)');
      vignette.addColorStop(1, 'rgba(3, 6, 7, 0.78)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const frame = (time: number) => {
      draw(time);
      if (!reduceMotion) raf = requestAnimationFrame(frame);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onPointerLeave = () => {
      pointer.x = -1;
      pointer.y = -1;
    };

    resize();
    frame(0);

    window.addEventListener('resize', resize, { passive: true });
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 size-full bg-[#030607]"
    />
  );
}

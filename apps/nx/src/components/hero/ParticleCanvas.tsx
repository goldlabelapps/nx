"use client";

import React, { useEffect, useRef } from "react";
import { siteConfig } from "@/config";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAlpha: number;
  alpha: number;
  phase: number;
  twinkleSpeed: number;
  isSparkle: boolean;
}

export function ParticleCanvas({ className = "absolute inset-0 w-full h-full pointer-events-none" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const particles: Particle[] = [];

    const colors = siteConfig.hero.particleField.colors || [
      "#0f172a",
      "#1e293b",
      "#475569",
      "#64748b",
      "#94a3b8",
    ];

    const initParticles = (targetCount: number, w: number, h: number) => {
      particles.length = 0;
      for (let i = 0; i < targetCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const maxSpeed = siteConfig.hero.particleField.maxSpeed || 0.45;
        const isSparkle = Math.random() > 0.65;

        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * maxSpeed,
          vy: (Math.random() - 0.5) * maxSpeed,
          radius: isSparkle ? Math.random() * 2.5 + 1.2 : Math.random() * 1.8 + 0.8,
          color,
          baseAlpha: Math.random() * 0.35 + 0.25,
          alpha: Math.random() * 0.35 + 0.25,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.03 + 0.015,
          isSparkle,
        });
      }
    };

    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect ? canvas.getBoundingClientRect() : { width: 1200, height: 800 };
      const newWidth = Math.max(rect.width || 0, typeof window !== "undefined" ? window.innerWidth : 1200, 300);
      const newHeight = Math.max(rect.height || 0, canvas.parentElement?.offsetHeight || 600, 300);

      dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      canvas.width = Math.round(newWidth * dpr);
      canvas.height = Math.round(newHeight * dpr);
      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;

      if (typeof ctx.setTransform === "function") {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      if (typeof ctx.scale === "function") {
        ctx.scale(dpr, dpr);
      }

      // If dimensions change significantly or first initialization, rescale or populate particles
      if (particles.length === 0) {
        const baseCount = siteConfig.hero.particleField.count || 85;
        const calculatedCount = Math.min(baseCount * 1.5, Math.max(40, Math.floor((newWidth * newHeight) / 12000)));
        initParticles(calculatedCount, newWidth, newHeight);
      } else if (width > 0 && height > 0) {
        const scaleX = newWidth / width;
        const scaleY = newHeight / height;
        for (const p of particles) {
          p.x *= scaleX;
          p.y *= scaleY;
        }
      }

      width = newWidth;
      height = newHeight;
    };

    // Initial setup
    resizeCanvas();

    // Use ResizeObserver for accurate sizing across dynamic layout updates
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
      });
      if (canvas.parentElement) {
        resizeObserver.observe(canvas.parentElement);
      }
      resizeObserver.observe(canvas);
    }

    window.addEventListener("resize", resizeCanvas);

    // Track mouse coordinates across the entire viewport
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect ? canvas.getBoundingClientRect() : { left: 0, top: 0 };
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const maxDistance = siteConfig.hero.particleField.connectionDistance || 140;

    const render = () => {
      if (!ctx || width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      if (typeof ctx.clearRect === "function") {
        ctx.clearRect(0, 0, width, height);
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift motion
        p.x += p.vx;
        p.y += p.vy;

        // Twinkle sparkle phase update
        p.phase += p.twinkleSpeed;
        const oscillation = Math.sin(p.phase);
        p.alpha = Math.max(0.1, Math.min(0.9, p.baseAlpha + oscillation * 0.3));

        // Seamless wrap around edges with buffer
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        // Interactive mouse repulsion scatter
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 160;

          if (dist < repelRadius && dist > 0.01) {
            const force = (repelRadius - dist) / repelRadius;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 3.5;
            p.y += Math.sin(angle) * force * 3.5;
          }
        }

        // Render Particle Body
        if (typeof ctx.save === "function") {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          // Render 4-point sparkle cross flare on bright twinkle cycles
          if (p.isSparkle && oscillation > 0.5) {
            const flareLen = p.radius * (1.5 + oscillation * 1.5);
            ctx.beginPath();
            ctx.moveTo(p.x - flareLen, p.y);
            ctx.lineTo(p.x + flareLen, p.y);
            ctx.moveTo(p.x, p.y - flareLen);
            ctx.lineTo(p.x, p.y + flareLen);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.75;
            ctx.globalAlpha = (oscillation - 0.5) * 0.8;
            ctx.stroke();
          }
          ctx.restore();
        }

        // Draw dynamic connection mesh
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance && typeof ctx.beginPath === "function") {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / maxDistance) * 0.12 * Math.min(p.alpha, p2.alpha);
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    />
  );
}

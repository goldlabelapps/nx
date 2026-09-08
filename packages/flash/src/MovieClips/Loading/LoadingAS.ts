"use client";

import { gsap } from 'gsap';
import type { ActionScriptOptions } from '../../types';

export class LoadingAS {
  private onDone?: () => void;
  private mc?: React.RefObject<unknown>;
  private timeline?: gsap.core.Timeline;

  constructor(onDone?: () => void, mcRef?: React.RefObject<unknown>) {
    this.onDone = onDone;
    this.mc = mcRef;
  }

  init() {
    if (this.onDone) {
      this.onDone();
    }
  }

  destroy() {
    if (this.timeline) {
      this.timeline.kill();
    }
  }
}

export function loadingActionScript({
  target,
  loop = true,
  onComplete,
  speed = 1,
}: ActionScriptOptions): gsap.core.Timeline {
  const root = target.querySelector('[data-loading-mc="true"]') as HTMLElement || target;
  const core = root.querySelector('[data-loading-core="true"]');
  const aura = root.querySelector('[data-loading-aura="true"]');
  const ringInner = root.querySelector('[data-loading-ring-inner="true"]');
  const ringOuter = root.querySelector('[data-loading-ring-outer="true"]');
  const characters = root.querySelectorAll<HTMLElement>('[data-loading-character]');
  const particles = root.querySelectorAll<HTMLElement>('[data-loading-particle="true"]');

  const width = root.offsetWidth || 320;
  const height = root.offsetHeight || 320;
  const centerX = width / 2;
  const centerY = height / 2;

  const attrRx = root.getAttribute('data-radius-x');
  const attrRy = root.getAttribute('data-radius-y');
  const rx = attrRx ? parseFloat(attrRx) : width * 0.38;
  const ry = attrRy ? parseFloat(attrRy) : height * 0.22;

  const tl = gsap.timeline({
    repeat: loop ? -1 : 0,
    onComplete,
  });

  tl.timeScale(speed);

  // 1. Orbit state manager for all character nodes
  if (characters.length > 0) {
    const orbitProxy = { progress: 0 };
    const charCount = characters.length;

    // Cache initial data for fast updates
    const charData = Array.from(characters).map((el, i) => {
      const baseAttr = el.getAttribute('data-base-angle');
      const baseAngle = baseAttr ? parseFloat(baseAttr) : (2 * Math.PI * i) / charCount;
      return { el, baseAngle, index: i };
    });

    const updateOrbit = () => {
      const currentProg = orbitProxy.progress;
      for (let i = 0; i < charData.length; i++) {
        const item = charData[i];
        const angle = item.baseAngle + currentProg * 2 * Math.PI;

        const x = centerX + Math.cos(angle) * rx;
        const y = centerY + Math.sin(angle) * ry;

        // Depth perspective (y > centerY is foreground, closer to camera)
        const sinVal = Math.sin(angle); // -1 (top/back) to 1 (bottom/front)
        const depth = (sinVal + 1) / 2; // 0 (back) to 1 (front)

        // Scale: 0.72 (back) to 1.16 (front)
        const scale = 0.72 + depth * 0.44;
        // Opacity: 0.55 (back) to 1.0 (front)
        const opacity = 0.55 + depth * 0.45;
        // Z-Index: 2 (back) to 25 (front)
        const zIndex = Math.round(2 + depth * 23);

        // Sinusoidal levitation bobbing
        const floatBob = Math.sin(angle * 3) * 2.5;

        gsap.set(item.el, {
          left: x,
          top: y + floatBob,
          scale,
          opacity,
          zIndex,
          transformOrigin: 'center center',
          overwrite: 'auto',
        });
      }
    };

    // Initial position sync
    updateOrbit();

    // Add continuous full 360-degree orbital rotation
    tl.to(
      orbitProxy,
      {
        progress: 1,
        duration: 9,
        ease: 'none',
        onUpdate: updateOrbit,
      },
      0,
    );
  }

  // 2. Central Core Breathing & Levitation
  if (core) {
    gsap.set(core, { scale: 1, transformOrigin: 'center center' });
    tl.to(
      core,
      {
        scale: 1.1,
        y: -4,
        duration: 1.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: loop ? -1 : 1,
      },
      0,
    );
  }

  // 3. Ethereal Aura Pulsing Glow
  if (aura) {
    gsap.set(aura, { scale: 1, opacity: 0.7, transformOrigin: 'center center' });
    tl.to(
      aura,
      {
        scale: 1.22,
        opacity: 0.95,
        duration: 2.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: loop ? -1 : 1,
      },
      0,
    );
  }

  // 4. Energy Rings subtle rotation / pulse
  if (ringInner) {
    tl.to(
      ringInner,
      {
        opacity: 0.6,
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: loop ? -1 : 1,
      },
      0,
    );
  }

  if (ringOuter) {
    tl.to(
      ringOuter,
      {
        opacity: 0.5,
        duration: 3.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: loop ? -1 : 1,
      },
      0,
    );
  }

  // 5. Ambient Stardust Sparkles Twinkle
  if (particles.length > 0) {
    particles.forEach((particle, idx) => {
      tl.to(
        particle,
        {
          scale: 1.6,
          opacity: 1,
          duration: 1.2 + (idx % 3) * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: loop ? -1 : 1,
        },
        idx * 0.25,
      );
    });
  }

  return tl;
}

export default LoadingAS;

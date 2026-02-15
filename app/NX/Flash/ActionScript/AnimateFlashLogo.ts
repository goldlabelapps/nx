import { gsap } from 'gsap';
// Framework for Macromedia logo animation (AS file)

export default class AnimateFlashLogo {
  id: string;
  onDone?: () => void;

  constructor(id: string, onDone?: () => void) {
    this.id = id;
    this.onDone = onDone;
  }

  // Initialize animation: fade in the Macromedia icon
  init() {
    const el = document.getElementById(this.id);
    if (el) {
      // Start very small and stretched
      // Randomize parameters for a unique effect each time
      const r = (min: number, max: number) => Math.random() * (max - min) + min;
      const startScaleX = r(0.05, 0.2);
      const startScaleY = r(2.0, 3.0);
      const popScaleX = r(1.8, 2.5);
      const popScaleY = r(0.4, 0.7);
      const popRotate = -r(480, 900);
      const popDuration = r(1.0, 1.6);
      const popBrightness = r(0.3, 0.8); // darken
      const stretchScaleX = r(0.5, 1.0);
      const stretchScaleY = r(2.0, 2.8);
      const stretchRotate = -r(700, 900);
      const stretchDuration = r(0.6, 1.1);
      const stretchBrightness = r(0.5, 1.0); // darken
      const snapScaleX = r(1.05, 1.25);
      const snapScaleY = r(0.7, 1.0);
      const snapRotate = r(10, 30) * (Math.random() > 0.5 ? 1 : -1);
      const snapDuration = r(0.4, 0.8);
      const settleDuration = r(0.6, 1.0);

      gsap.set(el, { scaleX: startScaleX, scaleY: startScaleY, rotate: 0, opacity: 0, filter: `brightness(${popBrightness})`, transformOrigin: '50% 50%' });
      gsap.timeline()
        // 1. Dramatic squash and stretch in, slow pop
        .to(el, {
          scaleX: popScaleX,
          scaleY: popScaleY,
          rotate: popRotate,
          opacity: 1,
          filter: `brightness(${popBrightness})`,
          duration: popDuration,
          ease: 'back.out(2)',
          transformOrigin: '50% 50%',
        })
        // 2. Over-rotate and stretch tall
        .to(el, {
          scaleX: stretchScaleX,
          scaleY: stretchScaleY,
          rotate: stretchRotate,
          filter: `brightness(${stretchBrightness})`,
          duration: stretchDuration,
          ease: 'power2.inOut',
        })
        // 3. Snap to slightly overshot, then settle
        .to(el, {
          scaleX: snapScaleX,
          scaleY: snapScaleY,
          rotate: snapRotate,
          duration: snapDuration,
          ease: 'elastic.out(1, 0.5)',
        })
        .to(el, {
          scaleX: 1,
          scaleY: 1,
          rotate: 0,
          filter: 'brightness(1)',
          duration: settleDuration,
          ease: 'power4.out',
          onComplete: () => {
            if (this.onDone) this.onDone();
          },
        });
    } else {
      console.warn('AnimateFlashLogo: element not found for id', this.id);
    }
  }

  // Clean up any listeners or animation (placeholder)
  destroy() {
    // Cleanup logic here
  }
}

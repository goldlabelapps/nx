import { gsap } from 'gsap';
// Framework for Macromedia logo animation (AS file)
export default class AnimateFlashLogo {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  // Initialize animation: fade in the Macromedia icon
  init() {

    const el = document.getElementById(this.id);
    if (el) {
      // Start very small and stretched
      gsap.set(el, { scale: 0.1, scaleY: 1.25, rotate: 0, opacity: 0, transformOrigin: '50% 50%' });

      // Animate: spin counterclockwise 2 times, grow, then normalize vertical scale
      gsap.timeline()
        // Spin and grow with ease-in
        .to(el, {
          scale: 1.2,
          rotate: -720, // 2 full turns counterclockwise
          duration: 2,
          ease: 'power4.inOut',
          // scaleY: 1.25,
          opacity: 1,
          transformOrigin: '50% 50%',
        })
        // Normalize vertical scale and size, stop spinning, with ease-out, start slightly before previous ends
        .to(el, {
          scale: 1,
          scaleY: 1,
          // rotate: 0,
          duration: 2,
          ease: 'power4.out',
          transformOrigin: '50% 50%',
        }, '-=0.4'); // Overlap by 0.4s
    } else {
      console.warn('AnimateFlashLogo: element not found for id', this.id);
    }
  }

  // Clean up any listeners or animation (placeholder)
  destroy() {
    // Cleanup logic here
  }
}

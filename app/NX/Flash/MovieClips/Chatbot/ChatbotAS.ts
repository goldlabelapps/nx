// Replay animation on HMR update (dev only)
if (import.meta && import.meta.hot) {
    import.meta.hot.accept(() => {
        if (window && (window as any).__chatbotASInstance) {
            (window as any).__chatbotASInstance.init();
        }
    });
}
import { gsap } from 'gsap';

export default class ChatbotAS {
    private onDone?: () => void;
    private mc?: React.RefObject<any>;

    constructor(onDone?: () => void, mcRef?: React.RefObject<any>) {
        this.onDone = onDone;
        this.mc = mcRef;
        if (typeof window !== 'undefined') {
            (window as any).__chatbotASInstance = this;
        }
    }

    init() {
        const el = this.mc?.current;
        if (el) {
            el.style.opacity = '0';
            el.style.visibility = 'visible';
            // Set initial scale using gsap.set to preserve translate(-50%, -50%)
            gsap.set(el, { scaleX: 1.25, scaleY: 1.25 });
            this.fadeIn();
        }
    }

    fadeIn() {
        const el = this.mc?.current;
        if (el) {
            gsap.to(el, {
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
                duration: 1,
                ease: 'power2.out',
            });
        }
    }

    fadeOut() {
        const el = this.mc?.current;
        if (el) {
            gsap.to(el, {
                opacity: 0,
                scaleY: 1.25,
                scaleX: 1.25,
                duration: 1,
                delay: 1.5,
                ease: 'power2.out',
                onComplete: this.onDone
            });
        } else if (this.onDone) {
            this.onDone();
        }
    }
}

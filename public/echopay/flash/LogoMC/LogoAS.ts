// Replay animation on HMR update (dev only)
if (import.meta && import.meta.hot) {
    import.meta.hot.accept(() => {
        if (window && (window as any).__logoASInstance) {
            (window as any).__logoASInstance.init();
        }
    });
}
import { gsap } from 'gsap';

export default class LogoAS {
    private onDone?: () => void;
    private mc?: React.RefObject<any>;

    constructor(onDone?: () => void, mcRef?: React.RefObject<any>) {
        this.onDone = onDone;
        this.mc = mcRef;
        if (typeof window !== 'undefined') {
            (window as any).__logoASInstance = this;
        }
    }

    init() {
        const el = this.mc?.current;
        if (el) {
            el.style.opacity = '0';
            el.style.visibility = 'visible';
            el.style.transform = 'scaleY(1.25)';
            el.style.transform = 'scaleX(1.25)';
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
                onComplete: this.fadeOut.bind(this)
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
                delay: 0.5,
                ease: 'power2.out',
                onComplete: this.onDone
            });
        } else if (this.onDone) {
            this.onDone();
        }
    }
}

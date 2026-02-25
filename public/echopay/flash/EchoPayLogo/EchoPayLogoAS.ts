
// Replay animation on HMR update (dev only)
if (import.meta && import.meta.hot) {
    import.meta.hot.accept(() => {
        if (window && (window as any).__logoASInstance) {
            (window as any).__logoASInstance.init();
        }
    });
}
import { gsap } from 'gsap';

export default class EchoPayLogoAS {
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
            el.style.transform = 'scaleY(0)';
            el.style.transform = 'scaleX(0.5)';
            this.fadeIn();
        }
    }

    /**
     * Animates each letter of ECHOPAY one after the other with a slight delay between each over one second.
     * Assumes each letter path in the SVG has id="letter-E", id="letter-C", etc.
     */
    echoText() {
        const el = this.mc?.current;
        if (!el) return;
        const letters = [
            'letter-E',
            'letter-C',
            'letter-H',
            'letter-O',
            'letter-P',
            'letter-A',
            'letter-Y'
        ];
        const letterEls = letters
            .map(id => el.querySelector(`#${id}`))
            .filter(Boolean);
        gsap.set(letterEls, { opacity: 0, y: 20, scale: 0.8 });
        gsap.to(letterEls, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out'
        });
    }

    fadeIn() {
        const el = this.mc?.current;
        if (el) {
            gsap.fromTo(
                el,
                {
                    opacity: 0,
                    scaleX: 0.5,
                    scaleY: 0,
                    rotate: -30
                },
                {
                    opacity: 1,
                    scaleX: 1,
                    scaleY: 1,
                    rotate: 0,
                    duration: 1.2,
                    ease: 'bounce.out',
                    onComplete: () => {
                        console.log('EchoPayLogoAS');
                    }
                }
            );
        }
    }

    fadeOut() {
        const el = this.mc?.current;
        if (el) {
            gsap.to(el, {
                opacity: 0,
                scaleY: 0.9, // Subtle scale down
                scaleX: 0.95, // Subtle scale down
                duration: 0.5,
                delay: 0.5,
                ease: 'power2.out',
                onComplete: this.onDone
            });
        } else if (this.onDone) {
            this.onDone();
        }
    }
}

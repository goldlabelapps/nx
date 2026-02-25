import { gsap } from 'gsap';

export default class LogoAS {
    private onDone?: () => void;
    private mc?: React.RefObject<any>;

    constructor(onDone?: () => void, mcRef?: React.RefObject<any>) {
        this.onDone = onDone;
        this.mc = mcRef;
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
            y: 35,
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
                },
                {
                    opacity: 1,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 1,
                    ease: 'expo.out',
                    onComplete: () => {
                        if (this.onDone) {
                            this.onDone();
                        }
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
                scaleY: 0.9,
                scaleX: 0.95,
                duration: 1,
                delay: 0.5,
                ease: 'expo.out',
                onComplete: this.onDone
            });
        } else if (this.onDone) {
            this.onDone();
        }
    }
}

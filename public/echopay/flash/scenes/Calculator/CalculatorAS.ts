import { gsap } from 'gsap';

export default class CalculatorAS {
    private onDone?: () => void;
    private iconRef?: React.RefObject<any>;

    constructor(onDone?: () => void, iconRef?: React.RefObject<any>) {
        this.onDone = onDone;
        this.iconRef = iconRef;
    }

    init() {
        // console.log('init...');
        // make the mc_echopay clip visible immediately (since Icon starts hidden)
        const mc = document.getElementById('mc_logo');
        if (mc) {
            gsap.set(mc, {
                opacity: 1,
            });
            // Trigger fadeInLogo in the Icon component if ref and method exist
            if (this.iconRef?.current?.fadeInLogo) {
                this.iconRef.current.fadeInLogo(1, {
                    onComplete: () => {
                        if (this.onDone) {
                            this.onDone();
                        }
                    }
                });
                return;
            }
        }
        // fallback: if no animation, call onDone immediately
        if (this.onDone) {
            this.onDone();
        }
    }

    destroy() {
        console.log('CalculatorAS destroyed');
    }
}

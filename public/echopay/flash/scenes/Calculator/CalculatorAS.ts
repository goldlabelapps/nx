import { gsap } from 'gsap';

export default class CalculatorAS {
    private onDone?: () => void;
    private iconRef?: React.RefObject<any>;
    private textRef?: React.RefObject<any>;

    constructor(onDone?: () => void, iconRef?: React.RefObject<any>, textRef?: React.RefObject<any>) {
        this.onDone = onDone;
        this.iconRef = iconRef;
        this.textRef = textRef;
    }

    init() {
        // console.log('init...');
        // make the mc_echopay clip visible immediately (since Icon starts hidden)
        const mc = document.getElementById('mc_logo');
        let animationCount = 0;
        let completedCount = 0;
        const handleComplete = () => {
            completedCount++;
            if (completedCount === animationCount && this.onDone) {
                this.onDone();
            }
        };
        if (mc) {
            gsap.set(mc, {
                opacity: 1,
            });
            // Trigger fadeInLogo and fadeInText in parallel if refs and methods exist
            if (this.iconRef?.current?.fadeInLogo) {
                animationCount++;
                this.iconRef.current.fadeInLogo(1, {
                    onComplete: handleComplete
                });
            }
            if (this.textRef?.current?.fadeInText) {
                animationCount++;
                this.textRef.current.fadeInText(1, {
                    onComplete: handleComplete
                });
            }
            if (animationCount > 0) {
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

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
        // make the mc_logo and mc_text clips visible immediately (since Icon starts hidden)
        const mcLogo = document.getElementById('mc_logo');
        const mcText = document.getElementById('mc_text');
        let animationCount = 0;
        let completedCount = 0;
        const handleComplete = () => {
            completedCount++;
            if (completedCount === animationCount && this.onDone) {
                this.onDone();
            }
        };
        if (mcLogo) {
            gsap.set(mcLogo, {
                opacity: 1,
            });
        }
        if (mcText) {
            gsap.set(mcText, {
                opacity: 1,
            });
        }
        // Trigger fadeInLogo first, then fadeInText after logo animation completes
        if (this.iconRef?.current?.fadeInLogo) {
            animationCount++;
            this.iconRef.current.fadeInLogo(1, {
                onComplete: () => {
                    handleComplete();
                    if (this.textRef?.current?.fadeInText) {
                        animationCount++;
                        this.textRef.current.fadeInText(1, {
                            onComplete: handleComplete
                        });
                    }
                }
            });
            return;
        }
        // If no logo animation, trigger text animation immediately if available
        if (this.textRef?.current?.fadeInText) {
            animationCount++;
            this.textRef.current.fadeInText(1, {
                onComplete: handleComplete
            });
            return;
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

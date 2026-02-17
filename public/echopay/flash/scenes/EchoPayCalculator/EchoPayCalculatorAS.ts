import { gsap } from 'gsap';

export default class EchoPayCalculatorAS {
    private onDone?: () => void;
    private iconRef?: React.RefObject<any>;
    private resultRef?: React.RefObject<any>;

    constructor(onDone?: () => void, iconRef?: React.RefObject<any>, resultRef?: React.RefObject<any>) {
        this.onDone = onDone;
        this.iconRef = iconRef;
        this.resultRef = resultRef;
    }

    init() {
        // console.log('init...');
        // make the mc_logo and mc_result clips visible immediately (since Icon starts hidden)
        const mcLogo = document.getElementById('mc_logo');
        // const mcResult = document.getElementById('mc_result');
        const handleTextFadeInComplete = () => {
            if (this.onDone) {
                this.onDone();
            }
        };
        if (mcLogo) {
            gsap.set(mcLogo, {
                opacity: 1,
            });
        }

        // Trigger fadeInLogo first, then fadeInText after logo animation completes
        if (this.iconRef?.current?.fadeInLogo) {
            this.iconRef.current.fadeInLogo(1, {
                onComplete: () => {
                    if (this.resultRef?.current?.fadeInText) {
                        this.resultRef.current.fadeInText(1, {
                            onComplete: handleTextFadeInComplete
                        });
                    } else {
                        handleTextFadeInComplete();
                    }
                }
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

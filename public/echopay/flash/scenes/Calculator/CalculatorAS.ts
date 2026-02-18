import { gsap } from 'gsap';

export default class EchoPayCalculatorAS {
    private onDone?: () => void;
    private iconRef?: React.RefObject<any>;
    private logoRef?: React.RefObject<any>;

    constructor(onDone?: () => void, iconRef?: React.RefObject<any>, logoRef?: React.RefObject<any>) {
        this.onDone = onDone;
        this.iconRef = iconRef;
        this.logoRef = logoRef;
    }

    init() {
        // make the mc_logo and mc_result clips visible immediately (since Icon starts hidden)
        const mcIcon = document.getElementById('mc_icon');
        const mcLogo = document.getElementById('mc_logo');

        const handleTextFadeInComplete = () => {
            if (this.onDone) {
                this.onDone();
            }
        };
        if (mcIcon) {
            gsap.set(mcIcon, {
                opacity: 1,
            });
        }
        if (mcLogo) {
            gsap.set(mcLogo, { opacity: 0 });
        }

        // Trigger fadeInLogo first, then fadeInText after logo animation completes
        if (this.iconRef?.current?.fadeInLogo) {
            this.iconRef.current.fadeInLogo(1, {
                onComplete: () => {
                    // Move the icon 100px to the left at the final stage
                    const mcIconFinal = document.getElementById('mc_icon');
                    const mcLogoFade = document.getElementById('mc_logo');
                    if (mcIconFinal) {
                        gsap.to(mcIconFinal, { x: '-=125', duration: 0.5, ease: 'power2.inOut' });
                    }
                    if (mcLogoFade) {
                        gsap.to(mcLogoFade, { opacity: 1, duration: 1, ease: 'power2.out' });
                    }
                    if (this.logoRef?.current?.fadeInLogo) {
                        this.logoRef.current.fadeInLogo(1, {
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

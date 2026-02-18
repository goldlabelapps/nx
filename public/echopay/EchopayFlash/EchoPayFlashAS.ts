// EchoPayFlashAS
import { gsap } from 'gsap';

export default class EchoPayFlashAS {
    private onDone?: () => void;
    private mcRef?: React.RefObject<any>;

    constructor(onDone?: () => void, mcRef?: React.RefObject<any>) {
        this.onDone = onDone;
        this.mcRef = mcRef;
    }

    init() {

        const handleTextFadeInComplete = () => {
            this.onDone?.();
        };

        if (this.mcRef?.current) {
            // Example: animate the referenced element (replace with your actual animation logic)
            gsap.set(this.mcRef.current, { opacity: 1 });
            gsap.to(this.mcRef.current, {
                x: '-=125', duration: 0.5, ease: 'power2.inOut', onComplete: () => {
                    this.mcRef?.current && gsap.to(this.mcRef.current, { opacity: 1, duration: 1, ease: 'power2.out', onComplete: handleTextFadeInComplete });
                }
            });
        } else {
            handleTextFadeInComplete();
        }
        return;

        // fallback: if no animation, call onDone immediately
        if (this.onDone) {
            this.onDone?.();
        }
    }

    destroy() {
        console.log('EchoPayFlashAS destroyed');
    }
}

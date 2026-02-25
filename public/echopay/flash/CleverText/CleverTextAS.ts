import { gsap } from 'gsap';

export default class CleverTextAS {
    private onDone?: () => void;
    private mc?: React.RefObject<any>;

    constructor(onDone?: () => void, mcRef?: React.RefObject<any>) {
        this.onDone = onDone;
        this.mc = mcRef;
    }

    init() {
        console.log('CleverText init');
        const el = this.mc?.current;
        if (el) {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.transform = 'scaleY(0)';
            el.style.transform = 'scaleX(0.5)';

        }
        // this.fadeIn();
    }

    fadeIn() {
        console.log('CleverText fadeIn');
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


}

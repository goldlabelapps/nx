import { gsap } from 'gsap';

export default class CleverTextAS {
    private mc?: React.RefObject<any>;

    constructor(mcRef?: React.RefObject<any>) {
        this.mc = mcRef;
    }

    init() {
        // console.log('CleverText init');
        const el = this.mc?.current;
        if (el) {
            el.style.opacity = '0';
            el.style.visibility = 'visible';
        }
        this.fadeIn();
    }

    fadeIn() {
        // console.log('CleverText fadeIn');
        const el = this.mc?.current;
        if (el) {
            gsap.to(el, {
                opacity: 1,
                duration: 2,
                ease: 'expo.out'
            });
        }
    }

    destroy() {
        console.log('CleverTextAS destroyed');
    }

}

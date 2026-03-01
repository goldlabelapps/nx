import { gsap } from 'gsap';

export default class GoViralAS {

    private mc?: React.RefObject<any>;

    constructor(mcRef?: React.RefObject<any>) {
        this.mc = mcRef;
    }

    init(mcRef?: React.RefObject<any>) {
        if (mcRef) this.mc = mcRef;
        // console.log('GoViralAS');
        const el = this.mc?.current;
        if (el) {
            el.style.opacity = '0';
            el.style.visibility = 'visible';
        }
        this.fadeIn();
    }

    fadeIn() {
        const el = this.mc?.current;
        if (el) {
            gsap.to(el, {
                opacity: 1,
            });
        }
    }
    fadeOut() {
        const el = this.mc?.current;
        if (el) {
            gsap.to(el, {
                opacity: 0,
            });
        }
    }
}

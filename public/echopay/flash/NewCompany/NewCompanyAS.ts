import { gsap } from 'gsap';

export default class NewCompanyAS {
    private mc?: React.RefObject<any>;

    constructor(mcRef?: React.RefObject<any>) {
        this.mc = mcRef;
    }

    init() {
        // console.log('NewCompany init');
        const el = this.mc?.current;
        if (el) {
            el.style.opacity = '0';
            el.style.visibility = 'visible';
        }
        this.fadeIn();
    }

    fadeIn() {
        // console.log('NewCompany fadeIn');
        const el = this.mc?.current;
        if (el) {
            gsap.to(el, {
                opacity: 1,
                duration: 2,
                ease: 'expo.out'
            });
        }
    }


}

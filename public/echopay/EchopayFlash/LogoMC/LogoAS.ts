// import { gsap } from 'gsap';

export default class LogoAS {
    private onDone?: () => void;
    private mc?: React.RefObject<any>;

    constructor(onDone?: () => void, mcRef?: React.RefObject<any>) {
        this.onDone = onDone;
        this.mc = mcRef;
    }

    init() {
        console.log('LogoAS init');
        if (this.onDone) {
            this.onDone();
        }

    }

    destroy() {
        console.log('LogoAS destroyed');
    }
}

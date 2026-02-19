// import { gsap } from 'gsap';

export default class NewAS {
    private onDone?: () => void;
    private mc?: React.RefObject<any>;

    constructor(onDone?: () => void, mcRef?: React.RefObject<any>) {
        this.onDone = onDone;
        this.mc = mcRef;
    }

    init() {
        console.log('NewAS init');
        if (this.onDone) {
            this.onDone();
        }

    }

    destroy() {
        console.log('NewAS destroyed');
    }
}

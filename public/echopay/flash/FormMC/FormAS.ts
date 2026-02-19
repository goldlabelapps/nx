// import { gsap } from 'gsap';

export default class FormAS {
    private onDone?: () => void;
    private mc?: React.RefObject<any>;

    constructor(onDone?: () => void, mcRef?: React.RefObject<any>) {
        this.onDone = onDone;
        this.mc = mcRef;
    }

    init() {
        console.log('FormAS init');
        if (this.onDone) {
            this.onDone();
        }

    }

    destroy() {
        console.log('FormAS destroyed');
    }
}

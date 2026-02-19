// import { gsap } from 'gsap';

export default class VariableAS {
    private onDone?: () => void;
    private mc?: React.RefObject<any>;

    constructor(onDone?: () => void, mcRef?: React.RefObject<any>) {
        this.onDone = onDone;
        this.mc = mcRef;
    }

    init() {
        console.log('VariableAS init');
        if (this.onDone) {
            this.onDone();
        }

    }

    destroy() {
        console.log('VariableAS destroyed');
    }
}

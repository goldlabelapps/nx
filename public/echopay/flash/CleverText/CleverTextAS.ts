import { gsap } from 'gsap';

export default class CleverTextAS {
    private onDone?: () => void;
    private mc?: React.RefObject<any>;

    constructor(onDone?: () => void, mcRef?: React.RefObject<any>) {
        this.onDone = onDone;
        this.mc = mcRef;
        if (typeof window !== 'undefined') {
            (window as any).__logoASInstance = this;
        }
    }

    init() {
        const el = this.mc?.current;
        if (el) {
            console.log("CleverTextAS", el);
        }
    }


}

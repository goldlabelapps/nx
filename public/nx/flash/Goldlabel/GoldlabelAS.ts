// GoldlabelAS

export default class GoldlabelAS {
    private onDone?: () => void;

    constructor(onDone?: () => void) {
        this.onDone = onDone;
    }

    init() {
        setTimeout(() => {
            if (this.onDone) {
                this.onDone();
            }
        }, 1000);
    }

    destroy() { }
}

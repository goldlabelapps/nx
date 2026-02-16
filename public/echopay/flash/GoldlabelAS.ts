// GoldlabelAS


export default class GoldlabelAS {
    private onDone?: () => void;
    private iconRef?: React.RefObject<any>;

    constructor(onDone?: () => void, iconRef?: React.RefObject<any>) {
        this.onDone = onDone;
        this.iconRef = iconRef;
    }

    init() {
        console.log('Animate Icon...');

        // Trigger animation in the Icon component if ref and method exist
        if (this.iconRef?.current?.spinInnerCircle) {
            this.iconRef.current.spinInnerCircle();
        }

        setTimeout(() => {
            if (this.onDone) {
                this.onDone();
            }
        }, 1000);
    }

    destroy() {
        console.log('GoldlabelAS destroyed');
    }
}

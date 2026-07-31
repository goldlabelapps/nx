declare module 'react-sound' {
    import * as React from 'react';

    type PlayStatus = 'PLAYING' | 'STOPPED' | 'PAUSED';

    interface ReactSoundProps {
        url: string;
        playStatus?: PlayStatus;
        loop?: boolean;
        volume?: number;
        onFinishedPlaying?: () => void;
    }

    class ReactSound extends React.Component<ReactSoundProps> {
        static status: {
            PLAYING: PlayStatus;
            STOPPED: PlayStatus;
            PAUSED: PlayStatus;
        };
    }

    export default ReactSound;
}

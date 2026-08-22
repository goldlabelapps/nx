'use client';
import * as React from 'react';
const ReactSoundModule = require('react-sound');
const ReactSound = ReactSoundModule?.default ?? ReactSoundModule;
const SoundStatus = ReactSoundModule?.status
	?? ReactSound?.status
	?? {
		PLAYING: 'PLAYING',
		STOPPED: 'STOPPED',
	};

type SoundPlayerProps = {
	src: string;
	play?: boolean;
	loop?: boolean;
	volume?: number;
	onFinishedPlaying?: () => void;
};

export default function SoundPlayer({
	src,
	play = true,
	loop = false,
	volume = 100,
	onFinishedPlaying,
}: SoundPlayerProps) {
	const safeVolume = Math.max(0, Math.min(100, volume));

	return (
		<ReactSound
			url={src}
			playStatus={play ? SoundStatus.PLAYING : SoundStatus.STOPPED}
			loop={loop}
			volume={safeVolume}
			onFinishedPlaying={onFinishedPlaying}
		/>
	);
}

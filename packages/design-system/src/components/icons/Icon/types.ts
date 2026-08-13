import type { SvgIconProps } from '@mui/material/SvgIcon';

export type IconName = string & {};

export type IconProps = {
	icon: IconName;
	color?: SvgIconProps['color'];
	size?: number | string;
};
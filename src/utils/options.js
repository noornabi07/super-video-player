import { __ } from '@wordpress/i18n';

import { verticalLineIcon, horizontalLineIcon } from './icons';

export const sampleOptions = [
	{ label: __('Simple'), value: 'simple' },
	{ label: __('Minimal'), value: 'minimal' },
	{ label: __('Small'), value: 'small' },
	{ label: __('Short'), value: 'short' }
]

export const layouts = [
	{ label: __('Vertical', 'b-blocks'), value: 'vertical', icon: verticalLineIcon },
	{ label: __('Horizontal', 'b-blocks'), value: 'horizontal', icon: horizontalLineIcon }
];

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'b-blocks') },
	{ name: 'style', title: __('Style', 'b-blocks') }
];
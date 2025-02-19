import { useState } from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import { produce } from 'immer';

import Settings from './Settings/Settings';
import Style from '../Common/Style';
import SuperPlayer from '../Common/SuperPlayer';
import Playlist from '../Common/Playlist';

const Edit = props => {
	const { attributes, setAttributes, clientId } = props;
	const { items, playlist } = attributes;

	const [activeIndex, setActiveIndex] = useState(0);

	const updateItem = (type, val, childType = false) => {
		const newItems = produce(items, draft => {
			if (childType) {
				draft[activeIndex][type][childType] = val;
			} else {
				draft[activeIndex][type] = val;
			}
		});
		setAttributes({ items: newItems });
	}

	const isPremium = false;

	return <>
		<Settings {...{ attributes, setAttributes, isPremium, updateItem, activeIndex, setActiveIndex }} />

		<div {...useBlockProps()}>
			<Style attributes={attributes} id={`block-${clientId}`} />

			{/* Common file er main plugin file import here */}
			{
				playlist ? <Playlist attributes={attributes} /> : <SuperPlayer attributes={attributes} />
			}
		</div>
	</>;
}
export default Edit;
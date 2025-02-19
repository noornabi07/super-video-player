import { createRoot } from 'react-dom/client';

import './style.scss';
import Style from './Components/Common/Style';
import SuperPlayer from './Components/Common/SuperPlayer';
import Playlist from './Components/Common/Playlist';

document.addEventListener('DOMContentLoaded', () => {
	const blockNameEls = document.querySelectorAll('.wp-block-svp-video-player');

	blockNameEls.forEach(blockNameEl => {
		const attributes = JSON.parse(blockNameEl.dataset.attributes);
		const { playlist } = attributes;

		createRoot(blockNameEl).render(<>
			<Style attributes={attributes} id={blockNameEl.id} />

			{
				playlist ? <Playlist attributes={attributes} /> : <SuperPlayer attributes={attributes} />
			}
		</>);

		blockNameEl?.removeAttribute('data-attributes');
	});
});
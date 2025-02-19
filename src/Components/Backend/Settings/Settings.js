import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { TabPanel } from '@wordpress/components';

import { AboutProModal } from '../../../../../bpl-tools/ProControls';
import { tabController } from '../../../../../bpl-tools/utils/functions';

import { generalStyleTabs } from '../../../utils/options';
import General from './General/General';
import Style from './Style/Style';

const Settings = (props) => {
	const { attributes, setAttributes } = props;
	const { alignment, textAlign } = attributes;

	const [isProModalOpen, setIsProModalOpen] = useState(false);

	return <>
		<InspectorControls>
			<div className='bBlocksInspectorInfo'>
				Need more block like this? Checkout the bundle ➡ <a href='https://wordpress.org/plugins/b-blocks' target='_blank' rel='noopener noreferrer'>B Blocks</a>
			</div>

			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
				{'general' === tab.name &&
					<General {...props} />
				}

				{'style' === tab.name && <Style {...props} />}
			</>}</TabPanel>
		</InspectorControls>


		<BlockControls>
			<AlignmentToolbar value={alignment} onChange={val => setAttributes({ alignment: val })} describedBy={__('Video Player Alignment')} alignmentControls={[
				{ title: __('Video Player in left', 'svp'), align: 'left', icon: 'align-left' },
				{ title: __('Video Player in center', 'svp'), align: 'center', icon: 'align-center' },
				{ title: __('Video Player in right', 'svp'), align: 'right', icon: 'align-right' }
			]} />

			<AlignmentToolbar value={textAlign} onChange={val => setAttributes({ textAlign: val })} />
		</BlockControls>


		<AboutProModal isProModalOpen={isProModalOpen} setIsProModalOpen={setIsProModalOpen} link='https://bplugins.com/products/advanced-post-block/#pricing'>
			<li>&emsp;<strong>{__('Feature: ', 'svp')}</strong>{__('Feature details.', 'svp')}</li>
		</AboutProModal>
	</>;
};
export default Settings;
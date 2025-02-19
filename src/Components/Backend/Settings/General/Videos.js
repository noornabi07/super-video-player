import { PanelBody, ToggleControl } from '@wordpress/components'
import React from 'react'
import { ItemsPanel } from '../../../../../../bpl-tools/Components'
import { __ } from '@wordpress/i18n'
import VideoItemPanel from './VideoItemPanel'

export default function Videos({ attributes, setAttributes, activeIndex, setActiveIndex }) {
    // const []
    const itemsProps = { attributes, setAttributes, arrKey: 'videos', activeIndex, setActiveIndex };
    const { playlist } = attributes;

    return (
        <PanelBody className='bPlPanelBody' title={__('Videos', 'svp')}>

            <ToggleControl
                className='mt10'
                label={__("Enable Playlist", "svp")}
                checked={playlist}
                onChange={(val) => setAttributes({ playlist: val })}
            />

            {playlist ?
                <ItemsPanel
                    {...itemsProps}
                    newItem={{
                        src: "",
                        title: "",
                        poster: "",
                        customDownloadButton: false,
                        customDownloadUrl: "",
                        qualities: [],
                        captions: [{
                            source: "",
                            label: ""
                        }]
                    }}
                    ItemSettings={VideoItemPanel}
                    itemLabel="Video"
                    design="sortable"
                /> :
                <VideoItemPanel {...itemsProps} index={0} />
            }
        </PanelBody>
    )
}

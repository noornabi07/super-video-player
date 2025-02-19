import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import { PanelBody, PanelRow, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { Device, Label } from '../../../../../../bpl-tools/Components';
import { updateData } from '../../../../../../bpl-tools/utils/functions';
import { BorderControl } from '../../../../../../bpl-tools/Components/Deprecated';

const Style = (props) => {
    const { attributes, setAttributes } = props;
    const { videoSize, border } = attributes;

    const [device, setDevice] = useState('desktop');

    return <>
        <PanelBody className='bPlPanelBody' title={__('General Style', 'svp')} initialOpen={true}>
            <PanelRow>
                <Label className='mb5'>{__('Video Layout Max Width:', 'svp')}</Label>
                <Device onChange={val => setDevice(val)} />
            </PanelRow>

            <UnitControl
                className='mb10'
                value={videoSize?.width[device]}
                onChange={val => setAttributes({ videoSize: updateData(videoSize, val, "width", device) })} beforeIcon='grid-view'
                step={1}
                max={100}
                min={1}
            />

            <BorderControl
                className="mt15"
                label={__('Border:', 'svp')}
                value={border}
                onChange={val => setAttributes({ border: val })}
                defaults={{ radius: '5px' }}
            />

        </PanelBody>
    </>
}
export default Style;
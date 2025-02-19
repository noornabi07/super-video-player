import { produce } from 'immer';
import { InlineMediaUpload } from '../../../../../../bpl-tools/Components';
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

export const VideoQualityPanel = ({ attributes,
    setAttributes,
    arrKey,
    index,
    setActiveIndex = false, }) => {

    const items = attributes[arrKey];

    const updateQuality = (property, val, childProperty = null) => {
        const newItems = produce(attributes[arrKey], (draft) => {
            if (null !== childProperty) {
                draft[index][property][childProperty] = val;
            } else {
                draft[index][property] = val;
            }
        });
        setAttributes({ [arrKey]: newItems });
        setActiveIndex && setActiveIndex(index);
    };

    return <>

        <InlineMediaUpload
            types={["video"]}
            className="mt10"
            label={__("Video URL", "svp")}
            placeholder={__("Enter or upload video URL", "svp")}
            value={items[index]?.source}
            onChange={(v) => updateQuality("source", v)}
        />

        <SelectControl
            className="mt15"
            label={__("Video Quality Size", "svp")}
            options={[
                { label: "240p (SD)", value: 240 },
                { label: "360p (SD)", value: 360 },
                { label: "480p (SD)", value: 480 },
                { label: "720p (HD)", value: 720 },
                { label: "1080p (HD)", value: 1080 },
                { label: "1440p (FHD)", value: 1440 },
                { label: "2160p (4K)", value: 2160 },
                { label: "4320p (8K)", value: 4320 },
            ]}
            value={items[index]?.size}
            onChange={(v) => updateQuality("size", v)}
        />

    </>
}
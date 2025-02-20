import { produce } from 'immer';
import { InlineMediaUpload } from '../../../../../../bpl-tools/Components';
import { __ } from '@wordpress/i18n';
import { TextControl, ToggleControl } from '@wordpress/components';

export const VideoCaptionPanel = ({ attributes,
    setAttributes,
    arrKey,
    index,
    setActiveIndex = false, }) => {

    const items = attributes[arrKey];

    // const updateQuality = (property, val, childProperty = null) => {
    //     const newItems = produce(attributes[arrKey], (draft) => {
    //         if (null !== childProperty) {
    //             draft[index][property][childProperty] = val;
    //         } else {
    //             draft[index][property] = val;
    //         }
    //     });
    //     setAttributes({ [arrKey]: newItems });
    //     setActiveIndex && setActiveIndex(index);
    // };

    const updateQuality = (property, val, childProperty = null) => {
        const newItems = produce(attributes[arrKey], (draft) => {
            if (property === "default" && val) {
                // If user sets this caption as default, set all others to false
                draft.forEach((item, i) => {
                    item.default = i === index;
                });
            } else {
                if (childProperty !== null) {
                    draft[index][property][childProperty] = val;
                } else {
                    draft[index][property] = val;
                }
            }
        });
        setAttributes({ [arrKey]: newItems });
        setActiveIndex && setActiveIndex(index);
    };


    return <>

        <InlineMediaUpload
            types={["video"]}
            className="mt10"
            label={__("Captions Source URL", "svp")}
            placeholder={__("Upload source URL", "svp")}
            value={items[index]?.source}
            onChange={(v) => updateQuality("source", v)}
        />

        <TextControl
            className="mt15"
            label={__("Captions Label", "svp")}
            placeholder={__("type caption label", "svp")}
            value={items[index]?.label}
            onChange={(v) => updateQuality("label", v)}
            type="text"
        />

        <TextControl
            className="mt15"
            label={__("Caption srclang", "svp")}
            placeholder={__("type caption srclang", "svp")}
            value={items[index]?.srclang}
            onChange={(v) => updateQuality("srclang", v)}
            type="text"
        />

        <ToggleControl
            className="mt15"
            label={__("Set as Default", "svp")}
            checked={items[index]?.default || false}
            onChange={(v) => updateQuality("default", v)}
        />

    </>
}
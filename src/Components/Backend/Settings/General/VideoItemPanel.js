import { InlineMediaUpload, ItemsPanel } from "../../../../../../bpl-tools/Components";
import { TextControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { produce } from "immer";
import { useEffect } from 'react'
import { VideoQualityPanel } from './VideoQualityPanel';
import { VideoCaptionPanel } from './VideoCaptionPanel';

const VideoItemPanel = ({ attributes, setAttributes, arrKey, index, setActiveIndex = false }) => {
    const items = attributes[arrKey];

    const updateVideo = (property, val, childProperty = null) => {
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

    const setValue = (value) => {
        const property = Object.keys(value)[0];
        if (property && value[property]) {
            updateVideo(property, value[property]);
        }
    }

    useEffect(() => {
        if (items[index].qualities.length === 1) {
            updateVideo('qualities', [{ source: items[index].src }])
        }
    }, [items[index].qualities?.length])


    return (
        <>
            {items[index].qualities?.length < 1 && <InlineMediaUpload
                types={['video']}
                className="mt10"
                label={__("Video URL", "svp")}
                placeholder={__("Enter or upload video URL", "svp")}
                value={items[index]?.src}
                onChange={(v) => updateVideo("src", v)}
            />}

            <TextControl
                className="mt15"
                label={__("Video Title", "svp")}
                placeholder={__("Type your video title", "svp")}
                value={items[index]?.title}
                onChange={(v) => updateVideo("title", v)}
                type="text"
            />

            <InlineMediaUpload
                types={['images']}
                className="mt10"
                label={__("Poster URL", "svp")}
                placeholder={__("Insert or upload poster URL", "svp")}
                value={items[index]?.poster}
                onChange={(v) => updateVideo("poster", v)}
            />

            <ToggleControl
                className="mt15"
                label={__("On/Off Custom Download", "svp")}
                checked={items[index]?.customDownloadButton}
                onChange={(v) => updateVideo("customDownloadButton", v)}
            />

            {items[index]?.customDownloadButton && (
                <InlineMediaUpload
                    style={{ marginBottom: "15px" }}
                    className="mt15"
                    placeholder={__("Upload download video URL", "svp")}
                    types={["video"]}
                    value={items[index]?.customDownloadUrl}
                    onChange={(v) => updateVideo("customDownloadUrl", v)}
                />
            )}

            {/* Quality items panel */}
            <ItemsPanel
                {...{ attributes: { qualities: items[index]?.qualities || [] }, setAttributes: setValue }}
                arrKey="qualities"
                newItem={{
                    source: "",
                    size: "",
                }}
                ItemSettings={VideoQualityPanel}
                itemLabel={__("Qualities", "svp")}
                design="sortable">
            </ItemsPanel>


            {/* Captions items panel */}
            <ItemsPanel
                {...{ attributes: { captions: items[index]?.captions || [] }, setAttributes: setValue }}
                arrKey="captions"
                newItem={{
                    source: "",
                    label: "",
                    srclang: ""
                }}
                ItemSettings={VideoCaptionPanel}
                itemLabel={__("Captions", "svp")}
                design="sortable">
            </ItemsPanel>
        </>
    );
};
export default VideoItemPanel;
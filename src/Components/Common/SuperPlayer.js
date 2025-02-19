import React, { useEffect, useRef } from "react";
import { getFileExtension } from '../../utils/functions';

const SuperPlayer = ({ attributes }) => {
    const { options, videos } = attributes;
    const { controls, autoPlay, clickToPlay, volume, repeat, isControl, muted, seekTime, toolTip } = options;
    // const [player, setPlayer] = useState(null);

    const playerRef = useRef(null);

    // Ensure at least one video exists
    const video = videos?.[0] || {};
    const videoSrc = video?.src || "";

    const controlItems = Object.keys(controls).filter((key) => controls[key]);

    useEffect(() => {

        if (window.Plyr && playerRef.current) {
            const player = new window.Plyr(playerRef.current.querySelector('video'), {
                controls: controlItems,
                autoplay: autoPlay,
                muted,
                clickToPlay,
                volume,
                loop: { active: repeat },
                hideControls: isControl,
                captions: { active: true, update: true },
                tooltips: { controls: toolTip },
                seekTime: seekTime || 10,
                urls: {
                    download: video.customDownloadButton ? video.customDownloadUrl : videoSrc,
                }
            });

            let ext = getFileExtension(videoSrc);
            if (ext === "m3u8" && window.Hls?.isSupported()) {
                // For more Hls.js options, see https://github.com/dailymotion/hls.js
                const hls = new Hls();
                hls.loadSource(videoSrc);
                hls.attachMedia(playerRef.current?.querySelector("video"));
                //   window.hls = hls;

                // Handle changing captions
                player?.on("languagechange", () => {
                    setTimeout(() => (hls.subtitleTrack = player.currentTrack), 50);
                });
            }

            if (ext === "mpd") {
                const dash = window.dashjs.MediaPlayer().create();
                const video = playerRef.current?.querySelector("video");
                dash.initialize(video, videoSrc, true);
            }

            return () => {
                player.destroy();
            };
        }
    }, [videos, videoSrc, controls, autoPlay, muted, volume, repeat, toolTip, seekTime, clickToPlay, isControl, video.customDownloadButton, video.customDownloadUrl]);

    return (
        <div className='svpVideoPlayer' ref={playerRef}>
            <video controls crossOrigin="anonymous" data-poster={video.poster}>
                {/* Render Video Qualities */}
                {video?.qualities?.length > 0 ? (
                    video.qualities.map((quality, qIndex) => (
                        <source key={qIndex} src={quality.source} type="video/mp4" />
                    ))
                ) : (
                    <source src={videoSrc} type="video/mp4" />
                )}

                {/* Render Captions */}
                {video?.captions?.length > 0 &&
                    video.captions.map((caption, cIndex) => (
                        <track
                            key={cIndex}
                            kind="captions"
                            srcLang={caption.srclang}
                            label={caption.label}
                            src={caption.source}
                            default={cIndex === 0} // First caption is default
                        />
                    ))}
            </video>
        </div>
    );
};

export default SuperPlayer;

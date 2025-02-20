import React, { useEffect, useRef } from "react";
import { getFileExtension } from '../../utils/functions';

const SuperPlayer = ({ attributes, isAdmin = false }) => {
    const { options, videos } = attributes;
    const { controls, autoPlay, clickToPlay, volume, repeat, isControl, muted, seekTime, toolTip } = options;

    const playerRef = useRef(null);

    // Ensure at least one video exists
    const video = videos?.[0] || {};
    const videoSrc = video?.src || "";

    const controlItems = Object.keys(controls).filter((key) => controls[key]);

    const instanceRef = useRef();

    const defaultCaptionIndex = video?.captions?.findIndex(caption => caption.default);

    useEffect(() => {

        if (window.Plyr && playerRef.current) {

            const html = playerRef.current.querySelector('.hidden')?.innerHTML;
            if (html) {
                playerRef.current.querySelector('.visible').innerHTML = '';
                playerRef.current.querySelector('.visible').innerHTML = html;
            }
            const videoTag = playerRef.current.querySelector('.visible video')

            setTimeout(() => {
                const player = new window.Plyr(videoTag, {
                    controls: controlItems,
                    autoplay: autoPlay,
                    muted,
                    clickToPlay,
                    volume: muted ? 0 : volume,
                    loop: { active: repeat },
                    hideControls: isControl,
                    captions: { active: true, update: true },
                    tooltips: { controls: toolTip },
                    seekTime: seekTime || 10,
                    urls: {
                        download: video.customDownloadButton ? video.customDownloadUrl : videoSrc,
                    },
                    storage: { enabled: !autoPlay, key: 'plyr' }
                });

                instanceRef.current = player;
                window.player = instanceRef.current;

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
            }, 0);

            return () => {
                instanceRef.current.destroy();
            };
        }
    }, [video, videoSrc, controls, autoPlay, muted, volume, repeat, toolTip, seekTime, clickToPlay, isControl, video.customDownloadButton, video.customDownloadUrl]);

    return (
        <div className='svpVideoPlayer' ref={playerRef}>
            {isAdmin && <div className='hidden'>
                <video controls crossOrigin="anonymous" data-poster={video.poster} src={videoSrc}>
                    {/* Render Video Qualities */}
                    {video?.qualities?.length > 0 ? (
                        video.qualities.map((quality, qIndex) => (
                            <source key={qIndex} src={quality.source} size={quality.size} type="video/mp4" />
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
                                default={defaultCaptionIndex === cIndex}
                            />
                        ))}
                </video>
            </div>}
            <div className="visible">
                <video controls crossOrigin="anonymous" data-poster={video.poster} src={videoSrc}>
                    {/* Render Video Qualities */}
                    {video?.qualities?.length > 0 ? (
                        video.qualities.map((quality, qIndex) => (
                            <source key={qIndex} src={quality.source} size={quality.size} type="video/mp4" />
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
        </div>
    );
};

export default SuperPlayer;

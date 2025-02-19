import React, { useEffect, useRef, useState } from "react";
import Default from './templates/Default';
import { getFileExtension } from '../../utils/functions';

const Playlist = ({ attributes }) => {
    const { options, videos } = attributes;
    const { controls, autoPlay, clickToPlay, volume, repeat, isControl, muted, seekTime, toolTip } = options;

    const playerRef = useRef(null);
    const [player, setPlayer] = useState(null);
    const [currentItem, setCurrentItem] = useState(0);

    // Ensure at least one video exists
    const video = videos?.[0] || {};
    const videoSrc = video?.src || "https://cdn.jsdelivr.net/npm/big-buck-bunny-1080p@0.0.6/video.mp4";

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


            return () => {
                player.destroy();
            };
        }
    }, [videos, controls, autoPlay, muted, volume, repeat, toolTip, seekTime, clickToPlay, isControl, video.customDownloadButton, video.customDownloadUrl]);


    useEffect(() => {
        if (videos?.length > 0) {
            const videoDetails = videos[currentItem];
            if (videoDetails && playerRef.current.querySelector("video")) {
                playerRef.current.querySelector(".plyr__poster")?.setAttribute("style", `background-image: url("${videoDetails.poster}")`);
                playerRef.current.querySelector("video").src = videoDetails.src;

                let ext = getFileExtension(videoDetails.src);
                if (ext === "m3u8" && window.Hls?.isSupported()) {
                    // For more Hls.js options, see https://github.com/dailymotion/hls.js
                    const hls = new Hls();
                    hls.loadSource(videoDetails.src);
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
                    dash.initialize(video, videoDetails.src, true);
                }
                playerRef.current.querySelector("video")?.play();
            }
        }
    }, [currentItem, videos, video.src]);

    return (
        <div className='svpVideoPlayer' ref={playerRef}>
            <video controls crossOrigin="anonymous" data-poster={video.poster}>
                {/* Render Video Qualities */}
                {video?.qualities?.length > 0 ? (
                    video.qualities.map((quality, qIndex) => (
                        <source key={qIndex} src={quality.source} type="video/mp4" />
                    ))
                ) : (
                    <source src={video.src || videoSrc} type="video/mp4" />
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

            {Array.isArray(videos) && (
                <div className="svp_playlist">
                    <Default player={player} currentItem={currentItem} setCurrentItem={setCurrentItem} videos={videos} />
                </div>
            )}
        </div>
    );
};

export default Playlist;



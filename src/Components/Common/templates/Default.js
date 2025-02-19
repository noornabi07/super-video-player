import React from "react";

const Default = ({ player, videos, setCurrentItem, currentItem }) => {
  return (
    <div className="default">
      {videos.map((video, index) => (
        < div
          key={index}
          className={`svp_item ${currentItem === index ? "active" : ""}`}
          onClick={() => {
            setCurrentItem(index);
            setTimeout(() => {
              player?.play();
            }, 500);
          }}
        >
          {currentItem === index && <span className="playing">Now Playing</span>}
          {currentItem === index - 1 && <span className="next">Up Next</span>}
          <h3 className="title">{video.title}</h3>
        </div>
      ))
      }
    </div >
  );
};

export default Default;

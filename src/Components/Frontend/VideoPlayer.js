const VideoPlayer = ({ attributes }) => {
	const { items, columns, layout, content, icon, img } = attributes;

	return <div className={`bBlocksVideoPlayer columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile} ${layout || 'vertical'}`}>
		{items?.map((item, index) => {
			const { number, text } = item;

			return <div key={index} id={`bBlocksVideoPlayerItem-${index}`}>
				<div className='bBlocksVideoPlayerItem'>
					<span className='number'>{number}</span>
					<span className='text' dangerouslySetInnerHTML={{ __html: text }} />
				</div>
			</div>;
		})}

		{content && <p className='content' dangerouslySetInnerHTML={{ __html: content }} />}

		{img?.url && <img src={img.url} alt={img?.alt} />}

		{icon?.class && <i className={`icon ${icon.class}`}></i>}

		<span className='separator'></span>
	</div>
}
export default VideoPlayer;
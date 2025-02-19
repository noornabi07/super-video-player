import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
import { produce } from "immer"
import { HelpPanel } from '../../../../../../bpl-tools/Components';
import { updateData } from '../../../../../../bpl-tools/utils/functions';
import Videos from './Videos';
// import VideoItemPanel from './VideoItemPanel';

const General = (props) => {
	const { attributes, setAttributes } = props;
	const { options = {} } = attributes;
	const { autoPlay, clickToPlay, volume, repeat, muted, seekTime, toolTip } = options;


	// all options update function 
	const updateOption = (key, value, options, setAttributes) => {
		const newVal = produce(options, draft => {
			draft.controls[key] = value;
		});
		setAttributes({ options: newVal });
	};

	return <>
		<HelpPanel slug='svp' docsLink='https://bplugins.com/docs/content-slider-block/guides/general' />

		<Videos {...props} />

		<PanelBody className='bPlPanelBody' title={__('Options', 'svp')}>
			<ToggleControl
				className='mt10'
				label={__("Auto Play", "svp")}
				checked={autoPlay}
				onChange={(val) => setAttributes({ options: updateData(options, val, 'autoPlay') })}
			/>

			<ToggleControl
				className='mt10'
				label={__("Click To Play", "svp")}
				checked={clickToPlay}
				onChange={(val) => setAttributes({ options: updateData(options, val, 'clickToPlay') })}
			/>

			<ToggleControl
				className='mt10'
				label={__("Repeat", "svp")}
				checked={repeat}
				onChange={(val) => setAttributes({ options: updateData(options, val, 'repeat') })}
				help={__("Specify how the video will start over again, every time it is finished", "svp")}
			/>

			<ToggleControl
				className='mt10'
				label={__("Muted", "svp")}
				checked={muted}
				onChange={(val) => setAttributes({ options: updateData(options, val, 'muted') })}
				help={__("Turn On if you want the audio output of the video should be muted.", "svp")}
			/>

			<ToggleControl
				className='mt10'
				label={__("Tooltips", "svp")}
				checked={toolTip}
				onChange={(val) => setAttributes({ options: updateData(options, val, 'toolTip') })}
				help={__("Display control labels as tooltips on :hover & :focus", "svp")}
			/>

			<ToggleControl
				className='mt10'
				label="Auto hide control"
				checked={options?.isControl}
				onChange={(val) => setAttributes({ options: updateData(options, val, 'isControl') })}
			/>

			<ToggleControl
				className='mt10'
				label="Control shadow"
				checked={options?.shadowControl}
				onChange={(val) => setAttributes({ options: updateData(options, val, 'shadowControl') })}
			/>

			<RangeControl
				className='mt10'
				label="Volume"
				value={volume}
				onChange={(val) => setAttributes({ options: updateData(options, val, 'volume') })}
				min={0.1}
				step={0.1}
			/>

			<RangeControl
				className='mt10'
				label="Seek time (Second)"
				value={seekTime}
				onChange={(val) => setAttributes({ options: updateData(options, val, 'seekTime') })}
				min={1}
				step={1}
			/>


		</PanelBody>

		<PanelBody className='bPlPanelBody' title={__('Controls', 'svp')}>
			<ToggleControl
				label="Large Play Button"
				checked={options.controls['play-large']}
				onChange={(val) => updateOption('play-large', val, options, setAttributes)}
			/>

			<ToggleControl
				className='mt10'
				label="Restart button"
				checked={options.controls?.restart}
				onChange={(val) => updateOption('restart', val, options, setAttributes)}
			/>

			<ToggleControl
				className='mt10'
				label="Rewind button"
				checked={options?.controls?.rewind}
				onChange={(val) => updateOption('rewind', val, options, setAttributes)}
			/>

			<ToggleControl
				className='mt10'
				label="Play pause button"
				checked={options?.controls?.play}
				onChange={(val) => updateOption('play', val, options, setAttributes)}
			/>

			<ToggleControl
				className='mt10'
				label="Fast forward button"
				checked={options?.controls['fast-forward']}
				onChange={(val) => updateOption('fast-forward', val, options, setAttributes)}
			/>

			<ToggleControl
				className='mt10'
				label="Progress bar"
				checked={options?.controls?.progress}
				onChange={(val) => updateOption('progress', val, options, setAttributes)}
			/>

			<ToggleControl
				className='mt10'
				label="Current time"
				checked={options?.controls['current-time']}
				onChange={(val) => updateOption('current-time', val, options, setAttributes)}
			/>

			<ToggleControl
				className='mt10'
				label="Duration time"
				checked={options?.controls?.duration}
				onChange={(val) => updateOption('duration', val, options, setAttributes)}
			/>

			<ToggleControl
				className='mt10'
				label="Mute button"
				checked={options?.controls?.mute}
				onChange={(val) => updateOption('mute', val, options, setAttributes)}
			/>

			<ToggleControl
				className='mt10'
				label="Volume control"
				checked={options?.controls?.volume}
				onChange={(val) => updateOption('volume', val, options, setAttributes)}
			/>

			<ToggleControl
				className='mt10'
				label="Subtitle control"
				checked={options?.controls?.captions}
				onChange={(val) => updateOption('captions', val, options, setAttributes)}
			/>

			<ToggleControl
				className='mt10'
				label="Setting button"
				checked={options?.controls?.settings}
				onChange={(val) => updateOption('settings', val, options, setAttributes)}
			/>

			<ToggleControl
				className='mt10'
				label="PIP button"
				checked={options?.controls?.pip}
				onChange={(val) => updateOption('pip', val, options, setAttributes)}
			/>

			<ToggleControl
				className='mt10'
				label="Airplay button"
				checked={options?.controls?.airplay}
				onChange={(val) => updateOption('airplay', val, options, setAttributes)}
			/>

			<ToggleControl
				className='mt10'
				label="Download button"
				checked={options?.controls?.download}
				onChange={(val) => updateOption('download', val, options, setAttributes)}
			/>

			<ToggleControl
				className='mt10'
				label="FullScreen button"
				checked={options?.controls?.fullscreen}
				onChange={(val) => updateOption('fullscreen', val, options, setAttributes)}
			/>
		</PanelBody>
	</>
}
export default General;
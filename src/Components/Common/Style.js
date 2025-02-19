import { getBorderCSS, getTypoCSS, isValidCSS } from '../../../../bpl-tools/utils/getCSS';
import { mobileBreakpoint, tabBreakpoint } from '../../../../bpl-tools/utils/data';

const Style = ({ attributes, id }) => {
	const { alignment, typography, border, videoSize } = attributes;

	const mainSl = `#${id}`;
	const blockSl = `${mainSl} .svpVideoPlayer`;
	const videoSl = `${blockSl} .plyr--video`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS('', typography)?.googleFontLink}
		${getTypoCSS(`${blockSl} .content`, typography)?.styles}

		${mainSl}{
			text-align: ${alignment};
		}
		${blockSl}{
			justify-content: ${alignment};
		}
		${videoSl}{
			${isValidCSS('width', videoSize?.width['desktop'])}
			${getBorderCSS(border)};
		}
		${tabBreakpoint}{
			${videoSl}{
				${isValidCSS('width', videoSize?.width['tablet'])}
			}
		}
		${mobileBreakpoint}{
			${videoSl}{
				${isValidCSS('width', videoSize?.width['mobile'])}
			}
		}
	`}} />;
}
export default Style;
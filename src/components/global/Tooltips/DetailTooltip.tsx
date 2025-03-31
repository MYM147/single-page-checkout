import {
	IconFillPlay,
	IconRegularClose,
	IconRegularHelp,
	IconRegularInformation,
} from '@prism/dropcloth';
import { useState } from 'react';

type Props = {
	text: string;
};

const DetailTooltip = ({ text }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="swdc-relative swdc-inline-block">
			<div className="swdc-hidden md:swdc-block">
				<div
					className="swdc-ml-1 swdc-cursor-pointer"
					onMouseEnter={() => setIsOpen(true)}
					onMouseLeave={() => setIsOpen(false)}
				>
					<IconRegularInformation />
				</div>
			</div>

			<div
				className="swdc-mt-1 swdc-flex swdc-cursor-pointer swdc-items-center swdc-gap-1 md:swdc-hidden"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span>What is this?</span>
				<IconRegularHelp className="swdc-h-[20px] swdc-w-[20px]" />
			</div>

			{isOpen && (
				<div className="swdc-absolute swdc-z-30 swdc-w-[380px]">
					<IconFillPlay className="swdc-relative swdc-bottom-[0px] swdc-left-[40px] swdc-z-10 swdc-rotate-[-90deg] swdc-fill-[#545455] lg:swdc-left-[8px]" />
					<div className="swdc-relative swdc-bottom-1 swdc-rounded swdc-bg-[#545455] swdc-p-3 swdc-text-white lg:swdc-right-[30px]">
						<div className="swdc-flex swdc-justify-between">
							<div className="swdc-pr-4">{text}</div>
							<IconRegularClose
								className="swdc-icon-4 swdc-relative swdc-bottom-[10px] swdc-cursor-pointer swdc-fill-[#fff]"
								onClick={() => setIsOpen(false)}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DetailTooltip;

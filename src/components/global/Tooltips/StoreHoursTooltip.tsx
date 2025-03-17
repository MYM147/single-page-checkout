import {
	IconFillPlay,
	IconRegularCaretRight,
	IconRegularClose,
} from '@prism/dropcloth';
import { useState } from 'react';

const StoreHoursTooltip = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="swdc-inline-block">
			<div className="swdc-relative swdc-inline-block">
				<div
					className="swdc-mt-1 swdc-flex swdc-cursor-pointer swdc-items-center swdc-font-bold md:swdc-hidden"
					onClick={() => setIsOpen(!isOpen)}
				>
					<span>View Store Hours</span>
					<IconRegularCaretRight className="swdc-h-2 swdc-w-2" />
				</div>

				<div
					className="swdc-hidden swdc-cursor-pointer swdc-items-center swdc-font-bold md:swdc-flex"
					onMouseEnter={() => setIsOpen(true)}
					onMouseLeave={() => setIsOpen(false)}
				>
					<span>View Store Hours</span>
					<IconRegularCaretRight className="swdc-h-2 swdc-w-2" />
				</div>
			</div>

			{isOpen && (
				<div className="swdc-absolute swdc-z-30 swdc-w-[380px]">
					<IconFillPlay className="swdc-relative swdc-bottom-[0px] swdc-left-[40px] swdc-z-10 swdc-rotate-[-90deg] swdc-fill-[#545455] lg:swdc-left-[8px]" />
					<div className="swdc-relative swdc-bottom-1 swdc-rounded swdc-bg-[#545455] swdc-p-3 swdc-text-white lg:swdc-right-[30px]">
						<div className="swdc-flex swdc-justify-between">
							<div className="swdc-flex swdc-flex-col swdc-gap-2">
								<div>
									<span className="swdc-mr-1 swdc-font-bold">
										Monday - Friday:
									</span>
									<span className="swdc-text-sm">8AM - 8PM</span>
								</div>
								<div>
									<span className="swdc-mr-1 swdc-font-bold">Saturday:</span>
									<span className="swdc-text-sm">8AM - 9PM</span>
								</div>
								<div>
									<span className="swdc-mr-1 swdc-font-bold">Sunday:</span>
									<span className="swdc-text-sm">Closed</span>
								</div>
							</div>
							<IconRegularClose
								className="swdc-icon-3 swdc-relative swdc-bottom-[10px] swdc-cursor-pointer swdc-fill-[#fff]"
								onClick={() => setIsOpen(false)}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default StoreHoursTooltip;

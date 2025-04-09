import DropAPin from './DropAPin';
import { Button } from '@prism/dropcloth';

const SetMapDelivery = () => {
  return (
		<>
			<p className="swdc-text-sm">
				No address?{' '}
				<Button
					className="swdc-ml-1 swdc-font-medium hover:swdc-underline"
					onClick={function noRefCheck(){}}
					polarity="dark"
					variant="text">
					<span className='swdc-text-xs'>Set your delivery spot on a map.</span>
				</Button>
				<DropAPin />
			</p>
		</>
	);
};

export default SetMapDelivery;
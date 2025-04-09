import { Modal } from '@prism/dropcloth';

const DropAPin = () => {
	return (
		<Modal
			clickOutside
			disableCloseButton={false}
			fill
			handleClose={function noRefCheck(){}}
		>
			<h2 className="swdc-typeset-display-2 swdc-mb-2">
				Search or drop a pin
			</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut lectus arcu bibendum at varius. Eros in cursus turpis massa tincidunt dui. Risus viverra adipiscing at in tellus integer feugiat. Risus in hendrerit gravida rutrum. Consequat mauris nunc congue nisi vitae suscipit tellus. Neque gravida in fermentum et sollicitudin ac orci phasellus. Sit amet nisl suscipit adipiscing bibendum est.
			</p>
		</Modal>
	);
};

export default DropAPin;

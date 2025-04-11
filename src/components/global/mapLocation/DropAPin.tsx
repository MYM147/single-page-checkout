import { Button, Modal } from '@prism/dropcloth';
import { useState } from 'react';

const DropAPin = () => {
	const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	return (
		<>
		<p className='swdc-text-sm'>
				No address?{' '}
				<Button
					className='swdc-ml-1 swdc-font-medium hover:swdc-underline hover:swdc-bg-transparent'
					onClick={handleOpen}
					polarity='dark'
					variant='text'>
					<span className='swdc-text-sm swdc-normal-case hover:swdc-underline hover:swdc-bg-transparent'>Set your delivery spot on a map.</span>
				</Button>
				<Modal
				clickOutside
				disableCloseButton={false}
				fill
				open={open}
        handleClose={handleClose}
			>
				<h2 className='swdc-typeset-display-2 swdc-mb-2'>
					Search or drop a pin
				</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
				</p>
			</Modal>
			</p>
		</>

	);
};

export default DropAPin;

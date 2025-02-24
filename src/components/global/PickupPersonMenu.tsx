import { Input } from '@prism/dropcloth';

const PickupPersonMenu = () => {
	return (
		<div className="swdc-mt-2 swdc-grid swdc-grid-cols-2 swdc-gap-2">
			<div>
				First Name *
				<br />
				<Input
					className="swdc-mt-1 swdc-h-6 swdc-w-[285px] swdc-p-2"
					name="First name"
				/>
			</div>
			<div>
				Last Name *
				<br />
				<Input
					className="swdc-mt-1 swdc-h-6 swdc-w-[285px] swdc-p-2"
					name="Last name"
				/>
			</div>
			<div>
				Email Address *
				<br />
				<Input
					className="swdc-mt-1 swdc-h-6 swdc-w-[285px] swdc-p-2"
					name="Email"
				/>
			</div>
			<div>
				Phone Number *
				<br />
				<Input
					className="swdc-mt-1 swdc-h-6 swdc-w-[285px] swdc-p-2"
					name="Phone"
				/>
			</div>
		</div>
	);
};

export default PickupPersonMenu;

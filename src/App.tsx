import FreeDeliveryBanner from './components/global/FreeDeliveryBanner';
import CheckoutProcessList from './components/sections/CheckoutProcessList';
import { Sidebar } from './components/sidebar/Sidebar';

function App() {
	return (
		<div className="swdc-bg-[#f6f6f6]">
			<FreeDeliveryBanner />
			<div className="swdc-px-16 swdc-pb-[120px] lg:swdc-mx-[80px]">
				<h1 className="swdc-ml-6 swdc-py-3 swdc-text-[32px] swdc-font-medium lg:swdc-ml-0">
					Checkout
				</h1>
				<div className="lg:swdc-px-16 swdc-items-start swdc-gap-8 swdc-pt-2 lg:swdc-flex">
					<CheckoutProcessList />
					{/* <Sidebar /> */}
				</div>
			</div>
		</div>
	);
}

export default App;

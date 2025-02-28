import FreeDeliveryBanner from './components/global/FreeDeliveryBanner';
import CheckoutProcessList from './components/sections/CheckoutProcessList';
import { Sidebar } from './components/sidebar/Sidebar';

function App() {
	return (
		<div className="swdc-bg-[#f6f6f6]">
			<FreeDeliveryBanner />
			<div className="swdc-px-16swdc-pb-[120px] lg:swdc-mx-[80px]">
				<h1 className="swdc-ml-3 swdc-items-center swdc-py-4 swdc-text-4xl swdc-font-medium lg:swdc-ml-0 lg:swdc-text-[32px]">
					Checkout
				</h1>
				<div className="lg:swdc-px-16 swdc-items-start swdc-gap-8 lg:swdc-flex">
					<CheckoutProcessList />
					{/* <Sidebar /> */}
				</div>
			</div>
		</div>
	);
}

export default App;

import { createContext } from 'react';
import FreeDeliveryBanner from './components/global/FreeDeliveryBanner';
import CheckoutProcessList from './components/sections/CheckoutProcessList';
import { Sidebar } from './components/sidebar/Sidebar';
import { UserType } from './types';

export const UserContext = createContext<UserType | null>(null);

function App() {
	return (
		<>
			<FreeDeliveryBanner />
			<div className="swdc-px-16 swdc-pb-[120px] lg:swdc-mx-[80px]">
				<h1 className="swdc-ml-3 swdc-items-center swdc-py-4 swdc-text-4xl swdc-font-medium lg:swdc-ml-0 lg:swdc-text-[32px]">
					Checkout
				</h1>
				<div className="lg:swdc-px-16 swdc-items-start swdc-gap-8 lg:swdc-flex">
					<CheckoutProcessList />
					<Sidebar />
				</div>
			</div>
		</>
	);
}

export default App;

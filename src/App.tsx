import CheckoutProcessList from './components/sections/CheckoutProcessList';
import { Sidebar } from './components/sidebar/Sidebar';

function App() {
	return (
		<div className="swdc-bg-[#DCDEDC]">
			<div className="swdc-px-16 swdc-mx-[80px] swdc-pb-[120px] swdc-pt-10">
				<h1 className="swdc-text-2xl swdc-text-[32px] swdc-font-medium">
					Checkout
				</h1>
				<div className="swdc-px-16 swdc-flex swdc-items-start swdc-gap-8 swdc-self-stretch swdc-pt-6">
					<CheckoutProcessList />
					<Sidebar />
				</div>
			</div>
		</div>
	);
}

export default App;

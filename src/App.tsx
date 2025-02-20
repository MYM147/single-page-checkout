import CheckoutProcessList from './components/sections/CheckoutProcessList';
import { Sidebar } from './components/sidebar/Sidebar';

function App() {

  return (
		<div className='swdc-px-16 swdc-pt-10 swdc-pb-[120px] bg-[#DCDEDC]'>
			<h1 className='swdc-text-2xl swdc-py-10 swdc-pr-20 swdc-pl-10 swdc-text-[32px] swdc-font-medium swdc-leading-10 swdc-tracking-[-1px]'>
				Checkout
			</h1>
			<div className='swdc-flex text-center content-center'>
				<section>
					<CheckoutProcessList />
				</section>
				<section>
					<Sidebar />
				</section>
			</div>
		</div>
	);
}

export default App

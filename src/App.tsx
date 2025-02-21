import CheckoutProcessList from './components/sections/CheckoutProcessList';
import { Sidebar } from './components/sidebar/Sidebar';

function App() {

  return (
		<div className=' swdc-bg-[#DCDEDC]'>
			<div className='swdc-mx-[80px] swdc-px-16 swdc-pt-10 swdc-pb-[120px]'>
				<h1 className='swdc-text-2xl swdc-text-[32px] swdc-font-medium'>
					Checkout
				</h1>
				<div className='swdc-flex swdc-pt-6 swdc-px-16 swdc-items-start swdc-gap-8 swdc-self-stretch'>
						<CheckoutProcessList />
						<Sidebar />
				</div>
			</div>
		</div>
	);
}

export default App

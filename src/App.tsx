import CheckoutProcessList from './components/CheckoutProcessList'
import { Sidebar } from './components/sidebar/Sidebar'

function App() {

  return (
    <>
      <h1 className='swdc-text-2xl'>Checkout</h1>
      <div>
        <section>
          <CheckoutProcessList />
        </section>
        <section>
          <Sidebar />
        </section>
      </div>
    </>
  )
}

export default App

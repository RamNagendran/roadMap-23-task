import { useState } from 'react'
import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './cards';

function App() {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')));

  return (
    <>
      <div style={{ height: "100vh", overflow: "hidden" }} className='w-100 d-flex flex-column align-items-start ' >
        <Header cartItems={cartItems} ></Header>
        <Cards cartItems={cartItems} setCartItems={setCartItems} />
      </div>
    </>
  )
}

export default App

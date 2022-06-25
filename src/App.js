import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import Products from './pages/Products';

function App() {
  const [response, setResponse] = useState()
  const [data, setData] = useState()
  const [activeNavEl, setActiveNavEl] = useState(0)

  const url = 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'

  useEffect(() => {
    const getData = async () => {
      const resp = await (await fetch(url)).json()
      console.log(resp);
      setResponse(resp)
      setData(resp)
    }
    getData()
  },[])

  return (
    <div className="App">
      <Navbar activeEl={activeNavEl} setActiveEl={setActiveNavEl} />
      {activeNavEl === 0 && data && <Products data={data} setData={setData} originalData={response} />}
      {activeNavEl === 1 && <Cart />}
    </div>
  );
}

export default App;

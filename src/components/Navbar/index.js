import { useStoreContext } from '../../context'
import './Navbar.css'

const Navbar = ({ activeEl, setActiveEl }) => {
  const { totalProducts } = useStoreContext()

  return (
    <div className='nav-container'>
        <div className="nav-logo" onClick={() => setActiveEl(0)}>TeeRex Store</div>
        <div className="nav-elements">
            <div className={`nav-link ${activeEl === 0 && 'active-link'}`} onClick={() => setActiveEl(0)}>Products</div>
            <div className={`cart-icon-btn ${activeEl === 1 && 'active-btn'}`} data-items-count={totalProducts} onClick={() => setActiveEl(1)}>
                <img src='assets/cart.svg' alt='cart' />
            </div>
        </div>
    </div>
  )
}

export default Navbar
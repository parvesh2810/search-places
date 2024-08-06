import backArrow from './assets/arrow-left.svg';
import burger1 from './assets/Burger.png';
import burger2 from './assets/burger2.png';
import fanta from './assets/Fanta.png';
import bill from './assets/bill.svg';
import maps from './assets/maps.svg';

function App() {
  //All the below sections can be broken into child components as we are using react 
  return (
    <div className="app">
      <div className='checkout-header'>
        <div className='back-arrow'>
          <img src={backArrow} alt=''/>
        </div>
        <p className='title'>Checkout</p>
        <p className='sub-title'>Popeyes | JP Nagar</p>
      </div>
      <ul className='cart-container'>
        <li className='cart-item'>
          <img src={burger1} alt=''/>
          <div className='right-section'>
            <p className='title'>Carriableim</p>
            <p className='sub-title'>350 Kcal</p>
            <div className='price-quantity'>
              <p>₹ 319</p>
              <button><span>-  </span> 1 <span>  +</span></button>
            </div>
          </div>
        </li>
        <li className='cart-item'>
          <img src={burger2} alt=''/>
          <div className='right-section'>
            <p className='title'>Carriableim</p>
            <p className='sub-title'>350 Kcal</p>
            <div className='price-quantity'>
              <p>₹ 319</p>
              <button><span>-  </span> 1 <span>  +</span></button>
            </div>
          </div>
        </li>
      </ul>
      <h4>Frequently Order</h4>
      <ul className='cart-container frequent'>
        <li className='cart-item frequent'>
          <img src={fanta} alt=''/>
          <div className='right-section'>
            <p className='title'>Carriableim</p>
            <p className='sub-title'>350 Kcal</p>
            <div className='price-quantity'>
              <p>₹ 319</p>
            </div>
          </div>
        </li>
        <li className='cart-item'>
          <img src={fanta} alt=''/>
          <div className='right-section'>
            <p className='title'>Carriableim</p>
            <p className='sub-title'>350 Kcal</p>
            <div className='price-quantity'>
              <p>₹ 319</p>
            </div>
          </div>
        </li>
        <li className='cart-item'>
          <img src={fanta} alt=''/>
          <div className='right-section'>
            <p className='title'>Carriableim</p>
            <p className='sub-title'>350 Kcal</p>
            <div className='price-quantity'>
              <p>₹ 319</p>
            </div>
          </div>
        </li>
        <li className='cart-item'>
          <img src={fanta} alt=''/>
          <div className='right-section'>
            <p className='title'>Carriableim</p>
            <p className='sub-title'>350 Kcal</p>
            <div className='price-quantity'>
              <p>₹ 319</p>
            </div>
          </div>
        </li>
      </ul>
      <div className='lower-section'>
        <div>
          <img src={maps} alt=''/>
            <div className='right-section'>
              <p className='title'>Delivery to</p>
              <p className='sub-title'>23 Avenue JP Nagar banglore</p>
            </div>
          </div>
        <div className='price-section'>
          <div className='inner'>
            <img src={bill} alt=''/>
              <div className='right-section'>
              <p className='title'>Total Bill</p>
              <p className='sub-title'>Including Taxes</p>
            </div>
          </div>
          <p className='title'>₹ 538</p>
        </div>
      </div>
      <button className='save-btn'>Proceed to checkout</button>
    </div>
  );
}

export default App;

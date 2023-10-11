import { getProdImg } from "utils";
import "./style.css";

const Cart = ({ cart, setCart }) => {
  const calcCartPrice = () =>
    cart
      .reduce((acc, item) => {
        acc += item.price;
        return acc;
      }, 0)
      .toFixed(2);

  const delCartItem = (idx) => {
    const newCart = [...cart];
    newCart.splice(idx, 1);
    setCart(newCart);
  };

  return (
    <div className="cart-drawer">
      <div className="cart-title">
        <div>
          Shopping Cart {`(${cart.length} item${cart.length === 1 ? "" : "s"})`}
        </div>
        <div>Total {`$${calcCartPrice()}`}</div>
      </div>
      <ul className="cart-section">
        {cart.length === 0
          ? "The cart is empty!"
          : cart.map((cat, idx) => (
              <li key={idx} className="cart-item">
                <img src={getProdImg(cat.name)} alt={cat.name} />
                <div className="cart-item-desc">
                  {cat.name}
                  <br />
                  Glazing: {cat.glazing}
                  <br />
                  Pack Size: {cat.packSize}
                  <br />
                  <b>${cat.price}</b>
                </div>
                <button onClick={() => delCartItem(idx)}>Remove</button>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Cart;

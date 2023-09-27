import "./App.css";
import { PRODUCTS } from "utils";
import ProdItem from "components/ProdItem";
import Navbar from "components/Navbar";
import { useRef, useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const [popup, setPopup] = useState(null);
  const timer = useRef(null);

  // checker
  const checkCartItem = ({ name, packSize, glazing }) => {
    // didn't select packSize
    if (!packSize) {
      return "invalid_entry";
    }
    const cartItemIdx = cart.findIndex((item) => item.name === name);
    const cartItem = cart[cartItemIdx];
    // duplicate entry
    if (
      cartItem &&
      cartItem.name === name &&
      cartItem.packSize === packSize &&
      cartItem.glazing === glazing
    ) {
      return "invalid_entry";
    }
    // new entry or existing cart item
    return cartItem ? cartItemIdx : "new_entry";
  };

  const handleAddCart = (product) => {
    // // check if cart should update
    const cartCheck = checkCartItem(product);
    if (cartCheck === "invalid_entry") {
      return;
    }
    // update or add new entry to cart
    if (cartCheck === "new_entry") {
      setCart((prev) => [...prev, product]);
    } else {
      setCart((prev) => {
        prev[cartCheck] = product;
        return prev;
      });
    }
    setPopup(product);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setPopup(null);
    }, 3000);
  };

  return (
    <div className="App">
      <Navbar popup={popup} cart={cart} />
      {/* List of products */}
      <main className="content">
        <ul className="products">
          {PRODUCTS.map((prod, idx) => (
            <ProdItem
              key={idx}
              product={prod}
              id={idx}
              handleAddCart={handleAddCart}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

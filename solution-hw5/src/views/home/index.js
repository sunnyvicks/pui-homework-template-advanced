import "./style.css";
import { PRODUCTS } from "utils";
import ProdItem from "components/ProdItem";
import Navbar from "components/Navbar";
import Search from "components/Search";
import Cart from "components/Cart";
import { useRef, useState } from "react";

function Home() {
  const [cart, setCart] = useState([]);
  const [popup, setPopup] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [products, setProducts] = useState(PRODUCTS);

  const timer = useRef(null);

  // checker
  const checkCartItem = ({ packSize }) => {
    // didn't select packSize
    if (!packSize) {
      return "invalid_entry";
    }
    // remove checking for duplicates, everything is new entry
    return "new_entry";
  };

  const handleAddCart = (product) => {
    // check if cart should update
    const cartCheck = checkCartItem(product);
    if (cartCheck === "invalid_entry") {
      return;
    }
    // update or add new entry to cart
    if (cartCheck === "new_entry") {
      setCart((prev) => [...prev, product]);
    }
    setPopup(product);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setPopup(null);
    }, 3000);
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <div>
      <Navbar popup={popup} toggleCart={toggleCart} />
      <Search setProducts={setProducts} />
      {isCartOpen && <Cart cart={cart} setCart={setCart} />}
      {/* List of products */}
      <main className="content">
        <ul className="products">
          {products.length === 0
            ? "No Match!"
            : products.map((prod, idx) => (
                <ProdItem
                  key={prod.name}
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

export default Home;

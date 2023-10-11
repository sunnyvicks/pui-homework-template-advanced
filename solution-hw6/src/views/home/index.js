import "./style.css";
import { PRODUCTS, CART_STORAGE_NAME } from "utils";
import ProdItem from "components/ProdItem";
import Navbar from "components/Navbar";
import Search from "components/Search";
import Cart from "components/Cart";
import { useEffect, useRef, useState } from "react";

function Home() {
  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_NAME));
    return storedCart || [];
  });

  const [popup, setPopup] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [products, setProducts] = useState(PRODUCTS);

  const timer = useRef(null); // for popup
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    const updateCartOnStorage = (evt) => {
      if (evt.key === CART_STORAGE_NAME) {
        setCart(JSON.parse(evt.newValue));
      }
    };

    // syncs changes in other pages of the same domain
    window.addEventListener("storage", updateCartOnStorage);

    return () => window.removeEventListener("storage", updateCartOnStorage);
  }, []);

  useEffect(() => {
    // update localstorage when cart changes
    if (!isMounted.current) return;
    localStorage.setItem(CART_STORAGE_NAME, JSON.stringify(cart));
    console.log(localStorage.getItem(CART_STORAGE_NAME));
  }, [cart.length]);

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
      const newCart = [...cart, product];
      setCart(newCart);
    }
    // popup for adding new item
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
                  addCart={handleAddCart}
                />
              ))}
        </ul>
      </main>
    </div>
  );
}

export default Home;

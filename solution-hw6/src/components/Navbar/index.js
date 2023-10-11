import "./style.css";

const Navbar = ({ popup, toggleCart }) => {
  const handleKeyCart = (evt) => {
    if (evt.code === "Enter") {
      toggleCart();
    }
  };

  return (
    <header className="header content">
      <div className="logo">
        <a href=".">
          <img src="../assets/logo/logo-01.svg" alt="logo" />
        </a>
      </div>
      <div className="header-right">
        <nav>
          <ul>
            <li>
              <a href=".">PRODUCTS</a>
            </li>
            <li className="cart">
              <div
                className="cart-btn"
                tabIndex={0}
                onKeyDown={(evt) => handleKeyCart(evt)}
                onClick={() => toggleCart()}
              >
                CART
              </div>
              {/* Cart popup */}
              {!!popup && (
                <>
                  <div id="cart-popup">
                    <div>Added to cart:</div>
                    <div className="cart-product">
                      <b>{popup.name}</b>
                      <br />
                      {popup.glazing}
                      <br />
                      Pack of {popup.packSize}
                      <br />
                      Price: {popup.price}
                    </div>
                  </div>
                </>
              )}
            </li>
          </ul>
        </nav>
        <hr />
        <h2>Our hand-made cinamon rolls</h2>
      </div>
    </header>
  );
};

export default Navbar;

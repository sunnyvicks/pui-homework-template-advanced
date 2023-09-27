import "./style.css";

const Navbar = ({ popup, cart }) => {
  const calcCartPrice = () =>
    cart
      .reduce((acc, item) => {
        acc += item.price;
        return acc;
      }, 0)
      .toFixed(2);

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
              CART
              {/* Cart summary */}
              <div id="cart-summary">
                <div>
                  <span className="item">{cart.length}</span> item
                  {cart.length === 1 ? "" : "s"}
                </div>
                <div>
                  Total: $ <span className="total">{calcCartPrice()}</span>
                </div>
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

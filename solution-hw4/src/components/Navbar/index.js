import "./style.css";

const Navbar = () => {
  return (
    <header class="header content">
      <div class="logo">
        <a href=".">
          <img src="../assets/logo/logo-01.svg" alt="logo" />
        </a>
      </div>
      <div class="header-right">
        <nav>
          <ul>
            <li>
              <a href=".">PRODUCTS</a>
            </li>
            <li class="cart">CART</li>
          </ul>
        </nav>
        <hr />
        <h2>Our hand-made cinamon rolls</h2>
      </div>
    </header>
  );
};

export default Navbar;

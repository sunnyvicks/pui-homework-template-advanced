import "./App.css";
import { PRODUCTS } from "utils";
import ProdItem from "components/ProdItem";
import Navbar from "components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* List of products */}
      <main class="content">
        <ul class="products">
          {PRODUCTS.map((prod, idx) => (
            <ProdItem name={prod.name} price={prod.price} id={idx} key={idx} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

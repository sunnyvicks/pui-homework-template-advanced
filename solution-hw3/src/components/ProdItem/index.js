import "./style.css";
const ProdItem = ({ product, id }) => {
  const getProdImg = (name) =>
    `assets/products/${name.toLowerCase().split(" ").join("-")}.jpg`;

  return (
    <li data-prod-idx="${idx}">
      <img width="400" src={getProdImg(product.name)} alt={product.name} />
      <div className="product-title">{product.name}</div>
      <div className="selection">
        <div className="input">
          <label for={`glazing_${id}`}>Glazing:</label>
          <select id={`glazing_${id}`}>
            <option>Keep original</option>
            <option>Sugar milk</option>
            <option>Vanilla milk</option>
            <option>Double chocolate</option>
          </select>
        </div>
        <div className="input">
          <label>Pick size:</label>
          <div className="select-button">
            <label>
              1
              <input type="radio" name="pack_1" value="1" hidden />
            </label>
            <label>
              3
              <input type="radio" name="pack_1" value="3" hidden />
            </label>
            <label>
              6
              <input type="radio" name="pack_1" value="6" hidden />
            </label>
            <label>
              12
              <input type="radio" name="pack_1" value="12" hidden />
            </label>
          </div>
        </div>
      </div>
      <div className="input product-add">
        <div className="price">
          <span>${product.price}</span>
        </div>
        <button>Add to Cart</button>
      </div>
    </li>
  );
};

export default ProdItem;

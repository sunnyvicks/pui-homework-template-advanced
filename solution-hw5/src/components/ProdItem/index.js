import "./style.css";
import { GLAZING_OPTIONS, PACK_SIZES, calcSubtotal } from "utils";
import { useEffect, useState } from "react";

const ProdItem = ({ product, id, handleAddCart }) => {
  const [price, setPrice] = useState(product.price);
  const [glazingOpt, setGlazingOpt] = useState(GLAZING_OPTIONS[0]);
  const [packSizeOpt, setPackSizeOpt] = useState(null);

  const getProdImg = (name) =>
    `assets/products/${name.toLowerCase().split(" ").join("-")}.jpg`;

  useEffect(() => {
    const newPrice = calcSubtotal({
      packSize: packSizeOpt?.value || 1,
      glazing: glazingOpt.value,
      price: product.price,
    });
    setPrice(newPrice);
  }, [glazingOpt.value, packSizeOpt?.value || 1]);

  const handleGlazingChange = (evt) => {
    const idx = evt.target.value;
    const opt = GLAZING_OPTIONS[idx];
    setGlazingOpt(opt);
  };

  const handlePackSizeChange = (packSizeOpt) => {
    setPackSizeOpt(packSizeOpt);
  };

  const handleKeyPackSizeChange = (evt, packSizeOpt) => {
    if (evt.code === "Enter") {
      handlePackSizeChange(packSizeOpt);
    }
  };

  return (
    <li data-prod-idx="${idx}">
      <img width="400" src={getProdImg(product.name)} alt={product.name} />
      <div className="product-title">{product.product}</div>
      <div className="selection">
        <div className="input">
          <label htmlFor={`glazing_${id}`}>Glazing:</label>
          <select
            id={`glazing_${id}`}
            onChange={(evt) => handleGlazingChange(evt)}
          >
            {GLAZING_OPTIONS.map((opt, idx) => (
              <option key={idx} value={idx}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input">
          <label>Pick size:</label>
          <div className="select-button">
            {PACK_SIZES.map((size, idx) => (
              <label
                key={idx}
                tabIndex={0}
                onKeyDown={(evt) => handleKeyPackSizeChange(evt, size)}
              >
                {size.name}
                <input
                  onChange={() => handlePackSizeChange(size)}
                  checked={!!(size.value === packSizeOpt?.value)}
                  type="radio"
                  name={`pack_${id}`}
                  value={size.value}
                  hidden
                />
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="input product-add">
        <div className="price">
          <span>${price}</span>
        </div>
        <button
          onClick={() =>
            handleAddCart({
              name: product.name,
              price,
              glazing: glazingOpt.name,
              packSize: packSizeOpt?.name,
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </li>
  );
};

export default ProdItem;

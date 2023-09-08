class Roll {
  constructor(type, price, glazing, packSize) {
    this.type = type;
    this.price = price;
    this._glazing = glazing;
    this._packSize = packSize;
  }

  get packSize() {
    return this._packSize;
  }
  set packSize(newSize) {
    this._packSize = newSize;
  }

  get glazing() {
    return this._glazing;
  }
  set glazing(newGlazing) {
    this._glazing = newGlazing;
  }
}

// name is what's stored in Roll
// values will be retreived during calculations
const GLAZING_OPTIONS = [
  { name: "Keep original", value: 0 },
  { name: "Sugar milk", value: 0 },
  { name: "Vanilla milk", value: 0.5 },
  { name: "Double chocolate", value: 1.5 },
];

const PACK_SIZES = [
  { name: 1, value: 1 },
  { name: 3, value: 3 },
  { name: 6, value: 6 },
  { name: 12, value: 10 },
];

const PRODUCTS = [
  { name: "Original cinnamon roll", price: 2.49 },
  { name: "Apple cinnamon roll", price: 3.49 },
  { name: "Raisin cinnamon roll", price: 2.99 },
  { name: "Walnut cinnamon roll", price: 3.49 },
  { name: "Double-chocolate cinnamon roll", price: 3.99 },
  { name: "Strawberry cinnamon roll", price: 3.99 },
];

const productStorage = []; // Roll[]
const cartStorage = []; // {type, glazing, packSize, subtotal}[]

// PRICE CALCULATION

const calcSubtotal = (product) => {
  // debug packSize initial value error => when haven't selected packSize yet, calculate price with the smallest packSize
  const packVal =
    product.packSize === 0
      ? PACK_SIZES[0].value
      : PACK_SIZES.find((sizeOpt) => sizeOpt.name === product.packSize)?.value;
  const glazeVal = GLAZING_OPTIONS.find(
    (glazeOpt) => glazeOpt.name === product.glazing
  )?.value;

  // can't find option
  if (packVal === undefined || glazeVal === undefined) return 0;

  // rounding from stackoverflow: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
  const num = Math.round((product.price + glazeVal) * packVal + "e" + 2);
  return Number(num + "e" + -2);
};

// HANDLE SELECTION CHANGE

const updatePrice = (index) => {
  const priceElm = document.querySelector(
    `#products li[data-prod-idx="${index}"] .price span`
  );
  const product = productStorage[index];
  priceElm.innerHTML = calcSubtotal(product);
};

const glazingChange = (element) => {
  const glazing = element.value;
  const idx = element.id.split("_")[1];
  productStorage[idx].glazing = glazing;
  updatePrice(idx);
};

const packChange = (element) => {
  const inputElm = element.querySelector("input");
  const pack = inputElm.value;
  const idx = inputElm.name.split("_")[1];
  productStorage[idx].packSize = +pack;
  updatePrice(idx);
};

// accessibility for packSize
const packChangeOnKey = (evt) => {
  if (evt.code === "Enter") {
    packChange(evt.target);
    // update selection
    evt.target.querySelector("input").checked = true;
  }
};

// ADDING TO CART

// checker
const checkCartItem = (product) => {
  // didn't select packSize
  if (!product.packSize) {
    return "invalid_entry";
  }
  const cartItemIdx = cartStorage.findIndex(
    (cartItem) => cartItem.type === product.type
  );
  const cartItem = cartStorage[cartItemIdx];
  // duplicate entry
  if (
    cartItem &&
    cartItem.type === product.type &&
    cartItem.packSize === product.packSize &&
    cartItem.glazing === product.glazing
  ) {
    return "invalid_entry";
  }
  // new entry or existing cart item
  return cartItem ? cartItemIdx : "new_entry";
};

const addToCart = (index) => {
  const product = productStorage[index];
  // check if cart should update
  const cartCheck = checkCartItem(product);
  if (cartCheck === "invalid_entry") {
    return;
  }
  const newCartItem = {
    type: product.type,
    packSize: product.packSize,
    glazing: product.glazing,
    subtotal: calcSubtotal(product),
  };
  // update or add new entry to cart
  if (cartCheck === "new_entry") {
    cartStorage.push(newCartItem);
  } else {
    cartStorage[cartCheck] = newCartItem;
  }

  // update summary text
  const itemsElm = document.querySelector(
    "#cart-summary > div:nth-child(1) span"
  );
  const totalElm = document.querySelector(
    "#cart-summary > div:nth-child(2) span"
  );
  itemsElm.innerText = cartStorage.length;
  totalElm.innerText = cartStorage.reduce(
    (total, cartItem) => (total += cartItem.subtotal),
    0
  );

  // show popup
  const popupElm = document.querySelector("#cart-popup");
  const productContentElm = popupElm.querySelector(".cart-product");
  productContentElm.innerHTML = `
    <b>${newCartItem.type}</b><br>
    ${newCartItem.glazing}<br>
    Pack of ${newCartItem.packSize}<br>
    Price: ${newCartItem.subtotal}
  `;
  popupElm.classList.add("active");
  setTimeout(() => {
    // hide popup after 3 seconds
    popupElm.classList.remove("active");
  }, 3000);
};

// INITIATE DATA & PAGE
const initProducts = () => {
  let html = "";
  PRODUCTS.forEach((prod, idx) => {
    // storage for all products
    productStorage.push(
      new Roll(
        prod.name,
        prod.price,
        GLAZING_OPTIONS[0].name,
        0 // no default selection for packSize
      )
    );
    // html population
    html += `<li data-prod-idx="${idx}">
        <img
          width="400"
          src="../assets/products/${
            prod.name.toLowerCase().split(" ").join("-") + ".jpg"
          }"
          alt="${prod.name}"
        />
        <div class="product-title">${prod.name}</div>
        <div class="selection">
          <div class="input">
            <label for="glazing_${idx}">Glazing:</label>
            <select id="glazing_${idx}" onchange="glazingChange(this)">
            ${GLAZING_OPTIONS.map(
              (opt) => `<option value="${opt.name}">${opt.name}</option>`
            ).join("")}
            </select>
          </div>
          <div class="input">
            <label>Pick size:</label>
            <div class="select-button">
            ${PACK_SIZES.map(
              (size) =>
                `<label onclick="packChange(this)" tabindex="0" onKeyPress="packChangeOnKey(event)">
                    ${size.name}
                    <input type="radio" name="pack_${idx}" value="${size.name}" hidden />
                </label>`
            ).join("")}
            </div>
          </div>
        </div>
        <div class="input product-add">
          <div class="price">$ <span>${prod.price}</span></div>
          <button onclick="addToCart(${idx})">Add to Cart</button>
        </div>
      </li>`;
  });
  document.querySelector("#products").innerHTML = html;
};

window.onload = () => {
  initProducts();
};

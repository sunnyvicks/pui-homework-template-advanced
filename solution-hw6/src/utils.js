// name is what's stored in Roll
// values will be retreived during calculations
export const GLAZING_OPTIONS = [
  { name: "Keep original", value: 0 },
  { name: "Sugar milk", value: 0 },
  { name: "Vanilla milk", value: 0.5 },
  { name: "Double chocolate", value: 1.5 },
];

export const PACK_SIZES = [
  { name: 1, value: 1 },
  { name: 3, value: 3 },
  { name: 6, value: 6 },
  { name: 12, value: 10 },
];

export const PRODUCTS = [
  { name: "Original cinnamon roll", price: 2.49 },
  { name: "Apple cinnamon roll", price: 3.49 },
  { name: "Raisin cinnamon roll", price: 2.99 },
  { name: "Walnut cinnamon roll", price: 3.49 },
  { name: "Double-chocolate cinnamon roll", price: 3.99 },
  { name: "Strawberry cinnamon roll", price: 3.99 },
];

export const calcSubtotal = ({ packSize, glazing, price }) => {
  // rounding from stackoverflow: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
  const num = Math.round((price + glazing) * packSize + "e" + 2);
  return Number(num + "e" + -2);
};

export const getProdImg = (name) =>
  `assets/products/${name.toLowerCase().split(" ").join("-")}.jpg`;

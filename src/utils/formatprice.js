const formatPrice = price => {
  return Number(price)
    .toFixed(2)
    .replace(".", ",");
};

export default formatPrice;

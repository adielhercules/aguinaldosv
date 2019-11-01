export default value =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

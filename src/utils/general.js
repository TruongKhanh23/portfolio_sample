export const formatPrice = ({ price }) => {
  return new Intl.NumberFormat().format(price);
};
export const findBy =
  (list = []) =>
  (key, value = key) =>
    list?.find((item) => item[key] === value);

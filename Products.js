import Images from './Images';
import Shoes from './Shoes';

export default Object.keys(Shoes).map(key => {
  const shoe = Shoes[key];

  return {
    ...shoe,
    title: shoe.name,
    sale: shoe.sale ? `SALE: ${shoe.sale}.00 ${shoe.format}` : null,
    price: `${shoe.price}.00 ${shoe.format}`,
    // selectedColor: shoe.colors[0],
  };
});

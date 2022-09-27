//redux
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const dataProduct = useSelector((state) => state.product.data);
  return (
    <>
      <ul>
        {dataProduct?.map((item) => {
          return <li key={item._id}>{item.name}</li>;
        })}
      </ul>
    </>
  );
};

export default Product;

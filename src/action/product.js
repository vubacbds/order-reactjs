import { axiosProduct } from "./api";

const get_product = () => {
  return (dispatch) => {
    axiosProduct()
      .then((data) => dispatch(get_product_success(data)))
      .catch((error) => console.log(error));
  };
};

const get_product_success = (data) => ({
  type: "GET_PRODUCT_SUCCESS",
  payload: {
    data,
  },
});

const add_product = (data) => ({
  type: "ADD_PRODUCT",
  payload: {
    data,
  },
});

const update_product = (id, data) => ({
  type: "UPDATE_PRODUCT",
  payload: {
    data,
    id,
  },
});

const delete_product = (id) => ({
  type: "DELETE_PRODUCT",
  payload: {
    id,
  },
});

export default get_product;
export { add_product, update_product, delete_product };

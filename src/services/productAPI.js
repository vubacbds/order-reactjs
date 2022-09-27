import axiosClient from "./axiosClient";

const ProductAPI = {
  get_product: () => {
    const url = "/product/get";
    return axiosClient.get(url);
  },
  add_product: (data) => {
    const url = `/product/create`;
    return axiosClient.post(url, data);
  },
  delete_product: (id) => {
    const url = `/product/delete/${id}`;
    return axiosClient.delete(url);
  },
  update_product: (id, data) => {
    const url = `/product/update/${id}`;
    return axiosClient.put(url, data);
  },
};

export default ProductAPI;

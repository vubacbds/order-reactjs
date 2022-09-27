import axios from "axios";
import ProductAPI from "../services/productAPI";

const axiosProduct = () => {
  return new Promise((resolve, reject) => {
    ProductAPI.get_product()
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export { axiosProduct };

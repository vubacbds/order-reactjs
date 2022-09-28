import axios from "axios";
import ProductAPI from "../services/productAPI";
import BillAPI from "../services/billAPI";

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

const axiosBill = () => {
  return new Promise((resolve, reject) => {
    BillAPI.get_bill()
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export { axiosProduct, axiosBill };

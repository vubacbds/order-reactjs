import axiosClient from "./axiosClient";

const BillAPI = {
  get_bill: () => {
    const url = "/bill/get";
    return axiosClient.get(url);
  },
  add_bill: (data) => {
    const url = `/bill/create`;
    return axiosClient.post(url, data);
  },
  delete_bill: (id) => {
    const url = `/bill/delete/${id}`;
    return axiosClient.delete(url);
  },
  update_bill: (id, data) => {
    const url = `/bill/update/${id}`;
    return axiosClient.put(url, data);
  },
};

export default BillAPI;

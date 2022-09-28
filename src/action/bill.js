import { axiosBill } from "./api";

const get_bill_all = () => {
  return (dispatch) => {
    axiosBill()
      .then((data) => dispatch(get_bill_success(data)))
      .catch((error) => console.log(error));
  };
};

const get_bill_success = (data) => ({
  type: "GET_BILL_SUCCESS",
  payload: {
    data,
  },
});

const get_bill = () => ({
  type: "GET_BILL",
});

const add_bill = (data) => ({
  type: "ADD_BILL",
  payload: {
    data,
  },
});

const update_bill = (data) => ({
  type: "UPDATE_BILL",
  payload: {
    data,
  },
});

const delete_bill = (id) => ({
  type: "DELETE_BILL",
  payload: {
    id,
  },
});

export default get_bill_all;
export { get_bill, add_bill, update_bill, delete_bill };

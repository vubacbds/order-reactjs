const initialState = {
  data: {},
};

export const billReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BILL_SUCCESS": {
      return {
        data: { ...state.data },
        dataAll: action.payload.data,
      };
    }

    case "GET_BILL": {
      return {
        ...state,
        data: {},
      };
    }

    case "ADD_BILL": {
      return {
        ...state,
        data: action.payload.data,
      };
    }

    case "UPDATE_BILL": {
      return {
        ...state,
        data: action.payload.data,
      };
    }

    case "DELETE_BILL": {
      const newState = { ...state };
      const newProductList = newState.data.filter(
        (item) => item._id !== action.payload.id
      );
      return {
        ...newState,
        data: newProductList,
      };
    }

    case "ADD_BILL_ALL": {
      return {
        ...state,
        dataAll: [action.payload.data, ...state.dataAll],
      };
    }

    case "UPDATE_BILL_ALL": {
      const newBillList = state.dataAll.map((item) => {
        if (item._id == action.payload.id) {
          return (item = { ...item, ...action.payload.data });
        } else return item;
      });

      return {
        ...state,
        dataAll: newBillList,
      };
    }

    default:
      return state;
  }
};

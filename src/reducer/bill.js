const initialState = {
  data: {},
};

export const billReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BILL_SUCCESS": {
      return {
        data: action.payload.data,
      };
    }

    case "GET_BILL": {
      return {
        data: {},
      };
    }

    case "ADD_BILL": {
      return {
        data: action.payload.data,
      };
    }

    case "UPDATE_BILL": {
      return {
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

    default:
      return state;
  }
};

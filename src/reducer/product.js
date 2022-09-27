const initialState = {};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT_SUCCESS": {
      return {
        data: action.payload.data,
      };
    }

    case "ADD_PRODUCT": {
      return {
        ...state,
        data: [action.payload.data, ...state.data],
      };
    }

    case "UPDATE_PRODUCT": {
      const newProductList = state.data.map((item) => {
        if (item._id == action.payload._id) {
          return (item = { ...item, ...action.payload.data });
        } else return item;
      });

      return {
        ...state,
        data: newProductList,
      };
    }

    case "DELETE_PRODUCT_SUCCESS": {
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

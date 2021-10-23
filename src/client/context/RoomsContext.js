import createDataContext from "./createDataContext";

const initialState = {
  rooms: null
};

const RoomsReducer = (state, payload) => {
  switch (payload.type) {
    case "updateRooms":
      return { ...state, rooms: payload.rooms };
    default:
      return state;
  }
};

const updateRooms = dispatch => rooms => {
  if (Object.keys(rooms).includes("_data")) {
    dispatch({ type: "updateRooms", rooms: rooms._data });
  } else {
    dispatch({ type: "updateRooms", rooms: rooms });
  }
}

export const { Provider, Context } = createDataContext(
  //reducer :
  RoomsReducer,

  //action functions :
  {
    updateRooms
  },

  //initialState :
  {
   ...initialState
  }
);
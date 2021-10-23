import createDataContext from "./createDataContext";

const initialState = {
  uuidRoom: null,
  player: null
};

const UserReducer = (state, payload) => {
  switch (payload.type) {
    case "updateUuidRoom": {
      return {  ...state, uuidRoom: payload.uuidRoom };
    }
    case "updatePlayer": 
      return {  ...state, player: payload.player };
    default:
      return state;
  }
};

const updateUuidRoom = dispatch => uuidRoom => 
  dispatch({ type: "updateUuidRoom", uuidRoom });

const updatePlayer = dispatch => player => 
  dispatch({ type: "updatePlayer", player });

export const { Provider, Context } = createDataContext(
  //reducer :
  UserReducer,

  //action functions :
  {
    updateUuidRoom,
    updatePlayer
  },

  //initialState :
  {
   ...initialState
  }
);
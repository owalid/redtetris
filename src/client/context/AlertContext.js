import createDataContext from "./createDataContext";
export const ALERT_POP = 'ALERT_POP'

const initialState = {
  message: '',
  type: null,
};

const alertReducer = (state, action) => {
  switch(action.type){
    case ALERT_POP:
      return { message: action.message, type: action.typeAlert }
    default: 
      return state
  }
};

const sendAlert = (dispatch) => (message, typeAlert) =>
  dispatch({ type: ALERT_POP, typeAlert, message })

export const { Provider, Context } = createDataContext(
  //reducer :
  alertReducer,

  //action functions :
  {
    sendAlert
  },

  //initialState :
  {
   ...initialState
  }
);
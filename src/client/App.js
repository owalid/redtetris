import { hot } from "react-hot-loader";
import React from "react";
import Router from './router/index';
import { SocketContextProvider } from "./context/SocketContext";
import { Provider as AlertContext } from "./context/AlertContext";
import { Provider as UserContext } from "./context/UserContext";
import { Provider as RoomsContext } from "./context/RoomsContext";
process.env.NODE_ENV === "production"
  ? require("../../public/assets/styles/main.css")
  : require("./styles/main.scss");

const App = () => (
  <AlertContext>
    <UserContext>
      <RoomsContext>
        <SocketContextProvider>
          <Router />
        </SocketContextProvider>
      </RoomsContext>
    </UserContext>
  </AlertContext>
)

export default hot(module)(App);

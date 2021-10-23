import React, { useContext, useEffect } from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider as AlertProvider } from "../../../src/client/context/AlertContext";
import { Context as AlertContext } from "../../../src/client/context/AlertContext";

Enzyme.configure({ adapter: new Adapter() });

export const TestAppAlertProvider = ({ children }) => (
  <AlertProvider>{children}</AlertProvider>
);

export const TestAppAlertProviderWithAlerts = ({ children }) => (
  <TestAppAlertProvider>
    <CurrentAlertSetter>{children}</CurrentAlertSetter>
  </TestAppAlertProvider>
);

const CurrentAlertSetter = ({ children }) => {
  const { sendAlert } = useContext(AlertContext);
  useEffect(() => {
    sendAlert('Soon, will be here a fantastic Tetris ...', 'info');
  }, []);
  return <>{children}</>;
};

import React, { useContext, useEffect } from "react";
import '@testing-library/jest-dom/extend-expect';
import Enzyme from "enzyme";
import { render } from '@testing-library/react'
import Adapter from "enzyme-adapter-react-16";
import Alerts from '../../../src/client/components/Alerts'
import { Context as AlertContext } from "../../../src/client/context/AlertContext";
import { TestAppAlertProvider } from "../helpers/AlertContext";

Enzyme.configure({ adapter: new Adapter() });

describe('Alert component', () => {

  it('Is exists', () => {
    const CurrentAlertSetter = ({ children }) => {
      const { sendAlert } = useContext(AlertContext);
      useEffect(() => {
        sendAlert('It\'s little test', 'info');
      }, [])
      return <>{children}</>;
    };
  
    const Wrapper = () => (
      <TestAppAlertProvider>
        <CurrentAlertSetter>
          <Alerts />
        </CurrentAlertSetter>
      </TestAppAlertProvider>
    )
  
    render(<Wrapper />);
  });

  it('Have alert', () => {
  
    const Wrapper = () => (
      <TestAppAlertProvider>
        <Alerts />
      </TestAppAlertProvider>
    )
    const { container } = render(<Wrapper />);
    const container_not_visitor = container.querySelector('.test--alert')
    expect(container_not_visitor).toBeNull()
  })

});
import React, { useContext, useEffect } from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { rooms_instance } from "../helpers/data";
import { render } from '@testing-library/react'
import { Context as RoomsContext } from "../../../src/client/context/RoomsContext";
import { TestAppRoomsProvider } from "../helpers/RoomsContext";
import { describe, expect, test } from "@jest/globals";

Enzyme.configure({ adapter: new Adapter() });

describe("Test RoomContext", () => {
  test("Test updateRooms function", () => {
    let contextValue;
    const RoomsUpdaterComp = () => {
      const { updateRooms, state } = useContext(RoomsContext);
      contextValue = state;
      useEffect(() => {
        updateRooms(rooms_instance);
      }, [])
      return null;
    };
    const Wrapper = () => (
      <TestAppRoomsProvider>
        <RoomsUpdaterComp />
      </TestAppRoomsProvider>
    );
    render(<Wrapper />);
    expect(contextValue.rooms).toBe(rooms_instance);
  })
})
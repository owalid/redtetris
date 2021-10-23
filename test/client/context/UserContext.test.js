import React, { useContext, useEffect } from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { players_2 } from "../helpers/data";
import { render } from '@testing-library/react'
import { Context as UserContext } from "../../../src/client/context/UserContext";
import { TestAppUserProvider } from "../helpers/UserContext";
import { describe, expect, test } from "@jest/globals";

Enzyme.configure({ adapter: new Adapter() });

describe("Test userContext functions", () => {
  test("Test updateUuidRoom", () => {
    let contextValue;
    const UuidUpdaterComp = () => {
      const { updateUuidRoom, state } = useContext(UserContext);
      contextValue = state;
      useEffect(() => {
        updateUuidRoom("112233445566778899");
      }, [])
      return null;
    };
    const Wrapper = () => (
      <TestAppUserProvider>
        <UuidUpdaterComp />
      </TestAppUserProvider>
    );
    render(<Wrapper />);
    expect(contextValue.uuidRoom).toBe("112233445566778899");
  })

  test("Test updatePlayer", () => {
    let contextValue;
    const PlayerUpdaterComp = () => {
      const { updatePlayer, state } = useContext(UserContext);
      contextValue = state;
      useEffect(() => {
        updatePlayer(players_2[0]);
      }, [])
      return null;
    };
    const Wrapper = () => (
      <TestAppUserProvider>
        <PlayerUpdaterComp />
      </TestAppUserProvider>
    );
    render(<Wrapper />);
    expect(contextValue.player).toBe(players_2[0]);
  })
})
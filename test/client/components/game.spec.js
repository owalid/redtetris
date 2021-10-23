import React from "react";
import '@testing-library/jest-dom/extend-expect';
import Enzyme from "enzyme";
import Game from '../../../src/client/components/Game'
import { render } from '@testing-library/react'
import { player_instance1, room1 } from "../helpers/data";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
describe('Alert component', () => {

  it('Can mount', () => {
    const Wr = () => (
      <Game
        mapGame={room1.players[player_instance1.uuid].currentMapGame}
        song={false}
        isOtherUser={false}
      />
    )
    const w = render(<Wr />);
    expect(w).not.toBeNull()
  })

});
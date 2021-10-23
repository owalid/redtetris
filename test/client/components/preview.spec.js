import React from "react";
import _ from 'lodash'
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react'
import { shallow } from 'enzyme';
import Preview from '../../../src/client/components/Preview'
import { player_instance1, room1 } from "../helpers/data";

describe('Preview component', () => {

  const Wrapper = () => {
    <Preview />
  }

  it('Is exists', () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Can mount', () => {
    const Wr = () => (
      <Preview
        mapsGamePreview={_.filter(room1.players, item => item.uuid !== player_instance1.uuid && !item.visitor)}
        isVisitor={false}
        isAlone={false}
        score={room1.players[player_instance1.uuid].score}
        sheet={room1.players[player_instance1.uuid].sheets[0]}
        uuidRoom={room1.channel}
      />
    )
    const w = render(<Wr />);
    expect(w).not.toBeNull()
  })

  it('Element not visitor', () => {
    const Wr = () => (
      <Preview
        mapsGamePreview={_.filter(room1.players, item => item.uuid !== player_instance1.uuid && !item.visitor)}
        isVisitor={true}
        isAlone={false}
        score={room1.players[player_instance1.uuid].score}
        sheet={room1.players[player_instance1.uuid].sheets[0]}
        uuidRoom={room1.channel}
      />
    )

    const { container } = render(<Wr />);
    const container_not_visitor = container.querySelector('.test--container-not-visitor')

    expect(container_not_visitor).toBeNull()
  })
});
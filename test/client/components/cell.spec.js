import React from "react";
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { shallow } from "enzyme";
import { render } from '@testing-library/react'
import Cell from '../../../src/client/components/Cell'
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
describe('Cell component', () => {

  const Wrapper = () => (
    <Cell />
  )

  it('Is exists', () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Can mount', () => {
    const Wr = () => (
      <Cell
        type={1}
        isOtherUser={false}
      />
    )
    const w = render(<Wr />);
    expect(w).not.toBeNull()
  })
});
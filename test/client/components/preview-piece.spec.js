import React from "react";
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { shallow } from "enzyme";
import PreviewPiece from '../../../src/client/components/PreviewPiece'
import Adapter from "enzyme-adapter-react-16";
import { render } from '@testing-library/react'


Enzyme.configure({ adapter: new Adapter() });
describe('PreviewPiece component', () => {

  const Wrapper = () => (
    <PreviewPiece />
  )

  it('Is exists', () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Can mount', () => {
    const Wr = () => (
      <PreviewPiece
        sheet={ {type: 1}}
      />
    )
    const w = render(<Wr />);
    expect(w).not.toBeNull()
  })

});
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react'
import { describe, expect } from "@jest/globals";
import ErrorPage from "../../../../src/client/pages/notfound/ErrorPage";

describe("Test HomePage", () => {

  const Wrapper = () => <Router><ErrorPage /></Router>
  
  it("Test error404 page", () => {
    const { container } = render(<Wrapper />);    
    const container_404 = container.querySelector('.error--404-container')

    expect(container_404).not.toBeNull()
  })

})
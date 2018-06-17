import * as React from 'react';
import { shallow } from 'enzyme';
import CurrencyInput1 from './CurrencyInput1';

describe('CurrencyInput1 :: Unit tests', () => {
  it('renders text input', () => {
    // Arrange
    // Act
    const wrapper = shallow(<CurrencyInput1 />)

    // Assert
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').props().type).toBe('text');
  })
});

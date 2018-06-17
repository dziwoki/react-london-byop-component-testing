import * as React from 'react';
import { shallow } from 'enzyme';
import CurrencyInput2 from './CurrencyInput2';

describe('CurrencyInput2 :: Unit tests', () => {
  it('renders text input', () => {
    // Arrange
    const props = { onChange: () => {} };

    // Act
    const wrapper = shallow(<CurrencyInput2 { ...props } />)

    // Assert
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').props().type).toBe('text');
  });

  it('sets the input value to the value passed with props', () => {
    // Arrange
    const props = { onChange: () => {}, value: 'dummy value' };

    // Act
    const wrapper = shallow(<CurrencyInput2 { ...props } />);

    // Assert
    expect(wrapper.find('input').props().value).toBe(props.value);
  });

  it('calls on change prop when input triggers onChange event', () => {
    // Arrange
    const eventMock = {
      preventDefault: () => {},
      target: {
          value: '12,000.23',
      },
    };
    const props = {
      onChange: jest.fn(),
    };
    const wrapper = shallow(<CurrencyInput2 { ...props } />)

    // Act
    wrapper.find('input').props().onChange(eventMock);

    // Assert
    expect(props.onChange).toHaveBeenCalledWith(12000.23);
  });
});

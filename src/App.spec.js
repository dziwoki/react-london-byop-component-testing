import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import App, {getRandomWith2DecimalPlaces} from './App';
import CurrencyInput1 from './CurrencyInput1';
import CurrencyInput2 from './CurrencyInput2';
import CurrencyInput3 from './CurrencyInput3';

jest.mock('./CurrencyInput1');
jest.mock('./CurrencyInput2');
jest.mock('./CurrencyInput3');

describe('getRandomWith2DecimalPlaces', () => {
  it('returns number between 0 and 10 + 1 with two decimal places', () => {
    // Arrange
    // Act
    const n = getRandomWith2DecimalPlaces(0, 10)

    // Assert
    expect(n < 11).toBeTruthy();
    expect(n > 0).toBeTruthy();
  });

  it('returns number between 100 and 100 + 1 with two decimal places', () => {
    // Arrange
    // Act
    const n = getRandomWith2DecimalPlaces(100, 100)

    // Assert
    expect(n < 101).toBeTruthy();
    expect(n > 100).toBeTruthy();
  });
});

describe('App', () => {
  describe('+handleInput2Change', () => {
    it('updates state with the value', () => {
      // Arrange
      const element = new App({});
      spyOn(element, 'setState');

      // Act
      element.handleInput2Change(531);

      // Assert
      expect(element.setState).toHaveBeenCalledWith({
        input2Value: 531,
      });
    });
  });

  describe('+handleInput3Change', () => {
    it('updates state with the value', () => {
      // Arrange
      const element = new App({});
      spyOn(element, 'setState');

      // Act
      element.handleInput3Change(351.32);

      // Assert
      expect(element.setState).toHaveBeenCalledWith({
        input3Value: 351.32,
      });
    });
  });

  describe('+updateInput3Value', () => {
    it('updates state with random numeric value', () => {
      // Arrange
      const element = new App({});
      spyOn(element, 'setState');

      // Act
      element.updateInput3Value();

      // Assert
      expect(element.setState).toHaveBeenCalledWith({
        input3Value: expect.any(Number),
      });
    });
  });

  describe('Component', () => {
    it('renders CurrencyInput1', () => {
      // Arrange
      // Act
      const wrapper = shallow(<App />);

      // Assert
      expect(wrapper.find(CurrencyInput1).length).toBe(1);
    });

    it('renders CurrencyInput2', () => {
      // Arrange
      // Act
      const wrapper = shallow(<App />);

      // Assert
      expect(wrapper.find(CurrencyInput2).length).toBe(1);
    });

    it('renders CurrencyInput3', () => {
      // Arrange
      // Act
      const wrapper = shallow(<App />);

      // Assert
      expect(wrapper.find(CurrencyInput3).length).toBe(1);
    });

    it('renders button', () => {
      // Arrange
      // Act
      const wrapper = shallow(<App />);

      // Assert
      expect(wrapper.find('button').length).toBe(1);
    });

    it('renders button that calls updateInput3Value when clicked', () => {
      // Arrange
      const updateInput3ValueSpy = spyOn(App.prototype, 'updateInput3Value');
      const wrapper = shallow(<App />);
      const buttonOnClick = wrapper.find('button').props().onClick;

      // Act
      buttonOnClick();

      // Assert
      expect(updateInput3ValueSpy).toHaveBeenCalled();
    });
  });
});

describe('App integration tests', () => {
  let wrapper;

  const simulateClick = w => w.find('button').simulate('click');
  const getCurrencyInput3Value = w => w.find(CurrencyInput3).props().value;

  beforeEach(() => {
    wrapper = mount(<App />);
    wrapper.setState({
      input3Value: 321,
    });
  });

  it('updates CurrencyInput3 value when button is clicked', () => {
    simulateClick(wrapper);
    expect(getCurrencyInput3Value(wrapper)).not.toBe(321);
    expect(getCurrencyInput3Value(wrapper)).toEqual(expect.any(Number));
  });
});

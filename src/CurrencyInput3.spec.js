import * as React from 'react';
import { shallow, mount } from 'enzyme';
import CurrencyInput3 from './CurrencyInput3';

describe('CurrencyInput3', () => {
  describe('+equalsFormattedValue', () => {
    it('returns true if the value is the same as the normlised formatted value from state', () => {
      // Arrange
      const instance = new CurrencyInput3({});
      jest.spyOn(instance, 'normalise').mockImplementation(() => 3423.43);

      // Act
      const isEqual = instance.equalsFormattedValue(3423.43);

      // Assert
      expect(isEqual).toBe(true);
    });

    it('returns false if the value is different same as the normlised formatted value from state', () => {
      // Arrange
      const instance = new CurrencyInput3({});
      jest.spyOn(instance, 'normalise').mockImplementation(() => 3423.43);

      // Act
      const isEqual = instance.equalsFormattedValue(1423.43);

      // Assert
      expect(isEqual).toBe(false);
    });
  });

  describe('+normalise', () => {
    it('returns a number: 10 for text: "1"', () => {
      // Arrange
      const instance = new CurrencyInput3({});

      // Act
      const normalised = instance.normalise('1');

      // Assert
      expect(normalised).toBe(1);
    });

    it('returns a number: 10 for text: "10"', () => {
      // Arrange
      const instance = new CurrencyInput3({});

      // Act
      const normalised = instance.normalise('10');

      // Assert
      expect(normalised).toBe(10);
    });


    it('returns a 0 for empty text', () => {
      // Arrange
      const instance = new CurrencyInput3({});

      // Act
      const normalised = instance.normalise('');

      // Assert
      expect(normalised).toBe(0);
    });

    it('removes non numeric characters', () => {
      // Arrange
      const instance = new CurrencyInput3({});

      // Act
      const normalised = instance.normalise('a213,321.21,13');

      // Assert
      expect(normalised).toBe(213321.2113);
    });
  });

  describe('+format', () => {
    it('returns a string "0" for 0', () => {
      // Arrange
      const instance = new CurrencyInput3({});

      // Act
      const normalised = instance.format(0);

      // Assert
      expect(normalised).toBe('0');
    });

    it('returns a string "10" for 10', () => {
      // Arrange
      const instance = new CurrencyInput3({});

      // Act
      const normalised = instance.format(10);

      // Assert
      expect(normalised).toBe('10');
    });

    it('adds thousand seperator every 3 digits, returns "1,000,000" for number 1000000', () => {
      // Arrange
      const instance = new CurrencyInput3({});

      // Act
      const normalised = instance.format(1000000);

      // Assert
      expect(normalised).toBe('1,000,000');
    });

    it('keeps decimal places, returns a string "1,400.231 for number 1400.231', () => {
      // Arrange
      const instance = new CurrencyInput3({});

      // Act
      const normalised = instance.format(1400.231);

      // Assert
      expect(normalised).toBe('1,400.231');
    });
  });

  describe('#componentDidUpdate', () => {
    it('sets state with value from props if is different from the one on state', () => {
      // Arrange
      const instance = new CurrencyInput3({ value: 1 });
      spyOn(instance, 'setState');
      instance.format = jest.fn().mockImplementation(() => '1,000.32');
      instance.equalsFormattedValue = () => false;

      // Act
      instance.componentDidUpdate({});

      // Assert
      expect(instance.setState).toHaveBeenCalledWith({
        formattedValue: '1,000.32',
      });
      expect(instance.format).toHaveBeenCalledWith(1);
    });

    it('doesn\'t set the state if the value if it is the same', () => {
      // Arrange
      const instance = new CurrencyInput3({});
      spyOn(instance, 'setState');
      instance.equalsFormattedValue = () => true;

      // Act
      instance.componentDidUpdate({});

      // Assert
      expect(instance.setState).not.toHaveBeenCalled();
    });

    it('doesn\'t set state if the props hasn\'t change', () => {
      // Arrange
      const props = { value: 1000.32 };
      const instance = new CurrencyInput3(props);
      spyOn(instance, 'setState');
      instance.props = {
        value: 1000.32,
      };

      // Act
      instance.componentDidUpdate(props);

      // Assert
      expect(instance.setState).not.toHaveBeenCalled();
    });
  });

  describe('+onChange', () => {
    it('prevents default input behaviour', () => {
      // Arrange
      const element = new CurrencyInput3({ onChange: () => {} });
      spyOn(element, 'setState');

      const event = {
        preventDefault: jest.fn(),
        target: { value: '' },
      };

      // Act
      element.onChange(event);

      // Assert
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('sets state with formatted value', () => {
      // Arrange
      const element = new CurrencyInput3({ onChange: () => {} });
      spyOn(element, 'setState');
      element.format = jest.fn().mockImplementation(() => '100');

      const event = {
        preventDefault: jest.fn(),
        target: { value: '' },
      };

      // Act
      element.onChange(event);

      // Assert
      expect(element.setState).toHaveBeenCalledWith({
        formattedValue: '100',
      });
    });

    it('keeps the dangling dot if the only one', () => {
      // Arrange
      const element = new CurrencyInput3({ onChange: () => {} });
      spyOn(element, 'setState');
      element.format = jest.fn().mockImplementation(() => '100');

      const event = {
        preventDefault: jest.fn(),
        target: { value: '100.' },
      };

      // Act
      element.onChange(event);

      // Assert
      expect(element.setState).toHaveBeenCalledWith({
        formattedValue: '100.',
      });
    });

    it('removes the dangling dot if not the only one', () => {
      // Arrange
      const element = new CurrencyInput3({ onChange: () => {} });
      spyOn(element, 'setState');
      element.format = jest.fn().mockImplementation(() => '0.21');

      const event = {
        preventDefault: jest.fn(),
        target: { value: '0.21.' },
      };

      // Act
      element.onChange(event);

      // Assert
      expect(element.setState).toHaveBeenCalledWith({
        formattedValue: '0.21',
      });
    });

    it('calls onChange with the normalised value', () => {
      // Arrange
      const onChange = jest.fn();
      const element = new CurrencyInput3({ onChange });
      spyOn(element, 'setState');
      element.normalise = jest.fn().mockImplementation(() => 0.21);

      const event = {
        preventDefault: jest.fn(),
        target: { value: '10' },
      };

      // Act
      element.onChange(event);

      // Assert
      expect(onChange).toHaveBeenCalledWith(0.21)
    });
  });

  describe('Component', () => {
    it('renders text input', () => {
      // Arrange
      const props = { onChange: () => {} };

      // Act
      const wrapper = shallow(<CurrencyInput3 { ...props } />)

      // Assert
      expect(wrapper.find('input').length).toBe(1);
      expect(wrapper.find('input').props().type).toBe('text');
    });

    it('calls handleChange on input change', () => {
      // Arrange
      const spy = spyOn(CurrencyInput3.prototype, 'onChange');

      const props = { onChange: () => {} };
      const wrapper = shallow(<CurrencyInput3 { ...props } />)

      const inputOnChange = wrapper.find('input').props().onChange;

      // Act
      inputOnChange({
        preventDefault: () => {},
        target: { value: '1' },
      });

      // Assert
      expect(spy).toHaveBeenCalled();
    });
  });
});

describe('CurrencyInput3 integration tests', () => {
  let wrapper;
  let onChange;

  const simulateChange = (w, v) => w.find('input').simulate('change', {
    target: { value: v },
    preventDefault: () => {},
  });

  beforeEach(() => {
    onChange = jest.fn();
    wrapper = mount(<CurrencyInput3 {...{ onChange }} />);
  });

  it('calls parent with 12323.40 given user entered `123,323.40`', () => {
    simulateChange(wrapper, '123,323.40');
    expect(onChange).toHaveBeenCalledWith(123323.40);
  });

  it('calls parent with 213 given user entered 231.', () => {
    simulateChange(wrapper, '231.');
    expect(onChange).toHaveBeenCalledWith(231);
  });

  it('calls parent with 0 given didn\'t enter anything.', () => {
    simulateChange(wrapper, '');
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('formats the value to `123,323` given the user enterer 123323', () => {
    simulateChange(wrapper, '123323');
    expect(wrapper.find('input').props().value).toBe('123,323');
  });

  it('formats the value to `0` given the didn\'t enter anything', () => {
    simulateChange(wrapper, '');
    expect(wrapper.find('input').props().value).toBe('0');
  });

  it('prevents the value from entering second dot', () => {
    simulateChange(wrapper, '123.312.321');
    expect(wrapper.find('input').props().value).toBe('123.312321');
  });

  it('prevents the value from entering invalid thousand seperator', () => {
    simulateChange(wrapper, '1,3,1,2,32,1');
    expect(wrapper.find('input').props().value).toBe('1,312,321');
  });

  it('removes from value all non numeric characters', () => {
    simulateChange(wrapper, '342sd123z.,123,.213vv.313,11');
    expect(wrapper.find('input').props().value).toBe('342,123.1232133131');
  });
});

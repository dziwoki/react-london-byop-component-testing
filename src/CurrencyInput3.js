// @flow
import * as React from 'react';

type CurrencyInput3Props = {
  onChange: number => void,
  value: number,
};

type CurrencyInput3State = {
  formattedValue: string,
};

class CurrencyInput3 extends React.PureComponent<CurrencyInput3Props, CurrencyInput3State> {
  constructor(props: CurrencyInput3Props) {
    super(props);

    this.state = {
      formattedValue: '',
    };
    // $FlowFixMe
    this.onChange = this.onChange.bind(this);
  }

  equalsFormattedValue(value: number) {
    const formattedValueNormalised = this.normalise(this.state.formattedValue);
    return formattedValueNormalised === value;
  }

  componentDidUpdate(prevProps: CurrencyInput3Props) {
    if (prevProps.value === this.props.value) {
      return;
    }

    if (!this.equalsFormattedValue(this.props.value)) {
      this.setState({
        formattedValue: this.format(this.props.value),
      });
    }
  }

  normalise(value: string): number {
    let [integerPart, ...decimalParts] = value.split('.');

    integerPart = integerPart.replace(/[^\d]+/g, '');
    const decimalPart = decimalParts.join('').replace(/[^\d]+/g, '');

    if (!decimalPart.length) {
      return +(integerPart);
    }

    if (!integerPart.length) {
      return +(`0.${decimalPart}`);
    }

    return +([integerPart, decimalPart].join('.'));
  }

  format(value: number): string {
    const [integerPart, decimalPart] = `${value}`.split('.');
    const nextIntegerPart = integerPart
      .split('')
      .reverse()
      .map((digit, idx) => ((idx > 0 && idx % 3 === 0) ? `${digit},` : digit))
      .reverse()
      .join('');

    if (!decimalPart) {
      return nextIntegerPart;
    }
    return [nextIntegerPart, decimalPart].join('.');
  }

  onChange(e: SyntheticInputEvent<HTMLInputElement>) {
    e.preventDefault();

    const { value } = e.target;

    const hasDotAtTheEnd = value.length > 1
      && value.indexOf('.') === value.length - 1
      && value.lastIndexOf('.') === value.length - 1;

    const normalisedValue = this.normalise(value);
    const formattedValue = this.format(normalisedValue);

    this.setState({
      formattedValue: hasDotAtTheEnd ? `${formattedValue}.` : formattedValue,
    });

    this.props.onChange(normalisedValue);
  }

  render() {
    return (
      <input
        type={'text'}
        value={this.state.formattedValue}
        onChange={this.onChange}
      />
    );
  }
}

export default CurrencyInput3;

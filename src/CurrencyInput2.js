// @flow
import * as React from 'react';

type CurrencyInput2Props = {
  onChange: number => void,
  value: number,
};

class CurrencyInput2 extends React.PureComponent<CurrencyInput2Props> {
  constructor(props: CurrencyInput2Props) {
    super(props);
    // $FlowFixMe
    this.onChange = this.onChange.bind(this);
  }

  normaliseValue(value: string): number {
    // eslint-disable-next-line
    return +(value.replace(/[^\d\.]+/g, ''));
  }

  onChange(e: SyntheticInputEvent<HTMLInputElement>) {
    e.preventDefault();

    const { value } = e.target;
    const normalisedValue = this.normaliseValue(value);

    this.props.onChange(normalisedValue);
  }

  render() {
    return (
      <input
        type={'text'}
        value={this.props.value}
        onChange={this.onChange}
      />
    );
  }
}

export default CurrencyInput2;

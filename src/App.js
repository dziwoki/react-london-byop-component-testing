// @flow
import * as React from 'react';
import CurrencyInput1 from './CurrencyInput1';
import CurrencyInput2 from './CurrencyInput2';
import CurrencyInput3 from './CurrencyInput3';
import './App.css';

export function getRandomWith2DecimalPlaces(min: number, max: number) {
  const precision = 100;
  return Math.floor((Math.random() * (max - min + 1) + min) * precision) / precision;
}

type AppProps = {};
type AppState = {
  input2Value: number,
  input3Value: number,
};

class App extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      input2Value: 0,
      input3Value: 0,
    };
    // $FlowFixMe
    this.handleInput2Change = this.handleInput2Change.bind(this);
    // $FlowFixMe
    this.handleInput3Change = this.handleInput3Change.bind(this);
    // $FlowFixMe
    this.updateInput3Value = this.updateInput3Value.bind(this);
  }

  handleInput2Change(value: number) {
    this.setState({
      input2Value: value,
    });
  }

  handleInput3Change(value: number) {
    this.setState({
      input3Value: value,
    });
  }

  updateInput3Value() {
    this.setState({
      input3Value: getRandomWith2DecimalPlaces(0, 10000),
    });
  }

  render() {
    return (
      <div className="App">
        <CurrencyInput1 />
        <CurrencyInput2
          onChange={this.handleInput2Change}
          value={this.state.input2Value}
        />
        <CurrencyInput3
          onChange={this.handleInput3Change}
          value={this.state.input3Value}
        />
        <button onClick={this.updateInput3Value}>Randomise</button>
      </div>
    );
  }
}

export default App;

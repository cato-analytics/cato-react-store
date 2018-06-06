# Cato React Store

A simple and easy to use Flux like state manager for react and react-native apps.


## Getting Started

You can either install the package via `npm` or `yarn` package managers, 
or you can download and add [src/index.js](src/index.js) directly to your project.

### Installing

```
npm install cato-react-store --save
```
or
```
yarn add cato-react-store
```

## Usage

### src/index.js

First import the `StoreProvider'

```
import { StoreProvider } from 'cato-react-store';
```

Then wrap the `App` component in it

```
ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>
  , document.getElementById('root'));
```

### components
1. Stateful Components (Also works with PureComponents)

```
import React, { Component } from 'react';
import { connect } from 'cato-react-store';

const mapping = (store, originalProps) => ({
  prop1: store.getState().value1,
  prop2: store.getState().value2,
  action: () => {
    store.setState({
      value1: 'New Value'
    })
  },
  asyncAction: async (input) => {
    let result = await someAsyncFunction(input);
    store.setState({
      value2: result
    })
  }
});

class StatefulComponent extends Component {
  render() {
    let { prop1, prop2, action, asyncAction } = this.props
    return (
      <div>
        <h1>{prop1}</h1>
        <h2>{prop2}</h2>
        <hr />
        <button onClick={e => action()}>Do Action</button>
        <button onClick={e => asyncAction()}>Do Async Action</button>
      </div>
    );
  }
}

export default connect(mapping)(StatefulComponent);
```

2. Stateless Components
```
import React from 'react';
import { connect } from 'cato-react-store';

const mapping = (store, originalProps) => ({
  prop1: store.getState().value1,
  prop2: store.getState().value2,
  action: () => {
    store.setState({
      value1: 'New Value'
    })
  },
  asyncAction: async (input) => {
    let result = await someAsyncFunction(input);
    store.setState({
      value2: result
    })
  }
});

const StatelessComponent = ({ prop1, prop2, action, asyncAction }) => {
  return (
    <div>
      <h1>{prop1}</h1>
      <h2>{prop2}</h2>
      <hr />
      <button onClick={e => action()}>Do Action</button>
      <button onClick={e => asyncAction()}>Do Async Action</button>
    </div>
  );
};

export default connect(mapping)(StatelessComponent);
```


## Authors

* **Amin Choroomi** - [Cato Analytics](https://catoanalytics.com)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


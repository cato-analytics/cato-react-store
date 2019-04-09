/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-multi-comp */
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export class StoreProvider extends React.Component {
  getChildContext() {
    return {
      store: {
        getState: () => _.merge({}, this.state),
        setState: this.setState.bind(this),
      },
    };
  }

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}

StoreProvider.childContextTypes = {
  store: PropTypes.shape,
};

export const connect = mapping => ((Component) => {
  const ComponentClass = class extends React.Component {
    render() {
      const { store } = this.context;
      const props = mapping ? mapping(store, this.props) : {};
      return (
        <Component
          {...this.props}
          {...props}
        />
      );
    }
  };

  ComponentClass.displayName = `${Component.name}Container`;
  ComponentClass.contextTypes = {
    store: PropTypes.shape,
  };

  return ComponentClass;
});

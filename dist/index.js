var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export class StoreProvider extends React.Component {
  getChildContext() {
    return {
      store: {
        getState: () => _.merge({}, this.state),
        setState: this.setState.bind(this)
      }
    };
  }
  render() {
    return Children.only(this.props.children);
  }
}

StoreProvider.childContextTypes = {
  store: PropTypes.object
};

export const connect = mapping => Component => {
  let ComponentClass = class extends React.Component {
    render() {
      let props = mapping ? mapping(this.context.store, this.props) : {};
      return React.createElement(Component, _extends({}, this.props, props));
    }
  };

  ComponentClass.displayName = `${Component.name}Container`;
  ComponentClass.contextTypes = {
    store: PropTypes.object
  };

  return ComponentClass;
};

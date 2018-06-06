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
    }
  }
  render() {
    return Children.only(this.props.children);
  }
}

StoreProvider.childContextTypes = {
  store: PropTypes.object
};

export const connect = (mapping) => ((Component) => {
  let ComponentClass = class extends React.Component {
    render() {
      let props = mapping ? mapping(this.context.store, this.props) : {};
      return (
        <Component
          {...this.props}
          {...props}
        />
      )
    }
  }

  ComponentClass.displayName = `${Component.name}Container`;
  ComponentClass.contextTypes = {
    store: PropTypes.object
  }

  return ComponentClass;
});
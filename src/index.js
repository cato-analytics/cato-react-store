import React, { Children } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export class StoreProvider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }
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

export const connect = (mapping) => ((Component) => {
  return class extends React.Component {
    static displayName = `${Component.name}Container`;
    static contextTypes = {
      store: PropTypes.object
    }
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
});
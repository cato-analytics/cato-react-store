"use strict";

exports.__esModule = true;
exports.connect = exports.StoreProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var StoreProvider =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(StoreProvider, _React$Component);

  function StoreProvider() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = StoreProvider.prototype;

  _proto.getChildContext = function getChildContext() {
    var _this = this;

    return {
      store: {
        getState: function getState() {
          return _lodash.default.merge({}, _this.state);
        },
        setState: this.setState.bind(this)
      }
    };
  };

  _proto.render = function render() {
    var children = this.props.children;
    return _react.Children.only(children);
  };

  return StoreProvider;
}(_react.default.Component);

exports.StoreProvider = StoreProvider;
StoreProvider.childContextTypes = {
  store: _propTypes.default.shape()
};

var connect = function connect(mapping) {
  return function (Component) {
    var ComponentClass =
    /*#__PURE__*/
    function (_React$Component2) {
      _inheritsLoose(ComponentClass, _React$Component2);

      function ComponentClass() {
        return _React$Component2.apply(this, arguments) || this;
      }

      var _proto2 = ComponentClass.prototype;

      _proto2.render = function render() {
        var store = this.context.store;
        var props = mapping ? mapping(store, this.props) : {};
        return _react.default.createElement(Component, _extends({}, this.props, props));
      };

      return ComponentClass;
    }(_react.default.Component);

    ComponentClass.displayName = Component.name + "Container";
    ComponentClass.contextTypes = {
      store: _propTypes.default.shape()
    };
    return ComponentClass;
  };
};

exports.connect = connect;

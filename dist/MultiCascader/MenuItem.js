"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _classnames = _interopRequireDefault(require("classnames"));

var _container = _interopRequireDefault(require("./container"));

var _constants = require("./constants");

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = /*#__PURE__*/_react.default.memo(props => {
  const {
    node,
    depth
  } = props;
  const {
    children,
    value,
    text,
    isLeaf
  } = node;

  const {
    handleCascaderChange,
    menuPath,
    selectLeafOnly
  } = _container.default.useContainer();

  const [loading, setLoading] = (0, _react.useState)(false);
  const hasChildren = children && children.length > 0 || isLeaf === false;
  const checkboxHidden = selectLeafOnly && hasChildren;
  const handleClick = (0, _react.useCallback)(() => {
    setLoading(true);
    handleCascaderChange(node, depth);
  }, [node, depth]);
  const active = (0, _react.useMemo)(() => !!menuPath.find(item => item.value === value), [menuPath, value]);
  const cls = (0, _classnames.default)("".concat(_constants.prefix, "-column-item"), {
    ["".concat(_constants.prefix, "-column-item-active")]: active
  });
  return /*#__PURE__*/_react.default.createElement("li", {
    onClick: handleClick,
    className: cls
  }, checkboxHidden ? null : /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
    node: node
  }), /*#__PURE__*/_react.default.createElement("p", {
    className: "".concat(_constants.prefix, "-column-item-label"),
    style: {
      paddingLeft: checkboxHidden ? "0px" : ""
    }
  }, /*#__PURE__*/_react.default.createElement("span", null, text)), !hasChildren ? null : loading && !(children !== null && children !== void 0 && children.length) ? /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "spinner",
    className: "".concat(_constants.prefix, "-column-item-icon")
  }) : /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "angle right",
    className: "".concat(_constants.prefix, "-column-item-icon")
  }));
});

exports.default = _default;
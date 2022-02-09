"use strict";

require("core-js/modules/es.object.assign.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _rcOverflow = _interopRequireDefault(require("rc-overflow"));

var _container = _interopRequireDefault(require("./container"));

var _constants = require("./constants");

const _excluded = ["onRemove", "placeholder", "allowClear", "onClear", "forwardRef", "className", "disabled", "options", "selectAll", "value", "onChange", "okText", "cancelText", "selectAllText", "renderTitle", "selectLeafOnly", "maxTagCount"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const Tag = props => {
  const {
    onRemove,
    item,
    renderTitle = () => undefined,
    closable = true
  } = props;

  const handleRemove = event => {
    event.stopPropagation();

    if (onRemove) {
      onRemove(item);
    }
  };

  const value = item.value || item;
  const text = renderTitle(value) || item.text || item;
  return /*#__PURE__*/_react.default.createElement("a", {
    className: "ui label",
    value: text
  }, text, closable && /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "delete",
    className: "semantic-select-selection-item-remove",
    onClick: handleRemove
  }));
};

const Selector = props => {
  const {
    onRemove,
    placeholder,
    allowClear,
    onClear,
    forwardRef,
    className,
    disabled,
    options,
    selectAll,
    value: valueProps,
    onChange,
    okText,
    cancelText,
    selectAllText,
    renderTitle,
    selectLeafOnly,
    maxTagCount
  } = props,
        rest = _objectWithoutProperties(props, _excluded);

  const {
    selectedItems,
    hackValue
  } = _container.default.useContainer();

  const selectedItemsMap = (0, _lodash.keyBy)(selectedItems, "value");
  const handleClear = (0, _react.useCallback)(event => {
    event.stopPropagation();

    if (onClear) {
      onClear();
    }
  }, [onClear]);
  const renderItem = (0, _react.useCallback)(item => {
    return /*#__PURE__*/_react.default.createElement(Tag, {
      key: item,
      onRemove: onRemove,
      item: selectedItemsMap[item] || item,
      renderTitle: renderTitle
    });
  }, [selectedItemsMap, renderTitle, onRemove]);
  const renderRest = (0, _react.useCallback)(omittedValues => /*#__PURE__*/_react.default.createElement(Tag, {
    closable: false,
    renderTitle: () => /*#__PURE__*/_react.default.createElement("span", null, "+", omittedValues.length, "..."),
    item: {
      text: "",
      value: ""
    }
  }), []);
  const values = valueProps || hackValue.current || [];
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)(_constants.prefix, "semantic-select semantic-tree-select semantic-select-multiple", className, {
      "semantic-select-disabled": disabled
    }),
    ref: forwardRef
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    role: "listbox",
    "aria-expanded": "false",
    "aria-multiselectable": "true",
    className: "ui search multiple selection dropdown semantic-select-selector",
    style: {
      paddingRight: !disabled && allowClear ? "24px" : undefined
    }
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "dropdown"
  }), values.length ? /*#__PURE__*/_react.default.createElement(_rcOverflow.default, {
    prefixCls: "".concat(_constants.prefix, "-overflow"),
    data: values,
    renderItem: renderItem,
    renderRest: renderRest,
    maxCount: maxTagCount
  }) : /*#__PURE__*/_react.default.createElement("span", {
    className: "".concat(_constants.prefix, "-placeholder semantic-select-selection-placeholder default text")
  }, placeholder)), !disabled && allowClear ? /*#__PURE__*/_react.default.createElement("span", {
    className: "semantic-select-clear",
    onClick: handleClear
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "x"
  })) : null);
};

var _default = Selector;
exports.default = _default;
"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MContext = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _Menu = _interopRequireDefault(require("./Menu"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _container = _interopRequireDefault(require("./container"));

var _Selector = _interopRequireDefault(require("./Selector"));

var _utils = require("./libs/utils");

var _constants = require("./constants");

require("./index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const MContext = /*#__PURE__*/_react.default.createContext("");

exports.MContext = MContext;

const Popup = props => {
  const ref = (0, _react.useRef)(null);
  const {
    options,
    selectAll,
    onCancel,
    onConfirm,
    okText = "Confirm",
    cancelText = "Cancel",
    selectAllText = "All"
  } = props;

  const {
    flattenData
  } = _container.default.useContainer();

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_constants.prefix, "-popup"),
    ref: ref
  }, options && options.length ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Menu.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_constants.prefix, "-popup-footer")
  }, selectAll ? /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_constants.prefix, "-popup-all")
  }, /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
    node: flattenData[0]
  }), "\xA0\xA0", selectAllText) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_constants.prefix, "-popup-buttons")
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    size: "small",
    onClick: onCancel
  }, cancelText), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    size: "small",
    primary: true,
    onClick: onConfirm
  }, okText)))) : null
  /* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */
  );
};

const Component = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const {
    getPopupContainer: getContextPopupContainer
  } = _react.default.useContext(MContext);

  const selectorRef = (0, _react.useRef)(null);
  const {
    disabled,
    popupTransitionName = "ant-slide-up",
    getPopupContainer
  } = props;

  const {
    popupVisible,
    setPopupVisible,
    flattenData,
    value,
    resetMenuState,
    triggerChange
  } = _container.default.useContainer();

  const handleCancel = (0, _react.useCallback)(() => {
    setPopupVisible(false);
  }, []);
  const handleItemRemove = (0, _react.useCallback)(item => {
    let nextValue;

    if (typeof item === "string") {
      nextValue = value.filter(v => v !== item);
    } else {
      nextValue = (0, _utils.reconcile)(item, false, value);
    }

    triggerChange(nextValue);
  }, [value, triggerChange]);
  const handleClear = (0, _react.useCallback)(() => {
    resetMenuState();
    triggerChange([]);
  }, [resetMenuState, triggerChange]);
  const handleConfirm = (0, _react.useCallback)(() => {
    triggerChange(value);
  }, [triggerChange, value]);
  (0, _react.useImperativeHandle)(ref, () => {
    return {
      // match the value of all leaf nodes
      matchAllLeafValue: v => (0, _utils.matchAllLeafValue)(v, flattenData)
    };
  }, [flattenData]);
  return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Popup, {
    position: "bottom left",
    trigger: /*#__PURE__*/_react.default.createElement(_Selector.default, _extends({
      forwardRef: selectorRef,
      onRemove: handleItemRemove,
      onClear: handleClear
    }, props)),
    content: /*#__PURE__*/_react.default.createElement(Popup, _extends({}, props, {
      onCancel: handleCancel,
      onConfirm: handleConfirm
    })),
    on: !disabled ? "click" : "",
    open: disabled ? false : popupVisible,
    onOpen: () => setPopupVisible(true)
  });
}));

const MultiCascader = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  return /*#__PURE__*/_react.default.createElement(_container.default.Provider, {
    initialState: props
  }, /*#__PURE__*/_react.default.createElement(Component, _extends({}, props, {
    ref: ref
  })));
});

MultiCascader.defaultProps = {
  options: [],
  value: undefined
};
var _default = MultiCascader;
exports.default = _default;
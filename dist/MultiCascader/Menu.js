"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.to-string.js");

var _react = _interopRequireWildcard(require("react"));

var _container = _interopRequireDefault(require("./container"));

var _constants = require("./constants");

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Column = props => {
  const {
    item,
    columnWidth,
    depth
  } = props;
  const ref = (0, _react.useRef)();
  const [width, setWidth] = (0, _react.useState)(columnWidth); // Fixed width to avoid the problem of menu jumping when switching

  (0, _react.useEffect)(() => {
    var _ref$current;

    const {
      width: refWidth
    } = (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.getBoundingClientRect();
    setWidth(refWidth);
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_constants.prefix, "-column"),
    style: {
      width: "".concat(columnWidth || width, "px")
    },
    ref: ref
  }, /*#__PURE__*/_react.default.createElement("ul", null, item.map(node => {
    return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
      key: node.value.toString(),
      depth: depth,
      node: node
    });
  })));
};

var _default = props => {
  const {
    columnWidth
  } = props;

  const {
    menuData
  } = _container.default.useContainer();

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_constants.prefix, "-menu")
  }, menuData.map((item, index) => {
    var _item$;

    return /*#__PURE__*/_react.default.createElement(Column, {
      item: item,
      columnWidth: columnWidth,
      depth: index,
      key: ((_item$ = item[0]) === null || _item$ === void 0 ? void 0 : _item$.value) || index
    });
  }));
};

exports.default = _default;
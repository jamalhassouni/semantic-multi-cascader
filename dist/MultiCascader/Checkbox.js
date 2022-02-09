"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _utils = require("./libs/utils");

var _container = _interopRequireDefault(require("./container"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = /*#__PURE__*/_react.default.memo(props => {
  const {
    node
  } = props;

  const {
    value: containerValue,
    handleSelectChange
  } = _container.default.useContainer();

  const handleClick = (0, _react.useCallback)(event => {
    event.stopPropagation();
  }, []);
  const handleChange = (0, _react.useCallback)((event, data) => {
    const {
      checked
    } = data;
    handleSelectChange(node, checked);
  }, [node]);
  const checked = (0, _utils.hasParentChecked)(node, containerValue);
  const indeterminate = !checked && (0, _utils.hasChildChecked)(node, containerValue);
  return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Checkbox, {
    onClick: handleClick,
    onChange: handleChange,
    checked: checked,
    indeterminate: indeterminate
  });
});

exports.default = _default;
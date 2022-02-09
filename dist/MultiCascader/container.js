"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.includes.js");

var _react = require("react");

var _unstatedNext = require("unstated-next");

var _utils = require("./libs/utils");

var _constants = require("./constants");

const useCascade = params => {
  const {
    options,
    value: valueProp,
    selectAll,
    onChange,
    onCascaderChange,
    selectLeafOnly
  } = params || {};
  const [popupVisible, setPopupVisible] = (0, _react.useState)(false);
  const dataRef = (0, _react.useRef)(options);
  (0, _react.useEffect)(() => {
    dataRef.current = options;
  }, [options]);
  const [flattenData, setFlattenData] = (0, _react.useState)(() => {
    if (selectAll) {
      return (0, _utils.flattenTree)([{
        text: "All",
        value: _constants.All,
        parent: null,
        children: options
      }]);
    }

    return (0, _utils.flattenTree)(options || []);
  });
  (0, _react.useEffect)(() => {
    setFlattenData(() => {
      if (selectAll) {
        return (0, _utils.flattenTree)([{
          text: "All",
          value: _constants.All,
          parent: null,
          children: options
        }]);
      }

      return (0, _utils.flattenTree)(options || []);
    });
  }, [options, selectAll]);
  const transformValue = (0, _react.useCallback)(value => {
    const nextValue = (0, _utils.transformValue)(value, flattenData);

    if (onChange && !(0, _utils.shallowEqualArray)(nextValue, value)) {
      requestAnimationFrame(() => triggerChange(nextValue));
    }

    return nextValue;
  }, [flattenData]);
  const [menuData, setMenuData] = (0, _react.useState)(() => {
    var _flattenData$;

    if (selectAll && flattenData.length === 1) {
      return [];
    }

    return [selectAll ? (_flattenData$ = flattenData[0]) === null || _flattenData$ === void 0 ? void 0 : _flattenData$.children : flattenData.filter(item => !item.parent)];
  });
  const [menuPath, setMenuPath] = (0, _react.useState)([]);
  const [value, setValue] = (0, _react.useState)(transformValue(valueProp || []));
  const hackValue = (0, _react.useRef)(value);
  const selectedItems = (0, _react.useMemo)(() => {
    return flattenData.filter(node => {
      return (valueProp || hackValue.current).includes(node.value);
    });
  }, [flattenData, valueProp, popupVisible, hackValue.current]);
  const triggerChange = (0, _react.useCallback)(nextValue => {
    if (onChange) {
      onChange(nextValue, selectedItems.slice(0));
    }

    hackValue.current = nextValue;
    setValue(nextValue);
    setPopupVisible(false);
  }, [selectedItems]);
  const addMenu = (0, _react.useCallback)((menu, index) => {
    if (menu && menu.length) {
      setMenuData(prevMenuData => [...prevMenuData.slice(0, index), menu]);
    } else {
      setMenuData(prevMenuData => [...prevMenuData.slice(0, index)]);
    }
  }, []);
  const addChildrenToNode = (0, _react.useCallback)((target, children) => {
    const found = (0, _utils.findNodeByValue)(target.value, dataRef === null || dataRef === void 0 ? void 0 : dataRef.current);

    if (found) {
      found.children = children;
    }

    return [...(dataRef === null || dataRef === void 0 ? void 0 : dataRef.current)];
  }, []);
  const lastItemRef = (0, _react.useRef)(null);
  const handleCascaderChange = (0, _react.useCallback)((item, depth) => {
    const {
      children
    } = item;
    lastItemRef.current = item;
    onCascaderChange === null || onCascaderChange === void 0 ? void 0 : onCascaderChange(item, {
      add: newChildren => {
        const newData = addChildrenToNode(item, newChildren);

        if (lastItemRef.current === item) {
          item.children = newChildren;
          newChildren.forEach(child => {
            child.parent = item;
          });
          setFlattenData(prev => [...prev, ...newChildren]);
          handleCascaderChange(item, depth);
        }

        return newData;
      }
    });
    addMenu(children, depth + 1);
    setMenuPath(prevMenuPath => prevMenuPath.slice(0, depth).concat(item));
  }, [menuPath, onCascaderChange]);
  const handleSelectChange = (0, _react.useCallback)((item, checked) => {
    setValue(prevValue => (0, _utils.sortByTree)((0, _utils.reconcile)(item, checked, prevValue), flattenData));
  }, [flattenData]);
  const resetMenuState = (0, _react.useCallback)(() => {
    if (selectAll && flattenData.length === 1) {
      return setMenuData([]);
    } else {
      var _flattenData$2;

      setMenuData([selectAll ? (_flattenData$2 = flattenData[0]) === null || _flattenData$2 === void 0 ? void 0 : _flattenData$2.children : flattenData.filter(item => !item.parent)]);
    }

    setMenuPath([]);
  }, [flattenData, selectAll]); // Recalculate when the passed in value changes

  (0, _react.useEffect)(() => {
    if (popupVisible) {
      setValue(transformValue(valueProp || hackValue.current));
      resetMenuState();
    }
  }, [popupVisible]);
  return {
    menuPath,
    popupVisible,
    setPopupVisible,
    menuData,
    addMenu,
    setMenuData,
    value,
    setValue,
    handleCascaderChange,
    handleSelectChange,
    flattenData,
    resetMenuState,
    selectedItems,
    triggerChange,
    selectLeafOnly,
    hackValue
  };
};

var _default = (0, _unstatedNext.createContainer)(useCascade);

exports.default = _default;
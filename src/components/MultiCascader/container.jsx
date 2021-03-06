import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { createContainer } from "unstated-next";
import {
  transformValue as originalTransformValue,
  flattenTree,
  reconcile,
  sortByTree,
  shallowEqualArray,
  findNodeByValue,
} from "./libs/utils";
import { All } from "./constants";

const useCascade = (params) => {
  const {
    options,
    value: valueProp,
    selectAll,
    onChange,
    onCascaderChange,
    selectLeafOnly,
  } = params || {};
  const [popupVisible, setPopupVisible] = useState(false);
  const dataRef = useRef(options);
  const [menuPath, setMenuPath] = useState([]);
  let triggerChange;

  useEffect(() => {
    dataRef.current = options;
  }, [options]);

  const [flattenData, setFlattenData] = useState(() => {
    if (selectAll) {
      return flattenTree([
        {
          text: "All",
          value: All,
          parent: null,
          children: options,
        },
      ]);
    }
    return flattenTree(options || []);
  });

  useEffect(() => {
    setFlattenData(() => {
      if (selectAll) {
        return flattenTree([
          {
            text: "All",
            value: All,
            parent: null,
            children: options,
          },
        ]);
      }
      return flattenTree(options || []);
    });
  }, [options, selectAll]);

  const transformValue = useCallback(
    (value) => {
      const nextValue = originalTransformValue(value, flattenData);

      if (onChange && !shallowEqualArray(nextValue, value)) {
        if (
          typeof triggerChange === "function" &&
          typeof triggerChange !== "undefined"
        ) {
          requestAnimationFrame(() => triggerChange(nextValue));
        }
      }

      return nextValue;
    },
    [flattenData, onChange, triggerChange]
  );

  const [value, setValue] = useState(transformValue(valueProp || []));
  const hackValue = useRef(value);
  const selectedItems = useMemo(() => {
    return flattenData.filter((node) => {
      return (valueProp || hackValue?.current).includes(node.value);
    });
  }, [flattenData, valueProp]);

  triggerChange = useCallback(
    (nextValue) => {
      if (onChange) {
        onChange(nextValue, selectedItems.slice(0));
      }
      hackValue.current = nextValue;
      setValue(nextValue);
      setPopupVisible(false);
    },
    [selectedItems, onChange]
  );

  const [menuData, setMenuData] = useState(() => {
    if (selectAll && flattenData.length === 1) {
      return [];
    }

    return [
      selectAll
        ? flattenData[0]?.children
        : flattenData.filter((item) => !item.parent),
    ];
  });

  const addMenu = useCallback((menu, index) => {
    if (menu && menu.length) {
      setMenuData((prevMenuData) => [...prevMenuData.slice(0, index), menu]);
    } else {
      setMenuData((prevMenuData) => [...prevMenuData.slice(0, index)]);
    }
  }, []);

  const addChildrenToNode = useCallback((target, children) => {
    const found = findNodeByValue(target.value, dataRef?.current);
    if (found) {
      found.children = children;
    }
    return [...dataRef?.current];
  }, []);

  const lastItemRef = useRef(null);

  const handleCascaderChange = useCallback(
    (item, depth) => {
      const { children } = item;
      lastItemRef.current = item;
      onCascaderChange?.(item, {
        add: (newChildren) => {
          const newData = addChildrenToNode(item, newChildren);
          if (lastItemRef.current === item) {
            item.children = newChildren;
            newChildren.forEach((child) => {
              child.parent = item;
            });
            setFlattenData((prev) => [...prev, ...newChildren]);
            handleCascaderChange(item, depth);
          }
          return newData;
        },
      });
      addMenu(children, depth + 1);
      setMenuPath((prevMenuPath) => prevMenuPath.slice(0, depth).concat(item));
    },
    [onCascaderChange, addChildrenToNode, addMenu]
  );

  const handleSelectChange = useCallback(
    (item, checked, isSingle) => {
      setValue((prevValue) => {
        if (isSingle) {
          return sortByTree(reconcile(item, checked, []), flattenData);
        } else {
          return sortByTree(reconcile(item, checked, prevValue), flattenData);
        }
      });
    },
    [flattenData]
  );

  const resetMenuState = useCallback(() => {
    if (selectAll && flattenData.length === 1) {
      return setMenuData([]);
    } else {
      setMenuData([
        selectAll
          ? flattenData[0]?.children
          : flattenData.filter((item) => !item.parent),
      ]);
    }
    setMenuPath([]);
  }, [flattenData, selectAll]);

  // Recalculate when the passed in value changes
  useEffect(() => {
    if (popupVisible) {
      setValue(transformValue(valueProp || hackValue?.current));
      resetMenuState();
    }
  }, [popupVisible, resetMenuState, transformValue, valueProp]);

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
    hackValue,
  };
};

export default createContainer(useCascade);

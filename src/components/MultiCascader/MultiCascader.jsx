import React, { useCallback, useImperativeHandle, useRef } from "react";
import { Button, Popup as SemanticPopup } from "semantic-ui-react";
import Menu from "./Menu";
import Checkbox from "./Checkbox";
import MultiCascaderContainer from "./container";
import Selector from "./Selector";
import { matchAllLeafValue, reconcile } from "./libs/utils";
import { prefix } from "./constants";
export const MContext = React.createContext("");

const Popup = (props) => {
  const ref = useRef(null);
  const {
    options,
    selectAll,
    onCancel,
    cancelbtnclass,
    confirmbtnclass,
    onConfirm,
    okText = "Confirm",
    cancelText = "Cancel",
    selectAllText = "All",
  } = props;
  const { flattenData } = MultiCascaderContainer.useContainer();

  return (
    <div className={`${prefix}-popup`} ref={ref}>
      {
        options && options.length ? (
          <>
            <Menu />
            <div className={`${prefix}-popup-footer`}>
              {selectAll ? (
                <div className={`${prefix}-popup-all`}>
                  <Checkbox node={flattenData[0]} label={selectAllText} />
                </div>
              ) : null}
              <div className={`${prefix}-popup-buttons`}>
                <Button
                  size="small"
                  className={cancelbtnclass ? cancelbtnclass : ""}
                  onClick={onCancel}
                >
                  {cancelText}
                </Button>
                <Button
                  size="small"
                  className={confirmbtnclass ? confirmbtnclass : ""}
                  primary
                  onClick={onConfirm}
                >
                  {okText}
                </Button>
              </div>
            </div>
          </>
        ) : null
        /* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */
      }
    </div>
  );
};

const Component = React.memo(
  React.forwardRef((props, ref) => {
    const selectorRef = useRef(null);
    const { disabled } = props;
    const {
      popupVisible,
      setPopupVisible,
      flattenData,
      value,
      resetMenuState,
      triggerChange,
    } = MultiCascaderContainer.useContainer();

    const handleCancel = useCallback(() => {
      setPopupVisible(false);
    }, [setPopupVisible]);

    const handleItemRemove = useCallback(
      (item) => {
        let nextValue;
        if (typeof item === "string") {
          nextValue = value.filter((v) => v !== item);
        } else {
          nextValue = reconcile(item, false, value);
        }

        triggerChange(nextValue);
      },
      [value, triggerChange]
    );

    const handleClear = useCallback(() => {
      resetMenuState();
      triggerChange([]);
    }, [resetMenuState, triggerChange]);

    const handleConfirm = useCallback(() => {
      triggerChange(value);
    }, [triggerChange, value]);

    useImperativeHandle(
      ref,
      () => {
        return {
          // match the value of all leaf nodes
          matchAllLeafValue: (v) => matchAllLeafValue(v, flattenData),
        };
      },
      [flattenData]
    );

    return (
      <SemanticPopup
        position="bottom left"
        trigger={
          <Selector
            forwardRef={selectorRef}
            onRemove={handleItemRemove}
            onClear={handleClear}
            {...props}
          />
        }
        content={
          <Popup {...props} onCancel={handleCancel} onConfirm={handleConfirm} />
        }
        on={!disabled ? "click" : ""}
        open={disabled ? false : popupVisible}
        onOpen={() => setPopupVisible(true)}
      />
    );
  })
);

const MultiCascader = React.forwardRef((props, ref) => {
  return (
    <MultiCascaderContainer.Provider initialState={props}>
      <Component {...props} ref={ref} />
    </MultiCascaderContainer.Provider>
  );
});

MultiCascader.defaultProps = {
  options: [],
  value: undefined,
};

export default MultiCascader;

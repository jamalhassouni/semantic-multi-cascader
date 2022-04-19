import React, { useCallback } from "react";
import { Icon } from "semantic-ui-react";
import classnames from "classnames";
import { keyBy } from "lodash";
import MultiCascaderContainer from "./container";
import { prefix } from "./constants";

const Tag = (props) => {
  const {
    onRemove,
    item,
    renderTitle = () => undefined,
    closable = true,
  } = props;
  const handleRemove = (event) => {
    event.stopPropagation();
    if (onRemove) {
      onRemove(item);
    }
  };

  const value = item.value || item;
  const text = renderTitle(value) || item.text || item;

  return (
    <span className="ui label" value={text}>
      {text}
      {closable && (
        <Icon
          name="delete"
          className="semantic-select-selection-item-remove"
          onClick={handleRemove}
        />
      )}
    </span>
  );
};

const Selector = (props) => {
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
    isSingle,
    value: valueProps,
    onChange,
    okText,
    label,
    cancelText,
    selectAllText,
    renderTitle,
    selectLeafOnly,
    maxTagCount,
    confirmBtnClass,
    cancelBtnClass,
    ...rest
  } = props;
  const { selectedItems, hackValue } = MultiCascaderContainer.useContainer();
  const selectedItemsMap = keyBy(selectedItems, "value");

  const handleClear = useCallback(
    (event) => {
      event.stopPropagation();
      if (onClear) {
        onClear();
      }
    },
    [onClear]
  );

  const renderItem = useCallback(
    (item) => {
      return (
        <Tag
          key={item}
          isSingle
          onRemove={onRemove}
          item={selectedItemsMap[item] || item}
          renderTitle={renderTitle}
        />
      );
    },
    [selectedItemsMap, renderTitle, onRemove]
  );

  // const renderRest = useCallback(
  //   (omittedValues) => (
  //     <Tag
  //       closable={false}
  //       renderTitle={() => <span>+{omittedValues.length}...</span>}
  //       item={{
  //         text: "",
  //         value: "",
  //       }}
  //     />
  //   ),
  //   []
  // );

  const values = valueProps || hackValue.current || [];

  return (
    <div
      className={classnames(
        prefix,
        "semantic-select semantic-tree-select semantic-select-multiple",
        className,
        {
          "semantic-select-disabled": disabled,
        }
      )}
      ref={forwardRef}
      {...rest}
    >
      {label && <label className="semantic-select-label">{label}</label>}

      <div
        role="listbox"
        aria-expanded="false"
        aria-multiselectable="true"
        className="ui search multiple selection dropdown semantic-select-selector"
        style={{ paddingRight: !disabled && allowClear ? "24px" : undefined }}
      >
        <Icon name="dropdown" />

        {values.length ? (
          values.map((item) => {
            return renderItem(item);
          })
        ) : (
          <span
            className={`${prefix}-placeholder semantic-select-selection-placeholder default text`}
          >
            {placeholder}
          </span>
        )}
      </div>
      {!disabled && allowClear ? (
        <span className="semantic-select-clear" onClick={handleClear}>
          <Icon name="x" />
        </span>
      ) : null}
    </div>
  );
};

export default Selector;

import React, { useEffect, useRef, useState } from "react";
import MultiCascader from "./container";
import { prefix } from "./constants";
import MenuItem from "./MenuItem";

const Column = (props) => {
  const { item, columnWidth, depth } = props;
  const ref = useRef();
  const [width, setWidth] = useState(columnWidth);

  // Fixed width to avoid the problem of menu jumping when switching
  useEffect(() => {
    const { width: refWidth } = ref.current?.getBoundingClientRect();
    setWidth(refWidth);
  }, []);

  return (
    <div
      className={`${prefix}-column`}
      style={{ width: `${columnWidth || width}px` }}
      ref={ref}
    >
      <ul>
        {item.map((node) => {
          return (
            <MenuItem key={node.value.toString()} depth={depth} node={node} />
          );
        })}
      </ul>
    </div>
  );
};

const Menu = (props) => {
  const { columnWidth } = props;
  const { menuData } = MultiCascader.useContainer();

  return (
    <div className={`${prefix}-menu`}>
      {menuData.map((item, index) => {
        return (
          <Column
            item={item}
            columnWidth={columnWidth}
            depth={index}
            key={item[0]?.value || index}
          />
        );
      })}
    </div>
  );
};

export default Menu;

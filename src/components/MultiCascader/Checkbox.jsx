import React, { useCallback } from "react";
import { Checkbox } from "semantic-ui-react";
import { hasChildChecked, hasParentChecked } from "./libs/utils";
import MultiCascader from "./container";

export default React.memo((props) => {
  const { node } = props;
  const { value: containerValue, handleSelectChange } =
    MultiCascader.useContainer();

  const handleClick = useCallback((event) => {
    event.stopPropagation();
  }, []);

  const handleChange = useCallback(
    (event, data) => {
      const { checked } = data;
      handleSelectChange(node, checked);
    },
    [node]
  );

  const checked = hasParentChecked(node, containerValue);
  const indeterminate = !checked && hasChildChecked(node, containerValue);

  return (
    <Checkbox
      onClick={handleClick}
      onChange={handleChange}
      checked={checked}
      indeterminate={indeterminate}
    />
  );
});

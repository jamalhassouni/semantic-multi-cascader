import { All } from "../constants";

// Tile the tree structure, which is convenient to get all NodeItem nodes according to value (string)
// add parent link to parent node
export function flattenTree(root) {
  const res = [];

  function dfs(nodes, parent = null) {
    if (!nodes) {
      return;
    }

    const newChildren = [];

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const { children } = node;

      const newNode = {
        ...node,
        parent,
      };

      res.push(newNode);
      newChildren.push(newNode);
      if (children) {
        dfs(children, newNode);
      }
    }

    if (parent) {
      // eslint-disable-next-line no-param-reassign
      parent.children = newChildren;
    }
  }
  dfs(root);

  return res;
}

// 是否有子节点（包括自己）被选中
export function hasChildChecked(item, curValue) {
  function dfs(node) {
    if (!node) {
      return false;
    }

    const { value, children } = node;

    if (curValue.includes(value)) {
      return true;
    }
    if (!children) {
      return false;
    }
    return children.some((child) => dfs(child));
  }

  return dfs(item);
}

// 是否有父节点（包括自己）被选中
export function hasParentChecked(item, value) {
  let tmp = item;

  while (tmp) {
    if (value.includes(tmp.value)) {
      return true;
    }

    tmp = tmp.parent;
  }

  return false;
}

export function matchAllLeafValue(value, roots) {
  const res = [];

  function dfs(nodes, needed) {
    if (!nodes) {
      return;
    }

    nodes.forEach((node) => {
      const { value: nodeValue, children } = node;

      if (needed || value.includes(nodeValue)) {
        if (!children) {
          // leaf node
          res.push(nodeValue);
        } else {
          dfs(children, true);
        }
      } else {
        dfs(children, needed);
      }
    });
  }
  dfs(roots, false);

  return Array.from(new Set(res));
}

// delete the value of all descendant nodes, excluding self
// input may be dirty
export function removeAllDescendanceValue(root, value) {
  const allChildrenValue = [];
  function dfs(node) {
    if (node.children) {
      node.children.forEach((item) => {
        allChildrenValue.push(item.value);
        dfs(item);
      });
    }
  }
  dfs(root);
  return value.filter((val) => !allChildrenValue.includes(val));
}

// state improvement
export function liftTreeState(item, curVal) {
  const { value } = item;

  // add the current node value
  const nextValue = curVal.concat(value);
  let last = item;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // If all child nodes of the parent node have been checked, add the node value and continue to try to improve
    if (
      last?.parent?.children.every((child) => nextValue.includes(child.value))
    ) {
      nextValue.push(last.parent.value);
      last = last.parent;
    } else {
      break;
    }
  }
  // Remove all children and descendants of the last checked parent node value
  return removeAllDescendanceValue(last, nextValue);
}

// 状态下沉
export function sinkTreeState(root, value) {
  const parentValues = [];
  const subTreeValues = [];

  function getCheckedParent(node) {
    if (!node) {
      return null;
    }
    parentValues.push(node.value);
    if (value.includes(node.value)) {
      return node;
    }

    return getCheckedParent(node.parent);
  }

  const checkedParent = getCheckedParent(root);
  if (!checkedParent) {
    return value;
  }

  function dfs(node) {
    if (!node.children || node.value === root.value) {
      return;
    }
    node.children.forEach((item) => {
      if (item.value !== root.value) {
        if (parentValues.includes(item.value)) {
          dfs(item);
        } else {
          subTreeValues.push(item.value);
        }
      }
    });
  }
  dfs(checkedParent);
  // replace the value of the subtree under checkedParent
  const nextValue = removeAllDescendanceValue(checkedParent, value).filter(
    (item) => item !== checkedParent.value
  );
  return Array.from(new Set(nextValue.concat(subTreeValues)));
}

// checked, unchecked 时重新计算
export function reconcile(item, checked, value) {
  if (checked) {
    // If there is already a parent node checked, it is meaningless to check again, just ignore it
    // Mainly used to avoid the unreasonable value structure passed in during initialization
    if (hasParentChecked(item, value)) {
      return value;
    }
    return liftTreeState(item, value);
  }
  return sinkTreeState(item, value);
}

// Sort by dfs preorder of the tree
export function sortByTree(value, flattenData) {
  // sort by tree structure
  const map = flattenData.reduce((cur, node, index) => {
    cur[node.value] = index;
    return cur;
  }, {});
  return value.sort((a, b) => map[a] - map[b] || 0);
}

// filter illegal data, sort
export function transformValue(value, flattenData) {
  let nextValue = [];
  if (value.some((v) => v === All)) {
    return [All];
  }
  for (let i = 0; i < value.length; i++) {
    const node = flattenData.find((item) => item.value === value[i]);
    if (node) {
      nextValue = reconcile(node, true, nextValue);
    } else {
      nextValue.push(value[i]);
    }
  }
  return sortByTree(nextValue, flattenData);
}

export function shallowEqualArray(arrA, arrB) {
  if (arrA === arrB) {
    return true;
  }

  if (!arrA || !arrB) {
    return false;
  }

  var len = arrA.length;

  if (arrB.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }

  return true;
}

// find tree node by value
export function findNodeByValue(value, tree) {
  function findParent(nodes) {
    if (!nodes) {
      return undefined;
    }
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (value === node.value) {
        return node;
      }
      if (node.children) {
        const foundInChildren = findParent(node.children);
        if (foundInChildren) {
          return foundInChildren;
        }
      }
    }
  }

  return findParent(tree);
}

import React, { useState } from "react";

interface TreeOption {
  id?: number;
  value?: string;
  childrenList?: TreeOption[];
  checked?: boolean;
}

interface NestedCheckboxHelperProps {
  nodes: TreeOption[];
  ancestors: Array<any>;
  onBoxChecked: (
    e: React.ChangeEvent<HTMLInputElement>,
    ancestors: Array<any>
  ) => void;
}

const LIST: TreeOption[] = [
  {
    id: 1,
    value: "Nhà máy",
    childrenList: [
      {
        id: 5,
        value: "Sản xuất đồ gia dụng",
        childrenList: [
          {
            id: 6,
            value: "Đồ trẻ em",
            childrenList: [
              {
                id: 7,
                value: "Trẻ em sơ sinh",
                checked: false,
              },
            ],
            checked: false,
          },
        ],
        checked: false,
      },
    ],
    checked: false,
  },
  {
    id: 2,
    value: "Máy bay",
    checked: false,
  },
  {
    id: 3,
    value: "Ô tô",
    childrenList: [
      {
        id: 8,
        value: "Labo",
        checked: false,
      },
      {
        id: 9,
        value: "Mec",
        checked: false,
      },
      {
        id: 10,
        value: "Kia",
        checked: false,
      },
    ],
    checked: false,
  },
  {
    id: 4,
    value: "Xe máy",
    checked: false,
  },
];

const NestedCheckboxHelper = ({
  nodes,
  ancestors,
  onBoxChecked,
}: NestedCheckboxHelperProps) => {
  return (
    <ul>
      {nodes.map((node) => {
        return (
          <li key={node.id}>
            <input
              type="checkbox"
              name={node.value}
              checked={node.checked}
              onChange={(e) => onBoxChecked(e, ancestors)}
            />
            <label htmlFor={node.value}>{node.value}</label>
            {node && node.childrenList?.length && (
              <NestedCheckboxHelper
                nodes={node.childrenList}
                ancestors={[]}
                onBoxChecked={onBoxChecked}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

const SelectTree = () => {
  const [nodes, setNodes] = useState(LIST);

  const toggleDescendants = (node: TreeOption) => {
    if (!node) return;

    const checked = node.checked;

    node.childrenList?.forEach((child) => {
      child.checked = checked;
      toggleDescendants(child);
    });
  };

  const updateAncestors = (node: TreeOption) => {
    return;
  };

  const findNode = (
    nodes: TreeOption[],
    label: string,
    ancestors: Array<any>
  ) => {
    console.log(nodes, label);
    let node: TreeOption | undefined = {};

    if (ancestors.length === 0) {
      return nodes.filter((node) => node.value === label)[0];
    }

    for (let ancestor of ancestors) {
      const candidates: TreeOption[] | undefined = node
        ? node.childrenList
        : nodes;
      node = candidates?.filter((node) => node.value === ancestor)[0];
    }

    return node?.childrenList?.filter((node) => node.value === label)[0];
  };

  const handleBoxChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    ancestors: Array<any>
  ) => {
    // console.log(e);
    const checked = e.target.checked;
    // console.log(checked);
    const node: TreeOption | undefined = findNode(
      nodes,
      e.target.value,
      ancestors
    );
    console.log(node);
    if (node) {
      node.checked = checked;
      toggleDescendants(node);
      updateAncestors(node);
      if (node.checked && node.childrenList && node.id && node.value) {
        setNodes([...nodes]);
      }
    }
  };

  return (
    <NestedCheckboxHelper
      nodes={nodes}
      ancestors={[]}
      onBoxChecked={handleBoxChecked}
    />
  );
};

export default SelectTree;

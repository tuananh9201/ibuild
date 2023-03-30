import { useState, ChangeEvent } from "react";
import { cloneDeep } from "lodash";

interface TreeOption {
  id?: string;
  label?: string;
  checked?: boolean;
  childrenNodes?: TreeOption[];
}

interface NestedCheckboxHelperProps {
  nodes: TreeOption[];
  ancestors: string[];
  onBoxChecked: (e: ChangeEvent<HTMLInputElement>, ancestors: string[]) => void;
}

const LIST: TreeOption[] = [
  {
    id: "1",
    label: "An ninh & an toàn",
    checked: false,
    childrenNodes: [
      {
        id: "6",
        label: "Hệ thống phòng cháy chữa cháy",
        checked: false,
        childrenNodes: [
          {
            id: "7",
            label: "Cảnh báo",
            checked: false,
          },
          {
            id: "8",
            label: "Thiết bị chống cháy",
            checked: false,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    label: "Đồ nội & ngoại thất",
    checked: false,
  },
  {
    id: "3",
    label: "Xây dựng",
    checked: false,
    childrenNodes: [
      {
        id: "9",
        label: "Xi măng",
        checked: false,
      },
    ],
  },
  {
    id: "4",
    label: "Trông trọt",
    checked: false,
  },
  {
    id: "5",
    label: "Giáo dục",
    checked: false,
    childrenNodes: [
      {
        id: "10",
        label: "Cấp 1",
        checked: false,
      },
    ],
  },
];

const updateAncestors = (node: TreeOption, nodes: TreeOption[]) => {
  const idNode = node.id
  nodes.forEach((item) => {
    
  })
};

const toggleDescendants = (node: TreeOption) => {
  const checked = node.checked;

  if (node) {
    node?.childrenNodes?.forEach((node) => {
      node.checked = checked;
      toggleDescendants(node);
    });
  }
};

const findNode = (options: TreeOption[], id: string, ancestors: string[]) => {
  let node: TreeOption = {};

  if (ancestors.length === 0) {
    return options.filter((option) => option.id === id)[0];
  }

  for (let ancestor of ancestors) {
    const candidates =
      Object.keys(node).length > 0 ? node.childrenNodes : options;
    if (candidates) {
      node = candidates.filter((item) => item.id === ancestor)[0];
    }
  }

  return node.childrenNodes?.filter((child) => child.id === id)[0];
};

const SelectTree = () => {
  const [nodes, setNodes] = useState(LIST);

  const handleBoxChecked = (
    e: ChangeEvent<HTMLInputElement>,
    ancestors: string[]
  ) => {
    const checked = e.currentTarget.checked;
    const node = findNode(nodes, e.currentTarget.value, ancestors);
    if (node) {
      node.checked = checked;
      toggleDescendants(node);
      updateAncestors(node, nodes);
      setNodes(cloneDeep(nodes));
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

const NestedCheckboxHelper = ({
  nodes,
  ancestors,
  onBoxChecked,
}: NestedCheckboxHelperProps) => {
  const prefix = ancestors.join(".");

  return (
    <ul>
      {nodes.map((node) => {
        const key = `${prefix}.${node.id}`;

        return (
          <li key={key}>
            <input
              type="checkbox"
              name={key}
              value={node.id}
              checked={node.checked}
              onChange={(e) => onBoxChecked(e, ancestors)}
            />
            <label htmlFor={key}>{node.label}</label>
            {node.childrenNodes?.length && (
              <NestedCheckboxHelper
                nodes={node.childrenNodes}
                ancestors={[...ancestors, node.id || ""]}
                onBoxChecked={onBoxChecked}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SelectTree;

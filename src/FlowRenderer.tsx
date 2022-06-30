import React, { useState } from "react";
import * as R from "ramda";
import ReactFlow, {
  removeElements,
  addEdge,
  isEdge,
  Background,
  Controls,
  MiniMap
} from "react-flow-renderer";

import SourceNode from "./CustomFlowNodes/SourceNode";
import DataNode from "./CustomFlowNodes/DataNode";
import FunctionNode from "./CustomFlowNodes/FunctionNode";
import ValueNode from "./CustomFlowNodes/ValueNode";

const nodeTypes = {
  sourceNode: SourceNode,
  dataNode: DataNode,
  functionNode: FunctionNode,
  valueNode: ValueNode
};

const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();
const onNodeContextMenu = (event, node) => {
  event.preventDefault();
  console.log("context menu:", node);
};

const newElements = [
  {
    id: "0",
    type: "functionNode",
    data: {
      name: "df 0",
      inputs: [
        { label: "col1", type: "data" },
        { label: "col2", type: "data" },
        { label: "col3", type: "data" },
        { label: "col4", type: "value" }
      ]
    },
    position: { x: 200, y: 400 }
  },
  {
    id: "1",
    type: "functionNode",
    data: {
      name: "df 1",
      inputs: [
        { label: "col1", type: "data" },
        { label: "col2", type: "data" }
      ]
    },
    position: { x: 100, y: 200 }
  },
  {
    id: "2",
    type: "functionNode",
    data: {
      name: "df 2",
      inputs: [
        { label: "col1", type: "data" },
        { label: "col2", type: "data" }
      ]
    },
    position: { x: 10, y: 10 }
  },
  {
    id: "3",
    type: "functionNode",
    data: {
      name: "df 3",
      inputs: [
        { label: "col1", type: "data" },
        { label: "col2", type: "data" }
      ]
    },
    position: { x: 600, y: 300 }
  },
  {
    id: "4",
    type: "functionNode",
    data: {
      name: "df 4",
      inputs: [
        { label: "col1", type: "data" },
        { label: "col2", type: "data" }
      ]
    },
    position: { x: 500, y: 80 }
  }
];

const HorizontalFlow = () => {
  console.log("elements =", newElements);
  const [elements, setElements] = useState(newElements);

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => {
    const allEdges = R.filter(isEdge, elements);
    const matchingEdges = R.filter(
      (edge) => edge.target === params.target,
      allEdges
    );
    setElements((els) => removeElements(matchingEdges, els));
    setElements((els) => addEdge(params, els));
  };

  return (
    <ReactFlow
      elements={elements}
      elementsSelectable={true}
      selectNodesOnDrag={false}
      nodeTypes={nodeTypes}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onLoad={onLoad}
      onNodeContextMenu={onNodeContextMenu}
    >
      <Background variant="lines" gap={24} size={1} />
      <Controls />
    </ReactFlow>
  );
};

export default HorizontalFlow;

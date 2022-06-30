import React, { memo } from "react";
import * as R from "ramda";
import { Handle } from "react-flow-renderer";
import Node, { contentStyle as style } from "./Node";

const isValidInput = (connection, type) => {
  return R.last(R.split("__", connection.source)) === type;
};
const isValidOutput = (connection, type) => {
  return R.last(R.split("__", connection.target)) === type;
};

const FunctionNode = ({ data, selected }) => {
  return (
    <Node
      label={data.name}
      selected={selected}
      color={"Lavender"}
      content={
        <>
          <div style={style.contentHeader}>{"Column Name"}</div>
          {data.inputs.map((input) => (
            <div
              key={"i-" + input.label}
              style={{ ...style.io, ...style.textLeft }}
            >
              {input.label}
              <Handle
                type="target"
                position="left"
                id={"i-" + input.label + "__" + input.type}
                style={{ ...style.handle, ...style.left }}
                isValidConnection={(connection) =>
                  isValidInput(connection, input.type)
                }
              />
            </div>
          ))}
        </>
      }
    />
  );
};

export default memo(FunctionNode);

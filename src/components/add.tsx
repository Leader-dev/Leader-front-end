/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { CSSProperties } from "react";
import { Square } from "./square";

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const withBorder = (
  sides: Array<"top" | "bottom" | "left" | "right">
): CSSProperties => {
  const r: CSSProperties = {
    boxSizing: "border-box",
  };
  sides.forEach((side) => {
    r[
      ("border" + toTitleCase(side)) as
        | "borderTop"
        | "borderBottom"
        | "borderLeft"
        | "borderRight"
    ] = "1px solid #ccc";
  });
  return r;
};

export const Add = (props: { style: object; onClick?: () => void }) => {
  return (
    <div style={{ padding: "4px" }}>
      <Square onClick={props.onClick}>
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            "--aspect-ratio": "1/1",
            padding: "14px",
          }}
        >
          <div style={{ ...withBorder(["bottom", "right"]) }} />
          <div style={{ ...withBorder(["bottom", "left"]) }} />
          <div style={{ ...withBorder(["top", "right"]) }} />
          <div style={{ ...withBorder(["top", "left"]) }} />
        </div>
      </Square>
    </div>
  );
};

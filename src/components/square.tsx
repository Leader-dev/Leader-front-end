/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const Square = (props: any) => {
  return (
    <div
      css={css`
        box-sizing: border-box;
        --aspect-ratio: 1/1;
        & > :first-of-type {
          width: 100%;
        }
        & > img {
          height: auto;
        }
        @supports (--custom: property) {
          & {
            position: relative;
          }
          &::before {
            content: "";
            display: block;
            padding-bottom: calc(100% / (var(--aspect-ratio)));
          }
          & > :first-of-type {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
          }
        }
        ${props.style}
      `}
      {...props}
    />
  );
};

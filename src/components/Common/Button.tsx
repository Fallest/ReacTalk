import * as React from "react";

export default function Button(props: {
  action: any;
  text: string;
  cssClass: string;
}) {
  return (
    <button
      type="button"
      onClick={(e: any) => props.action(e)}
      className={props.cssClass}
    >
      {props.text}
    </button>
  );
}

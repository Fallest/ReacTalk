import * as React from "react";

export default function TextInput(props: {
  label: string;
  type: string;
  actionOnChange: any;
  actionOnSubmit: any;
  useValue: any;
  cssClass: string;
}) {
  return (
    <div>
      <label htmlFor={props.label.toLowerCase()}>{props.label}</label>
      <input
        className={props.cssClass}
        id={props.label.toLowerCase()}
        type={props.type}
        onChange={props.actionOnChange}
        onKeyDown={(e) =>
          e.key === "Enter" ? props.actionOnSubmit(e) : undefined
        }
        value={props.useValue}
      ></input>
    </div>
  );
}

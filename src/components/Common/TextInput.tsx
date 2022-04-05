import * as React from "react";

export default function TextInput(props: {
  label: string;
  type: string;
  actionOnChange: any;
  useValue: any;
}) {
  return (
    <div>
      <label htmlFor={props.label.toLowerCase()}>{props.label}</label>
      <input
        id={props.label.toLowerCase()}
        type={props.type}
        onChange={props.actionOnChange}
        value={props.useValue}
      ></input>
    </div>
  );
}

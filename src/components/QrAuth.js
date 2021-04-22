import React from "react";
import { Input, Label } from "./Input";
import { FormCard } from "./FormCard";
import AuthCode from "react-auth-code-input";
export const QrAuth = (props) => {
  console.log(props);
  return (
    <>
      <Label>Codigo Autenticador</Label>
      {props.qrCode ? <img src={props.qrCode} /> : null}

      <AuthCode
        onChange={(newTerm) => props.onChange(newTerm)}
        characters={6}
        containerStyle={{
          padding: "16px",
        }}
        inputStyle={{
          width: "2ch",
          padding: "8px",
          borderRadius: "8px",
          fontSize: "40px",
          textAlign: "center",
          marginRight: "12px",
          border: "1px solid black",
          textTransform: "uppercase",
        }}
      />
    </>
  );
};

import { InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";
import { FormikContext } from "formik";
import React from "react";

export const SelectInput = (props) => {
  let arr = [...props.arr];

  return (
    <div>
      <InputGroup mt={"5px"}>
        <InputLeftAddon children={props.keys} bg={"none"} />
        <Select
          width={props.widthL}
          placeholder={props.placeholder}
          borderTopLeftRadius={"0px"}
          textAlign={"center"}
          name={props.name}
          value={props.value}
          onBlur={props.formik.handleBlur}
          onChange={props.formik.handleChange}
          borderBottomLeftRadius={"0px"}>
          {arr.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </Select>
      </InputGroup>
    </div>
  );
};
// {arr.length > 0 ? arr.map((e) => <option value={e}>{e}</option>) : ""}

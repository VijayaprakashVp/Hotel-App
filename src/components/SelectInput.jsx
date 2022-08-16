import { InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";
import React from "react";

export const SelectInput = (props) => {
  let optionsValue = [...props.arr];

  return (
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
        {optionsValue.map((eachOption) => (
          <option key={eachOption} value={eachOption}>
            {eachOption}
          </option>
        ))}
      </Select>
    </InputGroup>
  );
};

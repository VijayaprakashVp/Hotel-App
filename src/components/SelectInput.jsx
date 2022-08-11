import { InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";
import React from "react";

export const SelectInput = (props) => {
  return (
    <div>
      <InputGroup mt={"10px"}>
        <InputLeftAddon children={props.keys} bg={"none"} />
        <Select
          width={props.widthL}
          placeholder={props.values}
          borderTopLeftRadius={"0px"}
          borderBottomLeftRadius={"0px"}
        />
      </InputGroup>
    </div>
  );
};
// {arr.length > 0 ? arr.map((e) => <option value={e}>{e}</option>) : ""}

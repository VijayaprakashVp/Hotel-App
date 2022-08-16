import { Input, InputGroup, InputLeftAddon, Stack } from "@chakra-ui/react";
import React from "react";

export const InputComp = (props) => {
  return (
    <Stack spacing={3}>
      <InputGroup mt={props.mt}>
        <InputLeftAddon children={props.children} bg={"none"} />
        <Input
          type='text'
          name={props.name}
          backgroundColor={"none"}
          placeholder={props.placeholder}
          textAlign={"center"}
          disabled={props.disabled}
          value={props.value}
          onBlur={props.formik.handleBlur}
          onChange={props.formik.handleChange}
        />
      </InputGroup>
    </Stack>
  );
};

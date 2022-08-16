import { Input, InputGroup, InputLeftAddon, Stack } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";

export const InputComp = (props) => {
  console.log("props:", props);
  const formik = useFormik({});
  return (
    <div>
      <Stack spacing={3}>
        {/* <InputGroup width={props.widthL}>
          <InputLeftAddon children={props.keys} bg={"none"} />
          <Input type='text' placeholder={props.values} />
        </InputGroup> */}
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
    </div>
  );
};

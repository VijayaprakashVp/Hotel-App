import { Input, InputGroup, InputLeftAddon, Stack } from "@chakra-ui/react";
import React from "react";

export const InputComp = (props) => {
  return (
    <div>
      <Stack spacing={3}>
        <InputGroup width={props.widthL}>
          <InputLeftAddon children={props.keys} bg={"none"} />
          <Input type='text' placeholder={props.values} />
        </InputGroup>
      </Stack>
    </div>
  );
};

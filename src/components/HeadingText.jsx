import { Heading } from "@chakra-ui/react";
import React from "react";

export const HeadingText = (props) => {
  return (
    <Heading
      fontFamily={"DM Sans"}
      fontWeight={props.weight}
      mt={"10px"}
      mb={"10px"}
      fontSize={props.size}>
      {props.title}
    </Heading>
  );
};

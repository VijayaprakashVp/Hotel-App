import { Heading } from "@chakra-ui/react";
import React from "react";

export const HeadingText = (props) => {
  return (
    <div>
      <Heading
        fontFamily={"DM Sans"}
        fontWeight={"400"}
        mt={"10px"}
        mb={"10px"}
        fontSize={props.size}>
        {props.title}
      </Heading>
    </div>
  );
};

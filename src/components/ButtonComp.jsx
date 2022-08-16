import { Button } from "@chakra-ui/react";

export const ButtonComp = (props) => {
  return (
    <Button
      w={props.widthL}
      height={"48px"}
      borderRadius={"8px"}
      bgColor={props.color}
      fontSize={"16px"}
      border={"none"}
      fontWeight={700}
      lineHeight={"24px"}
      color={"white"}>
      {props.Children}
    </Button>
  );
};

import { Button } from "@chakra-ui/react";

export const ButtonComp = ({ Children, color, widthL }) => {
  return (
    <Button
      w={widthL}
      height={"48px"}
      borderRadius={"8px"}
      bgColor={color}
      fontSize={"16px"}
      border={"none"}
      fontWeight={700}
      lineHeight={"24px"}
      color={"white"}>
      {Children}
    </Button>
  );
};

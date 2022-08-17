import React from "react";
import { Box, InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";
import { InputComp } from "./InputComp";

export const Variant = (props) => {
  var formik = props.formik;
  return (
    <Box display={"grid"} gridTemplateColumns={"49% 49%"} gap={"1%"}>
      <Box>
        <InputGroup mt={"15px"}>
          <InputLeftAddon children='Variant' bg={"none"} />
          <Select
            textAlign={"center"}
            placeholder='--'
            borderTopLeftRadius={"0px"}
            borderBottomLeftRadius={"0px"}></Select>
        </InputGroup>
      </Box>
      <Box display={"grid"} gridTemplateColumns={"49% 49%"} gap={"2%"}>
        <Box>
          <InputComp
            mt={"15px"}
            formik={formik}
            name={"basePrice"}
            placeholder={"0000"}
            disabled={formik.values.taxType === "Inclusive"}
            value={formik.values.basePrice}
            children='Base Price'></InputComp>
        </Box>
        <Box>
          <InputComp
            mt={"15px"}
            formik={formik}
            name={"finalPrice"}
            placeholder={"0000"}
            disabled={formik.values.taxType === "Exclusive"}
            value={formik.values.finalPrice}
            children='Final Price'></InputComp>
        </Box>
      </Box>
    </Box>
  );
};

import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useEffect } from "react";
import { HeadingText } from "./HeadingText";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputComp } from "./InputComp";
import * as reducer from "../Redux/Actions/index";
import { useDispatch } from "react-redux";
import { SelectInput } from "./SelectInput";
import { Variant } from "./Variant";
import { CloseIcon } from "@chakra-ui/icons";

export const FormikForm = () => {
  const { postFetch } = reducer;
  const dispatch = useDispatch();
  const [variant, setVariant] = useState([{ basePrice: 0, finalPrice: 0 }]);
  var GSTPercentageArray = ["0", "5", "8", " 18", "28"];

  const formik = useFormik({
    initialValues: {
      itemName: "",
      cgst: "0",
      sgst: "0",
      category: "",
      quantity: "",
      subCategory: "",
      taxType: "",
      allVariants: [{ basePrice: 0, finalPrice: 0 }],
    },
    validationSchema: Yup.object({
      itemName: Yup.string()
        .max(15, "Item name should be 15 or less characters")
        .required("Item Name is required"),
      quantity: Yup.number()
        .moreThan(0, "Please Enter 1 or More Quantity")
        .required("Quantity is required"),
      taxType: Yup.string().required("Place Select the Tax Type"),
      basePrice: Yup.number().moreThan(0, "Please Enter the Base Price"),
    }),
  });

  function Calculate() {
    console.log("Function start");
    let gst = +formik.values.cgst + +formik.values.sgst;
    let allFinalPrice = [];
    let allBasePrice = [];
    let wholeValueStoredArray = formik.values.allVariants;
    wholeValueStoredArray.forEach((element) => {
      allFinalPrice.push(element.finalPrice);
      allBasePrice.push(element.basePrice);
    });

    if (formik.values.taxType == "Inclusive") {
      console.log("Inclusive");
      for (let i = 0; i < allFinalPrice.length; i++) {
        let gstCalculation =
          +allFinalPrice[i] - +allFinalPrice[i] * (100 / (100 + gst));
        let final = +allFinalPrice[i] - gstCalculation;
        formik.values.allVariants[i].basePrice = final.toFixed(2);
      }
    } else if (formik.values.taxType == "Exclusive") {
      console.log("exclusive");
      for (let i = 0; i < allBasePrice.length; i++) {
        let gstCalculation = (+allBasePrice[i] * gst) / 100;
        let final = +allBasePrice[i] + gstCalculation;
        formik.values.allVariants[i].finalPrice = final.toFixed(2);
      }
    } else {
      console.log("exempted");
      // wholeValueStoredArray.forEach((element) => {
      //   console.log(element);
      //   element.basePrice = element.finalPrice;
      // });
    }
  }

  let flag = 0;
  if (
    formik.values.itemName !== "" &&
    formik.values.quantity !== "" &&
    formik.values.sgst !== "" &&
    formik.values.cgst !== "" &&
    (formik.values.taxType === "Exclusive" ||
      formik.values.taxType === "Inclusive")
  )
    flag = 1;

  const handleAddVariant = () => {
    let BaseObject = { basePrice: 0, finalPrice: 0 };
    let addVariant = [...variant, BaseObject];
    setVariant(addVariant);

    let allVariants = formik.values.allVariants;
    allVariants.push({ basePrice: 0, finalPrice: 0 });
    console.log("allVariants:", allVariants);
  };

  const handleRemoveVariant = (id) => {
    let removeVariant = [...variant];
    removeVariant.splice(id, 1);
    setVariant(removeVariant);

    let allPrices = formik.values.allVariants;
    allPrices.splice(id, 1);
    console.log("allPrices", allPrices);
  };

  useEffect(() => {
    if (
      formik.values.taxType === "Exclusive" ||
      formik.values.taxType === "Inclusive"
    ) {
      Calculate();
    }
  }, [flag, formik.values, formik.values.basePrice, formik.values.finalPrice]);

  return (
    <Container maxWidth={"5xl"}>
      <Box paddingLeft={"2%"} paddingRight={"10%"} h={"700px"}>
        <Box textAlign={"center"}>
          <HeadingText
            weight={"400"}
            title='Master rate card form'
            size='32px'></HeadingText>
        </Box>
        <Box display={"grid"} gridTemplateColumns={"49%"}>
          <HeadingText
            title='Item details'
            size='24px'
            weight={"400"}></HeadingText>
          <FormControl
            isInvalid={formik.errors.itemName && formik.touched.itemName}>
            <InputComp
              name={"itemName"}
              value={formik.values.itemName}
              formik={formik}
              children='Item name'></InputComp>
            {formik.touched.itemName && formik.errors.itemName && (
              <FormErrorMessage>{formik.errors.itemName}</FormErrorMessage>
            )}
          </FormControl>
        </Box>
        <Box display={"grid"} gridTemplateColumns={"49% 49%"} gap={"2%"}>
          <Box mt={"2.5%"}>
            <SelectInput
              keys={"Category"}
              placeholder={"--"}
              formik={formik}
              name={"category"}
              arr={["Food", "Stationary"]}></SelectInput>
          </Box>
          <Box mt={"2.5%"}>
            <SelectInput
              keys={"Sub category"}
              placeholder={"--"}
              formik={formik}
              name={"subCategory"}
              arr={["Snack", "Pencil"]}></SelectInput>
          </Box>
          <Box mt={"2.5%"} display={"flex"} gap={"2%"}>
            <InputGroup>
              <InputLeftAddon children='Units' bg={"none"} />
              <Select
                placeholder='Kgs'
                borderTopLeftRadius={"0px"}
                borderBottomLeftRadius={"0px"}></Select>
            </InputGroup>
            <InputComp
              formik={formik}
              placeholder={"0000"}
              children='Net wt.'></InputComp>
          </Box>
          <Box mt={"2.5%"}>
            <FormControl
              isInvalid={formik.errors.quantity && formik.touched.quantity}>
              <InputComp
                formik={formik}
                name={"quantity"}
                placeholder={"00000"}
                value={formik.values.quantity}
                children='Max order Quantity'></InputComp>
              {formik.touched.quantity && formik.errors.quantity && (
                <FormErrorMessage>{formik.errors.quantity}</FormErrorMessage>
              )}
            </FormControl>
          </Box>
        </Box>
        <Box mt={"15px"}>
          <HeadingText
            title='Pricing details'
            size='24px'
            weight={"400"}></HeadingText>
        </Box>
        <Box>
          <Box mt={"15px"} fontWeight={"bold"}>
            Taxes
          </Box>
          <Box mt={"10px"} display={"grid"} gridTemplateColumns={"34.5%"}>
            <FormControl
              isInvalid={formik.errors.taxType && formik.touched.taxType}>
              <SelectInput
                keys={"Tax type"}
                placeholder={"Select"}
                value={formik.values.taxType}
                formik={formik}
                name={"taxType"}
                arr={["Inclusive", "Exclusive", "Exempted"]}></SelectInput>
              {formik.touched.taxType && formik.errors.taxType && (
                <FormErrorMessage>{formik.errors.taxType}</FormErrorMessage>
              )}
            </FormControl>
          </Box>
        </Box>
        <Box mt={"10px"} display={"grid"} gridTemplateColumns={"49%"}>
          <Box fontWeight={"bold"} fontSize={"14px"}>
            Code
          </Box>
          {formik.values.taxType !== "Exempted" && (
            <Box display={"grid"} gridTemplateColumns={"70% 25%"} gap={"5%"}>
              <Box>
                <SelectInput
                  keys={"SGST"}
                  placeholder={"--"}
                  formik={formik}
                  value={formik.values.sgst}
                  name={"sgst"}
                  arr={GSTPercentageArray}></SelectInput>
                <SelectInput
                  keys={"CGST"}
                  placeholder={"--"}
                  formik={formik}
                  value={formik.values.cgst}
                  name={"cgst"}
                  arr={GSTPercentageArray}></SelectInput>
              </Box>
              <Box mt={"5px"}>
                <Box>
                  <InputGroup>
                    <Input
                      type='text'
                      placeholder='00'
                      textAlign={"center"}
                      value={
                        formik.values.sgst !== ""
                          ? formik.values.sgst + "%"
                          : ""
                      }
                    />
                  </InputGroup>
                  <InputGroup mt={"5px"}>
                    <Input
                      type='text'
                      placeholder='00'
                      textAlign={"center"}
                      value={
                        formik.values.cgst !== ""
                          ? formik.values.cgst + "%"
                          : ""
                      }
                    />
                  </InputGroup>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        <Box>
          <Box mt={"15px"} fontWeight={"bold"}>
            Variants (if any)
          </Box>
          {variant.map((vari, index) => (
            <Box display={"flex"} key={index}>
              <Variant formik={formik} id={index} variantArray={variant} />
              {variant.length > 1 && (
                <CloseIcon
                  border={"1px solid red"}
                  p={"15px"}
                  fontSize={"40px"}
                  color={"red"}
                  cursor={"pointer"}
                  borderRadius={"40%"}
                  onClick={() => handleRemoveVariant(index)}
                  mt={"1.7%"}
                  ml={"1%"}
                />
              )}
            </Box>
          ))}
        </Box>
        <Box mt={"10px"} w='99%' display='flex' justifyContent='flex-end'>
          <Button
            fontFamily='DM Sans'
            fontWeight='700'
            fontSize='12px'
            width='90px'
            bg={"none"}
            color='#18B83B'
            onClick={handleAddVariant}
            border='1px solid #18B83B'>
            Add variant
          </Button>
        </Box>
        <Box w='100%' display='flex' justifyContent='flex-end' mt='20px'>
          <Button
            bgColor='#18B83B'
            color={"white"}
            width='20%'
            onClick={() => dispatch(postFetch(formik.values))}>
            Save item
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

import {
  Box,
  Button,
  Container,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { HeadingText } from "./HeadingText";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputComp } from "./InputComp";
import * as reducer from "../Redux/Actions/index";
import { useDispatch } from "react-redux";
import { SelectInput } from "./SelectInput";

export const FormikForm = () => {
  var GSTPercentageArray = ["0%", "5%", "8%", " 18%", "28%"];

  const formik = useFormik({
    initialValues: {
      itemName: "",
      cgst: "0%",
      sgst: "0%",
      category: "",
      quantity: "",
      subCategory: "",
      taxType: "",
      basePrice: 0,
      finalPrice: 0,
    },
    validationSchema: Yup.object({
      itemName: Yup.string()
        .max(15, "Item name should be 15 or less characters")
        .required("required"),
      quantity: Yup.number()
        .moreThan(0, "Please Enter 1 or More Quantity")
        .required("required"),
      taxType: Yup.string().required("required"),
      basePrice: Yup.number().moreThan(0, "Please Enter the Base Price"),
    }),
  });

  const { postFetch } = reducer;
  const dispatch = useDispatch();

  function Calculate() {
    let sgst;
    let cgst;
    let percentage1 = formik.values.sgst;
    sgst = percentage1.split("%");
    sgst = +sgst[0];
    let percentage2 = formik.values.cgst;
    cgst = percentage2.split("%");
    cgst = +cgst[0];
    let gst = cgst + sgst;

    if (
      formik.values.itemName !== "" &&
      formik.values.quantity !== "" &&
      formik.values.taxType !== "" &&
      formik.values.sgst !== "" &&
      formik.values.cgst !== "" &&
      (formik.values.basePrice !== "" || formik.values.basePrice !== "")
    ) {
      if (formik.values.taxType === "Exclusive") {
        let gstCalculation = (+formik.values.basePrice * gst) / 100;
        let final = +formik.values.basePrice + gstCalculation;
        formik.values.finalPrice = final.toFixed(2);
      } else if (formik.values.taxType === "Inclusive") {
        let reverseCalculation = reverseCalculationFunction(
          formik.values.finalPrice,
          gst
        );
        formik.values.basePrice = reverseCalculation.toFixed(2);
      }
    }
  }

  function reverseCalculationFunction(finalPrice, gst) {
    let gstCalculation = finalPrice - finalPrice * (100 / (100 + gst));
    gstCalculation = finalPrice - gstCalculation;
    return gstCalculation;
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

  useEffect(() => {
    if (
      formik.values.taxType === "Exclusive" ||
      formik.values.taxType === "Inclusive"
    )
      Calculate();
  }, [flag, formik.values, formik.values.basePrice, formik.values.finalPrice]);

  return (
    <>
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
            <InputComp
              name={"itemName"}
              value={formik.values.itemName}
              formik={formik}
              children='Item name'></InputComp>
            {formik.touched.itemName && formik.errors.itemName ? (
              <Text color={"red"} ml={"45%"}>
                {formik.errors.itemName}
              </Text>
            ) : (
              ""
            )}
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
              <InputComp
                formik={formik}
                name={"quantity"}
                placeholder={"00000"}
                value={formik.values.quantity}
                children='Max order Quantity'></InputComp>
              {formik.touched.quantity && formik.errors.quantity ? (
                <Text color={"red"} ml={"45%"}>
                  {formik.errors.quantity}
                </Text>
              ) : (
                ""
              )}
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
              <SelectInput
                keys={"Tax type"}
                placeholder={"Select"}
                value={formik.values.taxType}
                formik={formik}
                name={"taxType"}
                arr={["Inclusive", "Exclusive", "Exempted"]}></SelectInput>
              {formik.touched.taxType && formik.errors.taxType ? (
                <Text color={"red"} ml={"45%"}>
                  {formik.errors.taxType}
                </Text>
              ) : (
                ""
              )}
            </Box>
          </Box>
          <Box mt={"10px"} display={"grid"} gridTemplateColumns={"49%"}>
            <Box fontWeight={"bold"} fontSize={"14px"}>
              Code
            </Box>
            {formik.values.taxType !== "Exempted" ? (
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
                          formik.values.sgst !== "" ? formik.values.sgst : ""
                        }
                      />
                    </InputGroup>
                    <InputGroup mt={"5px"}>
                      <Input
                        type='text'
                        placeholder='00'
                        textAlign={"center"}
                        value={
                          formik.values.cgst !== "" ? formik.values.cgst : ""
                        }
                      />
                    </InputGroup>
                  </Box>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Box>
          <Box>
            <Box mt={"15px"} fontWeight={"bold"}>
              Variants (if any)
            </Box>
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
          </Box>
          <Box mt={"10px"} w='99%' display='flex' justifyContent='flex-end'>
            <Button
              fontFamily='DM Sans'
              fontWeight='700'
              fontSize='12px'
              width='90px'
              bg={"none"}
              color='#18B83B'
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
    </>
  );
};

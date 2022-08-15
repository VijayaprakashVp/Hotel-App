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
import { ButtonComp } from "./ButtonComp";
import { HeadingText } from "./HeadingText";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputComp } from "./InputComp";
import { postUrl } from "../Utils/index";
import * as reducer from "../Redux/Actions/index";
import { useDispatch } from "react-redux";

export const FormikForm = () => {
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

  const handleRequest = () => {
    // console.log("postUrl:", postUrl);
    fetch(postUrl, {
      method: "POST",
      body: JSON.stringify(formik.values),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    alert("Yay!, Data Stored");
  };

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
      if (formik.values.taxType === "exclusive") {
        let gstCalculation = (+formik.values.basePrice * gst) / 100;
        let final = +formik.values.basePrice + gstCalculation;
        formik.values.finalPrice = final.toFixed(2);
      } else if (formik.values.taxType === "inclusive") {
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
    (formik.values.taxType === "exclusive" ||
      formik.values.taxType === "inclusive")
  )
    flag = 1;
  useEffect(() => {
    if (
      formik.values.taxType === "exclusive" ||
      formik.values.taxType === "inclusive"
    )
      Calculate();
  }, [flag, formik.values, formik.values.basePrice, formik.values.finalPrice]);
  return (
    <div>
      <Container maxWidth={"5xl"}>
        <Box paddingLeft={"2%"} paddingRight={"10%"} h={"700px"}>
          <Box textAlign={"center"}>
            <HeadingText
              title='Master rate card form'
              size='32px'></HeadingText>
          </Box>
          <Box display={"grid"} gridTemplateColumns={"49%"}>
            <HeadingText title='Item details' size='24px'></HeadingText>
            <InputGroup>
              <InputLeftAddon children='Item name' bg={"none"} />
              <Input
                type='text'
                name='itemName'
                backgroundColor={"none"}
                textAlign={"center"}
                value={formik.values.itemName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {/* <InputComp
              children='Item name'
              inputname='itemvalue'
              inputvalue='formik.values.itemName'
            /> */}
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
              <InputGroup>
                <InputLeftAddon children='Category' bg={"none"} />
                <Select
                  textAlign={"center"}
                  placeholder='--'
                  borderTopLeftRadius={"0px"}
                  borderBottomLeftRadius={"0px"}
                  name='category'
                  value={formik.values.category}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}>
                  <option value='food'>Food</option>
                  <option value='stationary'>Stationary</option>
                </Select>
              </InputGroup>
            </Box>
            <Box mt={"2.5%"}>
              <InputGroup>
                <InputLeftAddon children='Sub category' bg={"none"} />
                <Select
                  textAlign={"center"}
                  placeholder='--'
                  borderTopLeftRadius={"0px"}
                  borderBottomLeftRadius={"0px"}
                  name='subCategory'
                  value={formik.values.subCategory}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}>
                  <option value='snack'>Snack</option>
                  <option value='pencil'>Pencil</option>
                </Select>
              </InputGroup>
            </Box>
            <Box mt={"2.5%"} display={"flex"} gap={"2%"}>
              <InputGroup>
                <InputLeftAddon children='Units' bg={"none"} />
                <Select
                  placeholder='Kgs'
                  borderTopLeftRadius={"0px"}
                  borderBottomLeftRadius={"0px"}></Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children='Net wt.' bg={"none"} />
                <Input type='text' placeholder='0000' textAlign={"center"} />
              </InputGroup>
            </Box>
            <Box mt={"2.5%"}>
              <InputGroup>
                <InputLeftAddon children='Max order Quantity' bg={"none"} />
                <Input
                  type='text'
                  placeholder='00000'
                  textAlign={"center"}
                  name='quantity'
                  value={formik.values.quantity}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </InputGroup>
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
            <HeadingText title='Pricing details' size='24px'></HeadingText>
          </Box>
          <Box>
            <Box mt={"15px"} fontWeight={"bold"}>
              Taxes
            </Box>
            <Box mt={"10px"} display={"grid"} gridTemplateColumns={"34.5%"}>
              <InputGroup>
                <InputLeftAddon children='Tax type*' bg={"none"} />
                <Select
                  placeholder='Select'
                  borderTopLeftRadius={"0px"}
                  borderBottomLeftRadius={"0px"}
                  name='taxType'
                  value={formik.values.taxType}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}>
                  <option value='inclusive'>Inclusive</option>
                  <option value='exclusive'>Exclusive</option>
                  <option value='exempted'>Exempted</option>
                </Select>
              </InputGroup>
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
            {formik.values.taxType !== "exempted" ? (
              <Box display={"grid"} gridTemplateColumns={"70% 25%"} gap={"5%"}>
                <Box>
                  <InputGroup>
                    <InputLeftAddon children='SGST' bg={"none"} />
                    <Select
                      borderTopLeftRadius={"0px"}
                      borderBottomLeftRadius={"0px"}
                      name='sgst'
                      value={formik.values.sgst}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}>
                      <option value='0%'>0%</option>
                      <option value='5%'>5%</option>
                      <option value='8%'>8%</option>
                      <option value='18%'>18%</option>
                      <option value='28%'>28%</option>
                    </Select>
                  </InputGroup>
                  <InputGroup mt={"15px"}>
                    <InputLeftAddon children='CGST' bg={"none"} />
                    <Select
                      borderTopLeftRadius={"0px"}
                      borderBottomLeftRadius={"0px"}
                      name='cgst'
                      value={formik.values.cgst}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}>
                      <option value='0%'>0%</option>
                      <option value='5%'>5%</option>
                      <option value='8%'>8%</option>
                      <option value='18%'>18%</option>
                      <option value='28%'>28%</option>
                    </Select>
                  </InputGroup>
                </Box>
                <Box>
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
                    <InputGroup mt={"15px"}>
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
                  <InputGroup mt={"15px"}>
                    <InputLeftAddon children='Base Price' bg={"none"} />
                    <Input
                      type='number'
                      name='basePrice'
                      placeholder='0000'
                      disabled={formik.values.taxType === "inclusive"}
                      value={formik.values.basePrice}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      textAlign={"center"}
                    />
                  </InputGroup>
                </Box>
                <Box>
                  <InputGroup mt={"15px"}>
                    <InputLeftAddon children='Final Price' bg={"none"} />
                    <Input
                      type='text'
                      name='finalPrice'
                      placeholder='0000'
                      textAlign={"center"}
                      disabled={formik.values.taxType === "exclusive"}
                      value={
                        formik.values.finalPrice !== ""
                          ? formik.values.finalPrice
                          : ""
                      }
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </InputGroup>
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
    </div>
  );
};

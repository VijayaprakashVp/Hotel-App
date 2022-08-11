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

export const FormikForm = () => {
  const formik = useFormik({
    initialValues: {
      item_name: "",
      cgst: "0%",
      sgst: "0%",
      category: "",
      qty: "",
      sub_category: "",
      tax_type: "",
      basePrice: 0,
      finalPrice: 0,
    },
    validationSchema: Yup.object({
      item_name: Yup.string()
        .max(15, "Item name should be 15 or less characters")
        .required("required"),
      qty: Yup.number()
        .moreThan(0, "Please Enter 1 or More Quantity")
        .required("required"),
      tax_type: Yup.string().required("required"),
      basePrice: Yup.number().moreThan(0, "Please Enter the Base Price"),
    }),
  });

  const handleRequest = () => {
    let url = `https://crudcrud.com/api/f8d21e5a020f4b00a0d3ab7a6c164067/data`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify(formik.values),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => res.json());
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

    if (formik.values.tax_type === "exclusive") {
      if (
        formik.values.item_name !== "" &&
        formik.values.qty !== "" &&
        formik.values.tax_type !== "" &&
        formik.values.sgst !== "" &&
        formik.values.cgst !== "" &&
        formik.values.basePrice !== ""
      ) {
        let tem1 = (+formik.values.basePrice * sgst) / 100;
        let tem2 = (+formik.values.basePrice * cgst) / 100;
        let final = +formik.values.basePrice + (+tem1 + +tem2);
        final.toFixed(2);
        formik.values.finalPrice = final;
      }
    } else if (formik.values.tax_type === "inclusive") {
      if (
        formik.values.item_name !== "" &&
        formik.values.qty !== "" &&
        formik.values.tax_type !== "" &&
        formik.values.sgst !== "" &&
        formik.values.cgst !== "" &&
        formik.values.finalPrice !== ""
      ) {
        let tem1 = (+formik.values.finalPrice * sgst) / 100;
        let tem2 = (+formik.values.finalPrice * cgst) / 100;
        formik.values.basePrice = formik.values.finalPrice - tem1 - tem2;
      }
    }
  }
  let flag = 0;
  if (
    formik.values.item_name !== "" &&
    formik.values.qty !== "" &&
    formik.values.sgst !== "" &&
    formik.values.cgst !== "" &&
    (formik.values.tax_type === "exclusive" ||
      formik.values.tax_type === "inclusive")
  )
    flag = 1;
  useEffect(() => {
    if (
      formik.values.tax_type === "exclusive" ||
      formik.values.tax_type === "inclusive"
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
                name='item_name'
                backgroundColor={"none"}
                textAlign={"center"}
                value={formik.values.item_name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {formik.touched.item_name && formik.errors.item_name ? (
              <Text color={"red"} ml={"45%"}>
                {formik.errors.item_name}
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
                  name='sub_category'
                  value={formik.values.sub_category}
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
                  name='qty'
                  value={formik.values.qty}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </InputGroup>
              {formik.touched.qty && formik.errors.qty ? (
                <Text color={"red"} ml={"45%"}>
                  {formik.errors.qty}
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
                  name='tax_type'
                  value={formik.values.tax_type}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}>
                  <option value='inclusive'>Inclusive</option>
                  <option value='exclusive'>Exclusive</option>
                  <option value='exempted'>Exempted</option>
                </Select>
              </InputGroup>
              {formik.touched.tax_type && formik.errors.tax_type ? (
                <Text color={"red"} ml={"45%"}>
                  {formik.errors.tax_type}
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
            {formik.values.tax_type !== "exempted" ? (
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
                      disabled={formik.values.tax_type === "inclusive"}
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
                      disabled={formik.values.tax_type === "exclusive"}
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
              onClick={handleRequest}>
              Save item
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

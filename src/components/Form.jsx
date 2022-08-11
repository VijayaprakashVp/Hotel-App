import {
  Box,
  Button,
  Container,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ButtonComp } from "./ButtonComp";
import { HeadingText } from "./HeadingText";

export const Form = () => {
  const [data, setData] = useState({ sgst: "0%", cgst: "0%" });
  const [basePrice, setBasePrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  // const [exempted, setExempted] = useState(0);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  function Calculate() {
    if (
      data.item_name !== "" &&
      data.qty !== "" &&
      data.tax_type !== "" &&
      data.sgst !== "" &&
      data.cgst !== "" &&
      basePrice !== ""
    ) {
      let sgst;
      let cgst;
      let percentage1 = data.sgst;
      sgst = percentage1.split("%");
      sgst = +sgst[0];
      let percentage2 = data.cgst;
      cgst = percentage2.split("%");
      cgst = +cgst[0];
      let tem1 = (+basePrice * sgst) / 100;
      let tem2 = (+basePrice * cgst) / 100;

      let final = +basePrice + (+tem1 + +tem2) * +data.qty;
      final.toFixed(2);
      setFinalPrice(final);
    }
  }
  let flag = 0;
  if (
    data.item_name !== "" &&
    data.qty !== "" &&
    data.tax_type !== "" &&
    data.sgst !== "" &&
    data.cgst !== "" &&
    data.tax_type === "exclusive"
  )
    flag = 1;
  useEffect(() => {
    if (data.tax_type === "exclusive") Calculate();
  }, [flag, data, basePrice]);
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
                value={data.item_name}
                onChange={handleChange}
              />
            </InputGroup>
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
                  value={data.category}
                  onChange={handleChange}>
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
                  value={data.sub_category}
                  onChange={handleChange}>
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
                  value={data.qty}
                  onChange={handleChange}
                />
              </InputGroup>
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
                  value={data.tax_type}
                  onChange={handleChange}>
                  <option value='inclusive'>Inclusive</option>
                  <option value='exclusive'>Exclusive</option>
                  <option value='exempted'>Exempted</option>
                </Select>
              </InputGroup>
            </Box>
          </Box>
          <Box mt={"10px"} display={"grid"} gridTemplateColumns={"49%"}>
            <Box fontWeight={"bold"} fontSize={"14px"}>
              Code
            </Box>
            {data.tax_type !== "exempted" ? (
              <Box display={"grid"} gridTemplateColumns={"70% 25%"} gap={"5%"}>
                <Box>
                  <InputGroup>
                    <InputLeftAddon children='SGST' bg={"none"} />
                    <Select
                      borderTopLeftRadius={"0px"}
                      borderBottomLeftRadius={"0px"}
                      name='sgst'
                      disabled={data.tax_type === "inclusive"}
                      value={data.sgst}
                      onChange={handleChange}>
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
                      disabled={data.tax_type === "inclusive"}
                      name='cgst'
                      value={data.cgst}
                      onChange={handleChange}>
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
                        disabled={data.tax_type === "inclusive"}
                        value={data.sgst !== "" ? data.sgst : ""}
                      />
                    </InputGroup>
                    <InputGroup mt={"15px"}>
                      <Input
                        type='text'
                        placeholder='00'
                        textAlign={"center"}
                        disabled={data.tax_type === "inclusive"}
                        value={data.cgst !== "" ? data.cgst : ""}
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
                      type='text'
                      placeholder='0000'
                      disabled={data.tax_type === "inclusive"}
                      value={basePrice}
                      // onChange={(e) => setBasePrice(e.target.value)}
                      onChange={(e) => setBasePrice(e.target.value)}
                      textAlign={"center"}
                    />
                  </InputGroup>
                </Box>
                <Box>
                  <InputGroup mt={"15px"}>
                    <InputLeftAddon children='Final Price' bg={"none"} />
                    <Input
                      type='text'
                      placeholder='0000'
                      textAlign={"center"}
                      disabled={data.tax_type === "exclusive"}
                      value={finalPrice !== "" ? finalPrice : ""}
                      onChange={(e) => setFinalPrice(e.target.value)}
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
            <ButtonComp
              color='#18B83B'
              widthL='20%'
              Children='Save item'></ButtonComp>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

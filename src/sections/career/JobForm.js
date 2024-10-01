"use client";

/* eslint-disable no-console */
import {
  Anchor,
  Box,
  Button,
  CheckboxGroup,
  Flex,
  Grid,
  GridCol,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useViewportSize } from "@mantine/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import _isNull from "lodash/isNull";
import _map from "lodash/map";
import _toString from "lodash/toString";
import styles from "@/styles/pages/career.module.css";
import { Checkbox } from "@/components/Checkbox";
import { TextInput } from "@/components/Input";
import { UploadFile } from "@/components/UploadFile";
import { InputNumber } from "@/components/InputNumber";
// import { Captcha } from '@/components/Captcha'
import { Alert } from "@/components/Alert";
import {
  validNameInput,
  validEmail,
  validPhoneNumber,
  validURL,
  validURLNotHTTP,
} from "@/common/regex";
import * as cheerio from "cheerio";
import emojiRegex from "emoji-regex";
import { useRouter, useSearchParams } from "next/navigation";
// import { verifyCaptcha } from '@/services/career/captcha/verifyCaptcha'
import { careerFlow } from "@/services/submission/careerForm";
// import axios from 'axios'
import formBg from "../../../public/assets/img/bg/form-bg-3.png";
function validateField(
  value,
  required,
  validateType,
  validateError,
  maxLength = null,
  maxLengthError = "",
  minLength = null,
  minLengthError = ""
) {
  if (required && _isEmpty(value)) {
    return "Please complete required field.";
  }
  if (!_isEmpty(value)) {
    if (!validateType.test(value)) {
      return validateError;
    }
    if (!_isNull(minLength) && value.trim().length < minLength) {
      return minLengthError;
    }
    if (!_isNull(maxLength) && value.trim().length > maxLength) {
      return maxLengthError;
    }
  }
  return null;
}

const validateURL = (value) => {
  try {
    // const protocal = value.split('://')
    let newURL = value;
    if (validURLNotHTTP.test(value)) {
      newURL = `https://${value}`;
    }
    // const response = await axios.get(newURL)
    const response = fetch(`/api/fetch-url?url=${encodeURIComponent(newURL)}`);
    const data = response.json();
    console.log("response.status: ", response.status);
    if (data.status !== 302 && data.status !== 200) {
      return "The provided URL does not exist (404 error).";
    }
  } catch (error) {
    console.log("error: ", error);
    return "Unable to validate the URL. Please try again.";
  }
  return null;
};

function CareerSubmissionFormPage(props) {
  const { title, id, portfolioRequired } = props;
  const router = useRouter();
  const { width } = useViewportSize();
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [disableAllFields, setDisableAllFields] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [captchaId, setCaptchaID] = useState(null);
  const [captchaNumber, setCaptchaNumber] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  // const [isFormValid, setIsFormValid] = useState(false)
  const [isError, setIsError] = useState(false);
  const [inCorrectCaptcha, setInCorrectCaptcha] = useState(false);
  const [resetCaptcha, setResetCaptcha] = useState(false);
  const disabledSubmitButton = () =>
    disabledSubmit || !privacy || !consent2 || disableAllFields;
  const param = useSearchParams();
  const type = param.get("type");
  const form = useForm({
    mode: "controlled",
    validateInputOnBlur: true,
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      cvLink: "",
      portfolioLink: "",
      acceptConsent1: [],
      acceptConsent2: [],
      privacyPolicy: false,
    },

    validate: {
      firstname: (value) =>
        validateField(
          value,
          true,
          validNameInput,
          "Do not support special characters",
          50,
          "Limit maximum input field"
        ),
      lastname: (value) =>
        validateField(
          value,
          true,
          validNameInput,
          "Do not support special characters",
          50,
          "Limit maximum input field"
        ),
      email: (value) =>
        validateField(
          value,
          true,
          validEmail,
          "Email must be formatted correctly.",
          50,
          "Limit maximum input field"
        ),
      phoneNumber: (value) =>
        validateField(
          value,
          true,
          validPhoneNumber,
          "Can input only number",
          50,
          "Limit maximum input field",
          9,
          "The number must be at least 9 digits."
        ),
      cvLink: (value) => {
        if (_isEmpty(value) && _isNull(cvFile)) {
          return "Please complete required field.";
        }
        if (!_isEmpty(value)) {
          const $ = cheerio.load(value);
          if (emojiRegex().test(value) || $("script").length > 0) {
            return "Special characters are not allowed.";
          }
          if (!validURL.test(value)) {
            return "Please input a valid link.";
          }
        }
        return null;
      },
      portfolioLink: (value) => {
        if (portfolioRequired && _isEmpty(value) && _isNull(portfolioFile)) {
          return "Please complete required field.";
        }
        if (!_isEmpty(value)) {
          const $ = cheerio.load(value);
          if (emojiRegex().test(value) || $("script").length > 0) {
            return "Special characters are not allowed.";
          }
          if (!validURL.test(value)) {
            return "Please input a valid link.";
          }
        }
        return null;
      },
      // cvLink: (value) => validateURL(value, portfolioRequired, portfolioFile),
      // portfolioLink: (value) => validateURL(value, portfolioRequired, portfolioFile),
      acceptConsent1: (value) =>
        _isEmpty(value) ? "Please complete required field." : null,
      acceptConsent2: (value) => {
        if (_isEmpty(value)) {
          return "Please complete required field.";
        }
        if (!value[0]) {
          return "";
        }
        return null;
      },
      privacyPolicy: (value) => (!value ? "" : null),
    },
  });

  // const handleCvFile = (f) => {
  //   if (!_isNull(f)) {
  //     console.log(f.name)
  //     setCvFile(f)
  //   } else {
  //     setCvFile(null)
  //   }
  // }

  // const handlePortfolioFile = (f) => {
  //   if (!_isNull(f)) {
  //     console.log(f.name)
  //     setPortfolioFile(f)
  //   } else {
  //     setPortfolioFile(null)
  //   }
  // }
  const handleError = () => {
    setIsError(true);
    setCaptchaNumber("");
    setResetCaptcha(true);
    setDisableAllFields(false);
    setDisabledSubmit(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(_get(file, "file"));
      reader.onload = () =>
        resolve({
          fileName: _get(file, "file.name"),
          file: reader.result.split(",")[1],
          type: _get(file, "type"),
        });
      reader.onerror = (error) => reject(error);
    });

  const onFinish = async () => {
    console.time("onFinishEnd");
    console.time("start");
    const performanceStart = performance.now();
    // form.validate()
    setInCorrectCaptcha(false);
    setResetCaptcha(false);
    setDisabledSubmit(true);
    setDisableAllFields(true);
    console.time("verifyCaptcha");
    // const {
    //   success: verifySuccess,
    //   err: verifyError,
    // } = await verifyCaptcha(captchaId, _toString(captchaNumber))
    // verify captcha server down
    // if (!_isEmpty(verifyError)) {
    //   handleError()
    //   return
    // }
    // verify incorrect captcha number
    // if (!verifySuccess) {
    //   setCaptchaNumber('')
    //   setInCorrectCaptcha(true)
    //   setResetCaptcha(true)
    //   setDisableAllFields(false)
    //   setDisabledSubmit(false)
    //   return
    // }
    console.timeEnd("verifyCaptcha");

    console.time("setupFile");
    const formValue = form.values;
    const fileUploaded = [];
    if (!_isNull(cvFile)) {
      fileUploaded.push({
        file: cvFile,
        type: "cv",
      });
    }
    if (!_isNull(portfolioFile)) {
      fileUploaded.push({
        file: portfolioFile,
        type: "portfolio",
      });
    }
    console.timeEnd("setupFile");

    // Setup body for calling career submission api
    const formData = {
      careerId: id,
      firstName: formValue.firstname,
      surName: formValue.lastname,
      email: formValue.email,
      phone: formValue.phoneNumber,
      acceptConsent1: formValue.acceptConsent1[0],
      acceptConsent2: formValue.acceptConsent2[0],
      cvLink: formValue.cvLink,
      portfolioLink: formValue.portfolioLink,
      cvFile: "",
      portfolioFile: "",
      passwordCv: "",
      passwordPortfolio: "",
    };

    try {
      // Convert each file to Base64
      console.time("convertTobase64");
      const base64FilesPromises = _map(fileUploaded, (file) =>
        convertFileToBase64(file)
      );
      const base64Results = await Promise.all(base64FilesPromises);
      console.timeEnd("convertTobase64");
      // Call API to upload and submit form
      console.time("callServerApiCareerSubmission");
      if (type === "api") {
        const response = await fetch("/api/career-submission", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData,
            fileData: base64Results,
          }),
        });
        console.timeEnd("start");
        const performanceEnd = performance.now();
        console.log("performance time log", performanceEnd - performanceStart);
        console.timeEnd("callServerApiCareerSubmission");

        // const result = await response.json()
        if (response.ok) {
          console.log("run api");
          setIsError(false);
          // console.log('submission success:', result)
          console.timeEnd("onFinishEnd");
          router.push("/career/thankyou");
        } else {
          // console.error('Failed to submit career submission:', result)
          handleError();
        }
      } else {
        console.timeEnd("start");
        const performanceEnd = performance.now();
        console.log("performance time log", performanceEnd - performanceStart);

        const success = await careerFlow(formData, base64Results);
        console.timeEnd("callServerApiCareerSubmission");

        // const result = await response.json()
        if (success) {
          console.log("run sever action");
          setIsError(false);
          // console.log('submission success:', result)
          console.timeEnd("onFinishEnd");
          router.push("/career/thankyou");
        } else {
          // console.error('Failed to submit career submission:', result)
          handleError();
        }
      }
    } catch (err) {
      console.log(err);
      handleError();
    }
  };

  useEffect(() => {
    if (form.isValid()) {
      setShowCaptcha(true);
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
    }
  }, [form]);

  useEffect(() => {
    if (!_isNull(cvFile)) {
      form.validateField("cvLink");
    }
  }, [cvFile]);

  useEffect(() => {
    if (!_isNull(portfolioFile)) {
      form.validateField("portfolioLink");
    }
  }, [portfolioFile]);

  return (
    <Box
      h={{
        sm: "1700px",
      }}
      w="100%"
      mt={{ base: "80px", sm: 0 }}
      p="40px 20px"
      pos="relative"
      // bg={{ sm: 'url("/assets/img/bg/form-bg-3.png") no-repeat center center / cover' }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.validate();
          // console.log(form.values, form.isValid())
          onFinish();
        }}
      >
        <Box
          maw={{ sm: 600, md: 800 }}
          m={{ sm: "80px auto", md: "100px auto" }}
          p={{ sm: "40px 60px" }}
          bg={{ sm: "white" }}
          style={{ borderRadius: "5px" }}
        >
          {isError && (
            <Alert
              title="Something went wrong. Please try again later."
              // description={error.message}
              onClose={() => setIsError(false)}
            />
          )}
          <Box mb="1.5rem">
            <Title c="lightBlue.2" fz="22px">
              {title}
            </Title>
            <Text c="darkBlue.0">
              <Image
                src="/assets/img/icon/location-icon.png"
                alt="Location"
                width={14}
                height={16}
                // mr="5px"
                style={{
                  display: "inline-block",
                  marginRight: "5px",
                  objectFit: "contain",
                }}
              />
              Klong Toei · BKK
            </Text>
          </Box>
          <Grid mb="1.5rem" gutter="xl">
            <GridCol span={{ base: 12, sm: 6 }}>
              <TextInput
                placeholder="Firstname*"
                required
                maxLength={50}
                disabled={disableAllFields}
                key={form.key("firstname")}
                {...form.getInputProps("firstname")}
              />
            </GridCol>
            <GridCol span={{ base: 12, sm: 6 }}>
              <TextInput
                placeholder="Lastname*"
                required
                disabled={disableAllFields}
                maxLength={50}
                key={form.key("lastname")}
                {...form.getInputProps("lastname")}
              />
            </GridCol>
            <GridCol span={{ base: 12, sm: 6 }}>
              <TextInput
                placeholder="Email*"
                required
                maxLength={50}
                disabled={disableAllFields}
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
            </GridCol>
            <GridCol span={{ base: 12, sm: 6 }}>
              <InputNumber
                placeholder="Phone Number*"
                required
                allowLeadingZeros
                trimLeadingZeroesOnBlur={false}
                allowNegative={false}
                disabled={disableAllFields}
                maxLength={20}
                key={form.key("phoneNumber")}
                {...form.getInputProps("phoneNumber")}
                onChange={(value) =>
                  form.setFieldValue("phoneNumber", value.toString())
                }
              />
            </GridCol>
            <GridCol span={{ base: 12, sm: 6 }}>
              <TextInput
                label="CV / Resume"
                placeholder="Link"
                required
                disabled={disableAllFields}
                key={form.key("cvLink")}
                {...form.getInputProps("cvLink")}
              />
            </GridCol>
            <GridCol
              span={{ base: 12, sm: 6 }}
              display="flex"
              style={{ alignItems: "flex-end", gap: "32px" }}
            >
              <Text>or</Text>
              <UploadFile
                limitFileSize={5000000}
                onChange={(f) => {
                  if (f?.type !== "application/pdf") {
                    setCvFile(null);
                    // form.validateField('cvLink')
                  } else if (f?.size > 5000000) {
                    setCvFile(null);
                    form.setFieldError(
                      "cvLink",
                      "File size exceeds maximum limit (5 Mb)."
                    );
                  } else {
                    setCvFile(f);
                  }
                }}
                disabled={disableAllFields}
              />
            </GridCol>
            <GridCol span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Portfolio"
                placeholder="Link"
                required={portfolioRequired}
                disabled={disableAllFields}
                key={form.key("portfolioLink")}
                {...form.getInputProps("portfolioLink")}
              />
            </GridCol>
            <GridCol
              span={{ base: 12, sm: 6 }}
              display="flex"
              style={{ alignItems: "flex-end", gap: "32px" }}
            >
              <Text>or</Text>
              <UploadFile
                limitFileSize={5000000}
                onChange={(f) => {
                  if (f?.type !== "application/pdf") {
                    setPortfolioFile(null);
                    // form.validateField('portfolioLink')
                  } else if (f?.size > 5000000) {
                    setPortfolioFile(null);
                    form.setFieldError(
                      "portfolioLink",
                      "File size exceeds maximum limit (5 Mb)."
                    );
                  } else {
                    setPortfolioFile(f);
                  }
                }}
                disabled={disableAllFields}
              />
            </GridCol>
          </Grid>
          <Box m="60px 0 40px">
            <Text mb="1rem">
              1. Collection, use and disclosure of personal data in order to
              inform news, promotion and presentation of products and services
              of the Company, its business partners and other juristic
              entities.*
            </Text>
            <CheckboxGroup
              mb="10px"
              styles={{
                error: {
                  marginTop: "10px",
                  color: "#9c0d0d",
                  fontSize: "1rem",
                },
              }}
              key={form.key("acceptConsent1")}
              {...form.getInputProps("acceptConsent1")}
            >
              <Flex
                gap={{ base: "20px", md: "40px" }}
                direction={{ base: "column", sm: "row" }}
              >
                <Checkbox
                  label="Consent"
                  value
                  disabled={disableAllFields}
                  onChange={() => {
                    // console.log(e.target.value)
                    form.setFieldValue("acceptConsent1", [true]);
                  }}
                />
                <Checkbox
                  label="Not Consent"
                  value={false}
                  disabled={disableAllFields}
                  onChange={() => {
                    // console.log(e.target.value)
                    form.setFieldValue("acceptConsent1", [false]);
                  }}
                />
              </Flex>
            </CheckboxGroup>
          </Box>
          <Box mb="1.5rem">
            <Text mb="1rem">
              2. Collection, use and disclosure of sensitive personal data as
              described in the Company’s Privacy Policy.*
            </Text>
            <CheckboxGroup
              mb="10px"
              styles={{
                error: {
                  marginTop: "10px",
                  color: "#9c0d0d",
                  fontSize: "1rem",
                },
              }}
              key={form.key("acceptConsent2")}
              {...form.getInputProps("acceptConsent2")}
            >
              <Flex
                gap={{ base: "20px", md: "40px" }}
                direction={{ base: "column", sm: "row" }}
              >
                <Checkbox
                  label="Consent"
                  value
                  disabled={disableAllFields}
                  onChange={() => {
                    setConsent2(true);
                    // console.log(e.target.value)
                    form.setFieldValue("acceptConsent2", [true]);
                  }}
                />
                <Checkbox
                  label="Not Consent"
                  value={false}
                  disabled={disableAllFields}
                  onChange={() => {
                    setConsent2(false);
                    // console.log(e.target.value)
                    form.setFieldValue("acceptConsent2", [false]);
                  }}
                />
              </Flex>
            </CheckboxGroup>
          </Box>
          <Box>
            <Text c="lightBlue.0">
              As the Company is required to collect, use and disclose my
              sensitive personal data for human resource management purposes, if
              I do not consent to this clause, the Company may not be able to
              perform its duties or obligations under the employment contract or
              contract of hiring services, such as the Company may not be able
              to proceed with my request, I may face any inconvenience and/or I
              may receive damage or lose the opportunity to receive the relevant
              benefits.
            </Text>
          </Box>
          <Box my="20px">
            <Flex gap="15px">
              <Checkbox
                key={form.key("privacyPolicy")}
                {...form.getInputProps("privacyPolicy")}
                onChange={(e) => {
                  setPrivacy(e.target.checked);
                  setPrivacyError(!e.target.checked);
                  form.setFieldValue("privacyPolicy", e.target.checked);
                }}
                disabled={disableAllFields}
              />
              <span style={{ width: "80%" }}>
                I have read and understood the above details of requesting for
                consent information as set out in the Company’s Privacy Policy.
                For details, please read the{" "}
                <Anchor td="underline" href="/pages/privacy-policy-hr.html">
                  privacy policy
                </Anchor>
                *
              </span>
            </Flex>
            {privacyError && (
              <Text mb="20px" c="#9c0d0d">
                Please complete required field.
              </Text>
            )}
          </Box>

          <Button
            type="submit"
            w={{ base: "100%", sm: "200px" }}
            className={styles.benefitLink}
            disabled={disabledSubmitButton()}
            style={{
              opacity: disabledSubmitButton() ? 0.3 : 1,
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default CareerSubmissionFormPage;

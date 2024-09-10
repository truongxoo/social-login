/* eslint-disable */
import { imageCollection } from "../../../assets";
import PasswordInputField from "../../../components/FormFiled/ConfirmPasswordInputField";
import TextInputField from "../../../components/FormFiled/TextInputField";
import SubmitButton from "../../../components/Forms/SubmitButton";
import VerticalForm from "../../../components/Forms/VerticalForm";
import { Typo } from "../../../const";
import { EMAIL_REGEX, MAX_LENGTH } from "../../../const/common";
import { useAppTranslation, useErrTranslation } from "../../../hooks/common";
import { LoginInformation } from "../../../models";
import { Form, Row, Col, Checkbox, Button, Avatar } from "antd";
import clsx from "clsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  redirectToFacebook,
  redirectToGitHub,
  redirectToGoogle,
} from "../../../services/authenticationService";

type LoginFormProps = {
  initialValues: LoginInformation;
  onSubmit: (data: LoginInformation) => void;
};

const LoginForm: React.FunctionComponent<LoginFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  // Translation hooks for text and error messages
  const t = useAppTranslation();
  const et = useErrTranslation();
  const [form] = Form.useForm();
  const [loginInfo, setLoginInfo] = useState<LoginInformation>({
    email: "",
    password: "",
  });

  // Handles the form submission by invoking the onSubmit prop with loginInfo.
  const handleSubmitLogin = () => {
    onSubmit(loginInfo);
  };

  //Updates local state with the current values of form fields whenever they change.
  const onFieldsChange = (_: any) => {
    setLoginInfo({
      email: form.getFieldValue("email"),
      password: form.getFieldValue("password"),
    });
  };

  return (
    <div className="signin-page">
      <Row className="container">
        <Col span={12} className="social-login">
          <Row className="social-login-button hidden">
            <Col span={24} className="hint">
              <p>Or you can choose to login with</p>
            </Col>
            <Col span={24}>
              <Button
                className="button-login-option"
                onClick={redirectToGoogle}
              >
                <Avatar
                  size={25}
                  src={imageCollection.google}
                  className="custom-image"
                  alt=""
                ></Avatar>
                {t("button.continue.google")}
              </Button>
            </Col>
            <Col span={24}>
              <Button
                className="button-login-option"
                onClick={redirectToFacebook}
              >
                <Avatar
                  size={25}
                  src={imageCollection.facebook}
                  className="custom-image"
                  alt=""
                ></Avatar>
                {t("button.continue.facebook")}
              </Button>
            </Col>
            <Col span={24}>
              <Button
                className="button-login-option"
                onClick={redirectToGitHub}
              >
                <Avatar
                  size={25}
                  src={imageCollection.github}
                  className="custom-image"
                  alt=""
                ></Avatar>
                {t("button.continue.github")}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={20} lg={12} className="content">
          <Row className="signin-form">
            <VerticalForm
              name="basic"
              autoComplete="off"
              layout="vertical"
              initialValues={{ ...initialValues, remember: false }}
              onFinish={handleSubmitLogin}
              form={form}
              onFieldsChange={onFieldsChange}
            >
              <Row>
                <Col span={24}>
                  <Row>
                    <h1 className={clsx("login-title", Typo.h2)}>
                      {t("login.title")}
                    </h1>
                  </Row>
                </Col>
                <Col span={24}>
                  <TextInputField
                    className="input-primary"
                    name="email"
                    label={t("input.email.label")}
                    placeholder={t("input.email.placeholder")}
                    maxLength={MAX_LENGTH.EMAIL}
                    rules={[
                      {
                        required: true,
                        message: et("input.validation.email.required"),
                      },
                      {
                        pattern: EMAIL_REGEX,
                        message: et("input.validation.email.pattern"),
                      },
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <PasswordInputField
                    className="input-primary"
                    name="password"
                    label={t("input.password.label")}
                    placeholder={t("input.password.placeholder")}
                    maxLength={MAX_LENGTH.PASSWORD}
                    rules={[
                      {
                        required: true,
                        message: et("input.validation.password.required"),
                      },
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <Col xl={24} className="login-form-remember">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>{t("checkbox.remember")}</Checkbox>
                    </Form.Item>
                  </Col>
                </Col>
                <Col span={24}>
                  <SubmitButton
                    name={t("button.login")}
                    buttonClassName={clsx("button-login", "h-50", Typo.p2)}
                    isBlock
                    disabled={
                      !EMAIL_REGEX.test(loginInfo.email) || !loginInfo.password
                    }
                  ></SubmitButton>
                </Col>
              </Row>
            </VerticalForm>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;

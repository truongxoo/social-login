/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Select, Checkbox, Space, Modal, Button } from 'antd';
import PasswordInputField from '../../components/FormFiled/PasswordInputField';
import ConfirmPasswordInputField from '../../components/FormFiled/ConfirmPasswordInputField';
import TextInputField from '../../components/FormFiled/TextInputField';
import SubmitButton from '../../components/Forms/SubmitButton';
import VerticalForm from '../../components/Forms/VerticalForm';
import { Typo } from '../../const';
import {
  EMAIL_REGEX,
  FULLNAME_REGEX,
  MAX_LENGTH,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
} from '../../const/common';
import { useAppTranslation, useErrTranslation } from '../../hooks/common';
import { RegistrationInfomation } from '../../models';
import clsx from 'clsx';
import { imageCollection } from '../../assets';

type SignUpFormProps = {
  initialValues: RegistrationInfomation;
  onSubmit: (values: RegistrationInfomation) => void;
};

const accountType = [
  { value: 'CONSUMER', label: 'USER' },
  { value: 'PROVIDER', label: 'SERVICE PROVIDER' },
];

const SignUpForm: React.FunctionComponent<SignUpFormProps> = ({ initialValues, onSubmit }) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const [form] = Form.useForm();
  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [errorPhone, setErrorPhone] = useState('');
  const [dialCode, setDialCode] = useState('84');
  const [countryCode, setCountryCode] = useState('VN');
  const [onlyCountries, setOnlyCountries] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [registerInfo, setRegisterInfo] = useState<RegistrationInfomation>({
    email: '',
    password: '',
    phone: '',
    countryCode: '',
    fullname: '',
    userTypeEnum: '',
    dialCode: '',
  });


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = form.getFieldValue('confirm-password');
    setRegisterInfo({ ...registerInfo, password: e.target.value });

    !confirmPassword || confirmPassword !== e.target.value
      ? form.setFields([
          { name: 'confirm-password', errors: [et('input.validation.confirmPassword.match')] },
        ])
      : form.setFields([{ name: 'confirm-password', errors: [] }]);
  };

  const onFieldsChange = (_: any) => {
    setRegisterInfo({
      ...registerInfo,
      fullname: form.getFieldValue('fullname'),
      email: form.getFieldValue('email'),
      userTypeEnum: form.getFieldValue('userTypeEnum'),
    });
  };

  const handleSubmit = (values: RegistrationInfomation) => {
    values = registerInfo;
    values.countryCode = countryCode.toUpperCase();
    values.dialCode = dialCode;
    onSubmit(values);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleShowTermsPolicy = () => {
    setIsModalVisible(true);
  };

  const handleAcceptTermsPolicy = () => {
    setIsChecked(true);
    form.setFieldsValue({ termsPolicy: true });
    setIsModalVisible(false);
  };

  const handleClickCheckBox = () => {
    setIsChecked(!form.getFieldValue('termsPolicy'));
    form.setFieldsValue({ termsPolicy: !form.getFieldValue('termsPolicy') });
  };

  const handleValidityChange = (isValid: boolean) => {
    setIsValidPhone(isValid);
  };

  return (
    <Row justify="center" align="middle" className="signup-page">
      <Col xs={24} sm={24} md={20} lg={12} className="content">
        <Row className="signup-form" justify="center" align="middle">
          <VerticalForm
            name="basic"
            autoComplete="off"
            layout="vertical"
            form={form}
            initialValues={initialValues}
            onFinish={handleSubmit}
            onFieldsChange={onFieldsChange}
          >
            <Row>
              <Col span={24}>
                <Row>
                  <h1 className="title">{t('register.title')}</h1>
                </Row>
              </Col>
              <Col span={24} className="type-country">
                <Row justify="space-between">
                  <Col xs={24} md={11} lg={10} xxl={11}>
                    <Row>
                      <Col span={24} className="label">
                        {t('select.accountType')}
                      </Col>
                    </Row>
                    <Row>
                      <Space.Compact className="type-country">
                        <Col span={24}>
                          <Form.Item name="userTypeEnum" valuePropName="checked" noStyle>
                            <Select defaultValue="CONSUMER" options={accountType} />
                          </Form.Item>
                        </Col>
                      </Space.Compact>
                    </Row>
                  </Col>
                  <Col xs={24} md={0} className="mb-25"></Col>
                  <Col xs={24} md={12} lg={13} xxl={12}>
                    <TextInputField
                      className="input-primary"
                      name="fullname"
                      label={t('input.name.label')}
                      placeholder={t('input.name.placeholder')}
                      maxLength={MAX_LENGTH.FULLNAME}
                      rules={[
                        { required: true, message: et('input.validation.name.required') },
                        { pattern: FULLNAME_REGEX, message: et('input.validation.name.pattern') },
                      ]}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row justify="space-between">
                  <Col xs={24} xxl={11}>
                    <TextInputField
                      className="input-primary"
                      name="email"
                      label={t('input.email.label')}
                      placeholder={t('input.email.placeholder')}
                      maxLength={MAX_LENGTH.EMAIL}
                      rules={[
                        { required: true, message: et('input.validation.email.required') },
                        { pattern: EMAIL_REGEX, message: et('input.validation.email.pattern') },
                      ]}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <PasswordInputField
                  className="input-primary"
                  name="password"
                  label={t('input.password.label')}
                  placeholder={t('input.password.placeholder')}
                  maxLength={MAX_LENGTH.PASSWORD}
                  onChange={handlePasswordChange}
                />
              </Col>
              <Col span={24}>
                <ConfirmPasswordInputField
                  className="input-primary"
                  name="confirm-password"
                  label={t('input.confirm-password.label')}
                  placeholder={t('input.confirm-password.placeholder')}
                  maxLength={MAX_LENGTH.PASSWORD}
                  rules={[
                    { required: true, message: et('input.validation.confirmPassword.required') },
                    ({}) => ({
                      validator(_, value) {
                        if (!value || registerInfo.password === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(et('input.validation.confirmPassword.match')),
                        );
                      },
                    }),
                  ]}
                />
              </Col>
              <Col span={24}>
                <Form.Item
                  name="termsPolicy"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: async (_, checked) => {
                        if (!checked) {
                          return Promise.reject(
                            new Error(et('input.validation.termPolicy.required')),
                          );
                        }
                      },
                    },
                  ]}
                >
                  <Checkbox checked={isChecked} onClick={handleClickCheckBox}>
                    {t('terms-policy.label')}
                  </Checkbox>
                  <span className="terms-policy-button" onClick={handleShowTermsPolicy}>
                    {t('terms-policy.label2')}
                  </span>
                </Form.Item>
              </Col>
              <Col span={24}>
                <SubmitButton
                  name={t('button.continue.sign-up')}
                  buttonClassName={clsx('button-signup', 'h-50', Typo.p2)}
                  isBlock
                  disabled={
                    !FULLNAME_REGEX.test(registerInfo.fullname) ||
                    !EMAIL_REGEX.test(registerInfo.email) ||
                    !PHONE_NUMBER_REGEX.test(registerInfo.phone) ||
                    !PASSWORD_REGEX.test(registerInfo.password) ||
                    registerInfo.password !== form.getFieldValue('confirm-password') ||
                    !form.getFieldValue('termsPolicy') ||
                    !isValidPhone
                  }
                />
              </Col>
              <Col span={24} className="custom-have-account">
                <Form.Item noStyle>
                  <Row justify="center" align="middle">
                    <div>{t('register.have-account')}</div> &nbsp;
                    <a href="/signin/email" className="custom-text-color">
                      {t('register.register-link')}
                    </a>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
          </VerticalForm>
        </Row>
      </Col>
      <Col lg={12} className="content hide-on-lg">
        <img src={imageCollection.intersectImage} className="custom-image" alt="" />
      </Col>
    </Row>
  );
};

export default SignUpForm;

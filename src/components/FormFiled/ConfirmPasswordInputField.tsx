/* eslint-disable */
import { BaseInputFieldProps } from '../../models/common';
import { Input } from 'antd';
import { NamePath } from 'antd/lib/form/interface';
import React from 'react';
import FormItem from './FormItem';
import { useErrTranslation } from '../../hooks/common';

interface PasswordInputFieldProps extends BaseInputFieldProps {
  dependencies?: NamePath[];
  minLength?: number;
}

const PasswordInputField: React.FunctionComponent<PasswordInputFieldProps> = (
  props
) => {
  const {
    placeholder,
    value,
    defaultValue,
    onChange,
    disabled,
    maxLength,
    minLength,
    rules,
  } = props;

  const et = useErrTranslation();

  const updatedRules = [
    ...(rules || []),
    ...(minLength ? [{ min: minLength, message: et('input.validation.password.minlength') + ` ${minLength} ` + et('input.validation.password.minlength2') }] : []),
  ];

  return (
    <FormItem {...props} rules={updatedRules}>
      <Input.Password
        placeholder={placeholder}
        value={value as string}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength}
      />
    </FormItem>
  );
};

export default PasswordInputField;

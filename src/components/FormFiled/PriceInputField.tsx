/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { InputProps } from 'antd/es/input';
import { DollarOutlined } from '@ant-design/icons';

interface PriceInputFieldProps extends Omit<InputProps, 'onChange'> {
  initialValue: string | null;
  onChange?: (value: string) => void;
  onValidChange?: (isValid: boolean) => void;
  label?: string;
  rules?: Array<{
    required?: boolean;
    pattern?: RegExp;
    message: string;
  }>;
}

const PriceInputField: React.FunctionComponent<PriceInputFieldProps> = ({
  initialValue,
  onChange,
  onValidChange,
  label,
  rules,
  ...props
}) => {
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<string>(initialValue || '');

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
      validatePrice(initialValue);
    }
  }, [initialValue]);

  const validatePrice = (value: string) => {
    if (rules) {
      for (const rule of rules) {
        if (rule.required && !value) {
          setError(rule.message);
          onValidChange?.(false);
          return false;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          setError(rule.message);
          onValidChange?.(false);
          return false;
        }
      }
    }

    if (Number(value) <= 0) {
      onValidChange?.(false);
      return false;
    }
    setError(null);
    onValidChange?.(true);
    return true;
  };

  function isValidPrice(value: string): number {
    return (value.match(/\./g) || []).length;
  }

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.currentTarget.value;
      const regex = /^(\d{0,3})(\.\d{0,2})?$/;

      if (rawValue.startsWith('.')) {
        return;
      }

      if (!rawValue.match(regex)) {
        return;
      }

      if (isValidPrice(rawValue) > 1) {
        return;
      }

      if (rawValue.includes('.')) {
        const valueSplit = rawValue.split('.');
        if (valueSplit[1].length > 2) {
          return;
        }
      } else {
        if (rawValue.length > 3) {
          return;
        }
      }

      setValue(rawValue);
      validatePrice(rawValue);

      if (onChange) {
        onChange(rawValue);
      }
    },
    [onChange],
  );

  return (
    <div className="price-input-container">
      <Form.Item noStyle>
        {label && <p className="price-input-label">{label}</p>}
        <Input
          {...props}
          className="custom-price-input"
          value={value}
          onChange={handleInputChange}
          suffix={<DollarOutlined style={{ fontSize: '16px', color: '#b7b8b9' }} />}
        />
      </Form.Item>
      {error && <p className="error-message-price">{error}</p>}
    </div>
  );
};

export default PriceInputField;

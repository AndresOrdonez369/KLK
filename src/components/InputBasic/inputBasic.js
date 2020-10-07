import React, { useState } from 'react';
import validate from 'validate.js';
import { Input } from 'react-native-elements';
import styles from './styles';

const InputBasic = ({
  validation,
  secureTextEntry,
  placeholder,
  value,
  keyboardType,
  inputStyle,
  containerStyle,
  changeText,
}) => {
  const [error, setError] = useState(false);

  const valid = (text, val) => {
    switch (val) {
      case 'name':
        return validateName(text);
      case 'age':
        return validateAge(text);
      case 'email':
        return validateEmail(text);
      case 'password':
        return validatePassword(text);
      case 'cellphone':
        return validateCellphone(text);
      default:
        return changeText(text);
    }
  };

  const validateName = (name) => {
    const constraints = {
      name: {
        length: {
          minimum: 8,
        },
      },
    };

    const newError = validate({ name }, constraints);
    setError(!(newError === undefined));
    return changeText(name, newError);
  };

  const validateEmail = (email) => {
    const constraints = {
      from: {
        email: true,
      },
    };
    const newError = validate({ from: email }, constraints);
    setError(!(newError === undefined));
    return changeText(email, newError);
  };

  const validateAge = (age) => {
    const constraints = {
      duration: {
        numericality: {
          onlyInteger: true,
          greaterThan: 10,
          lessThan: 100,
        },
      }
    };
    const newError = validate({ duration: age }, constraints);
    setError(!(newError === undefined));
    return changeText(age, newError);
  };

  const validatePassword = (password) => {
    const constraints = {
      password: {
        presence: true,
        length: {
          minimum: 6,
        },
      },
    };
    const newError = validate({ password }, constraints);
    setError(!(newError === undefined));
    return changeText(password, newError);
  };

  const validateCellphone = (cellphone) => {
    const constraints = {
      cellphone: {
        length: {
          minimum: 10,
        },
      },
    };
    const newError = validate({ cellphone }, constraints);
    setError(!(newError === undefined));
    return changeText(cellphone, newError);
  };

  return (
    <Input
      label={placeholder}
      placeholder={placeholder}
      onChange={(e) => {
        valid(e.nativeEvent.text, validation);
      }}
      value={value}
      keyboardType={keyboardType}
      inputContainerStyle={styles.inputContainerStyle(error)}
      textAlign="center"
      containerStyle={[
        styles.containerStyle,
        containerStyle,
      ]}
      style={inputStyle}
      labelStyle={styles.labelStyle}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="snow"
      underlineColorAndroid="transparent"
    />

  );
};

export default InputBasic;

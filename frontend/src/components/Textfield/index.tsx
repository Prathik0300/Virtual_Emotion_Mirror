import { TextField, TextFieldProps } from "@mui/material";
import classnames from "classnames";

type TextFieldWrapper = TextFieldProps & {
  inputProps?: React.InputHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement
  >;
};

export const NormalTextField = ({
  label = "",
  onChange,
  placeholder = "",
  required = false,
  variant = "outlined",
  style = {},
  className,
  inputProps,
  InputProps = {},
  value = "",
  error,
  helperText,
  ...props
}: TextFieldWrapper) => {
  return (
    <TextField
      {...props}
      className={classnames(className)}
      style={style}
      variant={variant}
      onChange={onChange}
      required={required}
      value={value}
      placeholder={placeholder}
      label={label}
      type="text"
      error={error}
      helperText={helperText}
      InputProps={{
        ...InputProps,
        inputProps: {
          ...InputProps?.inputProps,
          ...inputProps,
        },
      }}
    />
  );
};

export const EmailTextField = ({
  label = "",
  onChange,
  placeholder = "",
  required = false,
  variant = "outlined",
  style = {},
  className,
  inputProps,
  InputProps = {},
  value = "",
  error,
  helperText,
  ...props
}: TextFieldWrapper) => {
  return (
    <TextField
      {...props}
      className={classnames(className)}
      style={style}
      value={value}
      variant={variant}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      label={label}
      type="email"
      error={error}
      helperText={helperText}
      InputProps={{
        ...InputProps,
        inputProps: {
          ...InputProps?.inputProps,
          ...inputProps,
        },
      }}
    />
  );
};

export const PasswordTextField = ({
  label = "",
  onChange,
  placeholder = "",
  required = false,
  variant = "outlined",
  style = {},
  className,
  inputProps,
  InputProps = {},
  type = "password",
  value = "",
  error,
  helperText,
  ...props
}: TextFieldWrapper) => {
  return (
    <TextField
      {...props}
      className={classnames(className)}
      style={style}
      variant={variant}
      onChange={onChange}
      value={value}
      required={required}
      placeholder={placeholder}
      label={label}
      type={type}
      error={error}
      helperText={helperText}
      InputProps={{
        ...InputProps,
        inputProps: {
          ...InputProps?.inputProps,
          ...inputProps,
        },
      }}
    />
  );
};

import React, { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { inputStyles } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/** Form input with label and error message */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, style, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    }, [onFocus]);

    const handleBlur = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    }, [onBlur]);

    const getInputStyle = React.useMemo(() => {
      let finalStyle = { ...inputStyles.input };

      if (error) {
        finalStyle = { ...finalStyle, ...inputStyles.inputError };
      } else if (isFocused) {
        finalStyle = { ...finalStyle, ...inputStyles.inputFocus };
      }

      if (props.disabled) {
        finalStyle = { ...finalStyle, ...inputStyles.inputDisabled };
      }

      return { ...finalStyle, ...style };
    }, [error, isFocused, props.disabled, style]);

    return (
      <div style={inputStyles.container}>
        {label && (
          <label style={inputStyles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          style={getInputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {error && (
          <p style={inputStyles.error}>{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

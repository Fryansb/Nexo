import React, { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { textareaStyles } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

/** Multiline text input with label and error message */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, style, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = React.useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    }, [onFocus]);

    const handleBlur = React.useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    }, [onBlur]);

    const getTextareaStyle = React.useMemo(() => {
      let finalStyle = { ...textareaStyles.textarea };

      if (error) {
        finalStyle = { ...finalStyle, ...textareaStyles.textareaError };
      } else if (isFocused) {
        finalStyle = { ...finalStyle, ...textareaStyles.textareaFocus };
      }

      if (props.disabled) {
        finalStyle = { ...finalStyle, ...textareaStyles.textareaDisabled };
      }

      return { ...finalStyle, ...style };
    }, [error, isFocused, props.disabled, style]);

    return (
      <div style={textareaStyles.container}>
        {label && (
          <label style={textareaStyles.label}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          style={getTextareaStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {error && (
          <p style={textareaStyles.error}>{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

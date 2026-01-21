import type { CSSProperties } from 'react';

export const inputStyles: Record<string, CSSProperties> = {
  container: {
    width: '100%',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    fontSize: '14px',
    lineHeight: '1.5',
    outline: 'none',
    transition: 'all 0.2s',
    backgroundColor: '#ffffff',
    color: '#111827',
  },
  inputFocus: {
    borderColor: '#3B82F6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  },
  inputError: {
    borderColor: '#DC2626',
    boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)',
  },
  inputDisabled: {
    backgroundColor: '#F9FAFB',
    color: '#6B7280',
    cursor: 'not-allowed',
  },
  error: {
    marginTop: '4px',
    fontSize: '12px',
    color: '#DC2626',
    lineHeight: '1.4',
  },
};

export const textareaStyles: Record<string, CSSProperties> = {
  container: {
    width: '100%',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px',
  },
  textarea: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    fontSize: '14px',
    lineHeight: '1.5',
    outline: 'none',
    transition: 'all 0.2s',
    backgroundColor: '#ffffff',
    color: '#111827',
    resize: 'vertical' as const,
    minHeight: '80px',
    fontFamily: 'inherit',
  },
  textareaFocus: {
    borderColor: '#3B82F6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  },
  textareaError: {
    borderColor: '#DC2626',
    boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)',
  },
  textareaDisabled: {
    backgroundColor: '#F9FAFB',
    color: '#6B7280',
    cursor: 'not-allowed',
  },
  error: {
    marginTop: '4px',
    fontSize: '12px',
    color: '#DC2626',
    lineHeight: '1.4',
  },
};
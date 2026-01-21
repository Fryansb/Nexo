import React from 'react';
import type { ButtonHTMLAttributes, CSSProperties } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

const buttonStyles: Record<string, CSSProperties> = {
  base: {
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: '500',
    transition: 'all 0.2s',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '14px',
    minHeight: '40px',
  },
  primary: {
    backgroundColor: '#3B82F6',
    color: '#ffffff',
  },
  primaryHover: {
    backgroundColor: '#2563EB',
  },
  secondary: {
    backgroundColor: '#F3F4F6',
    color: '#374151',
    border: '1px solid #D1D5DB',
  },
  secondaryHover: {
    backgroundColor: '#E5E7EB',
  },
  danger: {
    backgroundColor: '#DC2626',
    color: '#ffffff',
  },
  dangerHover: {
    backgroundColor: '#B91C1C',
  },
  disabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  loading: {
    opacity: 0.8,
    cursor: 'not-allowed',
  },
};

/** Reusable button component with loading state */
export const Button = React.memo(({
  children,
  variant = 'primary',
  isLoading = false,
  disabled,
  onMouseOver,
  onMouseOut,
  style,
  ...props
}: ButtonProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseOver = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    onMouseOver?.(e);
  }, [onMouseOver]);

  const handleMouseOut = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    onMouseOut?.(e);
  }, [onMouseOut]);

  const getButtonStyle = React.useMemo((): CSSProperties => {
    const baseStyle = { ...buttonStyles.base, ...buttonStyles[variant] };
    
    if (disabled || isLoading) {
      return { ...baseStyle, ...buttonStyles.disabled };
    }

    if (isHovered) {
      const hoverKey = `${variant}Hover` as keyof typeof buttonStyles;
      return { ...baseStyle, ...buttonStyles[hoverKey] };
    }

    return baseStyle;
  }, [variant, disabled, isLoading, isHovered]);

  const LoadingSpinner = React.memo(() => (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none"
      style={{
        animation: 'spin 1s linear infinite',
      }}
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
        opacity="0.25"
      />
      <path 
        fill="currentColor" 
        opacity="0.75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  ));

  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <button
        style={{ ...getButtonStyle, ...style }}
        disabled={disabled || isLoading}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        {...props}
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            Carregando...
          </>
        ) : (
          children
        )}
      </button>
    </>
  );
});

Button.displayName = 'Button';

import React from 'react';
import type { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
}

const cardStyles: CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e5e7eb',
};

/** Simple card container with shadow and border */
export const Card = React.memo(({ children, style }: CardProps) => {
  return (
    <div style={{ ...cardStyles, ...style }}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

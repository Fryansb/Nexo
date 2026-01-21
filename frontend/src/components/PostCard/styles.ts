import type { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginRight: '12px',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontWeight: '600',
    fontSize: '15px',
    color: '#111',
    marginBottom: '2px',
  },
  username: {
    fontSize: '13px',
    color: '#6b7280',
  },
  timestamp: {
    fontSize: '13px',
    color: '#9ca3af',
  },
  content: {
    fontSize: '15px',
    lineHeight: '1.5',
    color: '#374151',
    marginBottom: '12px',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
    marginBottom: '12px',
  },
  actions: {
    display: 'flex',
    gap: '24px',
    paddingTop: '12px',
    borderTop: '1px solid #f3f4f6',
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'none',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '4px 8px',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
  },
  actionButtonActive: {
    color: '#ef4444',
  },
};

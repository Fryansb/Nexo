import type { CSSProperties } from 'react';

export const layoutStyles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F9FAFB',
  },
  nav: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #E5E7EB',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  navContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 16px',
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#3B82F6',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  logoHover: {
    color: '#2563EB',
  },
  navMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  navLink: {
    color: '#374151',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  navLinkHover: {
    color: '#3B82F6',
    backgroundColor: '#F3F4F6',
  },
  userAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    objectFit: 'cover' as const,
  },
  logoutButton: {
    backgroundColor: '#DC2626',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  logoutButtonHover: {
    backgroundColor: '#B91C1C',
  },
  main: {
    padding: '24px 0',
  },
  mainContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 16px',
  },
};

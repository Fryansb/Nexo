import React, { type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { layoutStyles } from './styles';

interface LayoutProps {
  children: ReactNode;
}

/** Main layout with navigation bar */
export const Layout = React.memo(({ children }: LayoutProps) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  
  const [logoHover, setLogoHover] = React.useState(false);
  const [hoveredLink, setHoveredLink] = React.useState<string | null>(null);
  const [logoutHover, setLogoutHover] = React.useState(false);

  const handleLogout = React.useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  const getLinkStyle = React.useCallback((linkName: string) => {
    return hoveredLink === linkName 
      ? { ...layoutStyles.navLink, ...layoutStyles.navLinkHover }
      : layoutStyles.navLink;
  }, [hoveredLink]);

  const getLogoStyle = React.useMemo(() => {
    return logoHover 
      ? { ...layoutStyles.logo, ...layoutStyles.logoHover }
      : layoutStyles.logo;
  }, [logoHover]);

  const getLogoutButtonStyle = React.useMemo(() => {
    return logoutHover 
      ? { ...layoutStyles.logoutButton, ...layoutStyles.logoutButtonHover }
      : layoutStyles.logoutButton;
  }, [logoutHover]);

  return (
    <div style={layoutStyles.container}>
      <nav style={layoutStyles.nav}>
        <div style={layoutStyles.navContainer}>
          <div style={layoutStyles.navContent}>
            <div style={layoutStyles.logoContainer}>
              <Link 
                to="/" 
                style={getLogoStyle}
                onMouseOver={() => setLogoHover(true)}
                onMouseOut={() => setLogoHover(false)}
              >
                Nexo
              </Link>
            </div>
            
            <div style={layoutStyles.navMenu}>
              <Link
                to="/"
                style={getLinkStyle('feed')}
                onMouseOver={() => setHoveredLink('feed')}
                onMouseOut={() => setHoveredLink(null)}
              >
                Feed
              </Link>
              
              {user && (
                <>
                  <Link
                    to="/profile"
                    style={getLinkStyle('profile')}
                    onMouseOver={() => setHoveredLink('profile')}
                    onMouseOut={() => setHoveredLink(null)}
                  >
                    {user.profile_picture && (
                      <img
                        src={user.profile_picture}
                        alt={user.username}
                        style={layoutStyles.userAvatar}
                      />
                    )}
                    <span>{user.username}</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    style={getLogoutButtonStyle}
                    onMouseOver={() => setLogoutHover(true)}
                    onMouseOut={() => setLogoutHover(false)}
                  >
                    Sair
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main style={layoutStyles.main}>
        <div style={layoutStyles.mainContainer}>
          {children}
        </div>
      </main>
    </div>
  );
});

Layout.displayName = 'Layout';

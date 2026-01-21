import React from 'react';
import type { CSSProperties } from 'react';
import { populateDummyData, clearDummyData, getDummyUsers } from '../utils/dummyData';

const devToolsStyles: Record<string, CSSProperties> = {
  container: {
    position: 'fixed' as const,
    bottom: '20px',
    right: '20px',
    backgroundColor: '#1F2937',
    color: '#F9FAFB',
    padding: '12px',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    fontSize: '12px',
    fontFamily: 'monospace',
    zIndex: 9999,
    maxWidth: '300px',
    border: '1px solid #374151',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#60A5FA',
    borderBottom: '1px solid #374151',
    paddingBottom: '4px',
  },
  button: {
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '11px',
    margin: '2px',
    transition: 'background-color 0.2s',
  },
  buttonHover: {
    backgroundColor: '#2563EB',
  },
  clearButton: {
    backgroundColor: '#DC2626',
  },
  clearButtonHover: {
    backgroundColor: '#B91C1C',
  },
  userList: {
    marginTop: '8px',
    fontSize: '10px',
    maxHeight: '200px',
    overflowY: 'auto' as const,
  },
  user: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2px 0',
    borderBottom: '1px solid #374151',
  },
  username: {
    color: '#10B981',
    fontWeight: 'bold',
  },
  password: {
    color: '#F59E0B',
    fontFamily: 'monospace',
  },
};

/** Ferramentas de desenvolvimento para dados fictícios - apenas em DEV */
export const DevTools = React.memo(() => {
  const [showUsers, setShowUsers] = React.useState(false);
  const [populateHover, setPopulateHover] = React.useState(false);
  const [clearHover, setClearHover] = React.useState(false);
  
  const dummyUsers = getDummyUsers();

  const handlePopulate = React.useCallback(() => {
    populateDummyData();
    window.location.reload(); // Recarregar para aplicar os dados
  }, []);

  const handleClear = React.useCallback(() => {
    clearDummyData();
    window.location.reload();
  }, []);

  const getPopulateButtonStyle = React.useMemo(() => {
    return populateHover 
      ? { ...devToolsStyles.button, ...devToolsStyles.buttonHover }
      : devToolsStyles.button;
  }, [populateHover]);

  const getClearButtonStyle = React.useMemo(() => {
    const baseStyle = { ...devToolsStyles.button, ...devToolsStyles.clearButton };
    return clearHover 
      ? { ...baseStyle, ...devToolsStyles.clearButtonHover }
      : baseStyle;
  }, [clearHover]);

  // Só mostra em ambiente de desenvolvimento
  if (import.meta.env.PROD) return null;

  return (
    <div style={devToolsStyles.container}>
      <div style={devToolsStyles.title}>🛠️ DEV TOOLS</div>
      
      <div>
        <button
          style={getPopulateButtonStyle}
          onClick={handlePopulate}
          onMouseOver={() => setPopulateHover(true)}
          onMouseOut={() => setPopulateHover(false)}
        >
          📝 Carregar Usuários Fictícios
        </button>
        
        <button
          style={getClearButtonStyle}
          onClick={handleClear}
          onMouseOver={() => setClearHover(true)}
          onMouseOut={() => setClearHover(false)}
        >
          🗑️ Limpar Dados
        </button>
      </div>

      <div>
        <button
          style={devToolsStyles.button}
          onClick={() => setShowUsers(!showUsers)}
        >
          {showUsers ? '👁️ Ocultar' : '👀 Ver'} Usuários ({dummyUsers.length})
        </button>
      </div>

      {showUsers && (
        <div style={devToolsStyles.userList}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#60A5FA' }}>
            Usuários Disponíveis:
          </div>
          {dummyUsers.map((user) => (
            <div key={user.id} style={devToolsStyles.user}>
              <span style={devToolsStyles.username}>{user.username}</span>
              <span style={devToolsStyles.password}>
                {(user as any).password || '123456'}
              </span>
            </div>
          ))}
          
          <div style={{ marginTop: '8px', padding: '4px', backgroundColor: '#374151', borderRadius: '4px' }}>
            <div style={{ fontWeight: 'bold', color: '#10B981' }}>🎯 Quick Login:</div>
            <div>👑 admin / Admin123</div>
            <div>🎨 maria_santos / 123456</div>
            <div>💻 joao_dev / 123456</div>
          </div>
        </div>
      )}
    </div>
  );
});

DevTools.displayName = 'DevTools';
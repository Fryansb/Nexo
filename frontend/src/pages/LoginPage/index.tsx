import { useState, useCallback } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { authService } from '../../services';
import { useAuthStore } from '../../stores/authStore';
import { Button, Input } from '../../components/ui';
import { styles } from './styles';

/** Login page with authentication form */
export const LoginPage = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = useCallback((field: 'username' | 'password') => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.login(formData);
      setUser(response.user);
      toast.success('Login realizado com sucesso!');
      navigate('/');
    } catch (error) {
      const err = error as { response?: { data?: { detail?: string } }; message?: string };
      toast.error(err.response?.data?.detail || err.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  }, [formData, setUser, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.logo}>Nexo</h2>
          <p style={styles.subtitle}>Entre na sua conta</p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange('username')}
              placeholder="seu_username"
            />

            <Input
              label="Senha"
              type="password"
              required
              value={formData.password}
              onChange={handleChange('password')}
              placeholder="••••••••"
            />
          </div>

          <div>
            <Button
              type="submit"
              isLoading={isLoading}
              style={{ width: '100%' }}
              variant="primary"
            >
              Entrar
            </Button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Não tem uma conta?{' '}
              <Link
                to="/register"
                style={{ fontWeight: '500', color: '#3b82f6', textDecoration: 'none' }}
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

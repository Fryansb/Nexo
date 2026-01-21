import { useState, useCallback } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import { authService } from '../../services';
import { useAuthStore } from '../../stores/authStore';
import { Button, Input } from '../../components/ui';
import { styles } from './styles';
import { isValidEmail, validatePassword } from '../../utils/helpers';

/** Registration page for new users */
export const RegisterPage = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
  });

  const handleChange = useCallback((field: keyof typeof formData) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!isValidEmail(formData.email)) {
      toast.error('Por favor, insira um email válido');
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      passwordValidation.errors.forEach(error => toast.error(error));
      return;
    }

    if (formData.password !== formData.password2) {
      toast.error('As senhas não coincidem');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register(formData);
      setUser(response.user);
      toast.success('Conta criada com sucesso!');
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach((key) => {
          const messages = errors[key];
          if (Array.isArray(messages)) {
            messages.forEach((msg) => toast.error(`${key}: ${msg}`));
          } else {
            toast.error(`${key}: ${messages}`);
          }
        });
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erro ao criar conta');
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, setUser, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.logo}>Nexo</h2>
          <p style={styles.subtitle}>Crie sua conta</p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Username"
            type="text"
            required
            value={formData.username}
            onChange={handleChange('username')}
            placeholder="seu_username"
          />

          <Input
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange('email')}
            placeholder="seu@email.com"
          />

          <div style={styles.row}>
            <Input
              label="Nome"
              type="text"
              required
              value={formData.first_name}
              onChange={handleChange('first_name')}
              placeholder="João"
            />

            <Input
              label="Sobrenome"
              type="text"
              required
              value={formData.last_name}
              onChange={handleChange('last_name')}
              placeholder="Silva"
            />
          </div>

          <Input
            label="Senha"
            type="password"
            required
            value={formData.password}
            onChange={handleChange('password')}
            placeholder="••••••••"
          />

          <Input
            label="Confirmar Senha"
            type="password"
            required
            value={formData.password2}
            onChange={handleChange('password2')}
            placeholder="••••••••"
          />

          <Button
            type="submit"
            isLoading={isLoading}
            style={{ width: '100%' }}
            variant="primary"
          >
            Cadastrar
          </Button>
        </form>

        <div style={styles.footer}>
          Já tem uma conta?{' '}
          <Link to="/login" style={styles.link}>
            Faça login
          </Link>
        </div>
      </div>
    </div>
  );
};

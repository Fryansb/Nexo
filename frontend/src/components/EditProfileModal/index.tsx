import { useState, memo, useCallback, type FC, type FormEvent, type ChangeEvent } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../stores/authStore';
import { isValidEmail } from '../../utils/helpers';
import { styles } from './styles';
import type { User } from '../../types';

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
};

/**
 * Modal for editing user profile information
 */
export const EditProfileModal: FC<EditProfileModalProps> = memo(({ isOpen, onClose, user }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    email: user.email || '',
    bio: user.bio || '',
  });

  const handleChange = useCallback((field: keyof typeof formData) => {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    // Validate required fields
    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      toast.error('Nome e sobrenome são obrigatórios');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user data
      const updatedUser: User = {
        ...user,
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        bio: formData.bio.trim(),
      };

      setUser(updatedUser);
      toast.success('Perfil atualizado com sucesso!');
      onClose();
    } catch (error) {
      toast.error('Erro ao atualizar perfil');
    } finally {
      setIsLoading(false);
    }
  }, [formData, user, setUser, onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div style={styles.backdrop} onClick={handleBackdropClick}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Editar Perfil</h2>
          <button
            type="button"
            style={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nome</label>
              <input
                type="text"
                value={formData.first_name}
                onChange={handleChange('first_name')}
                style={styles.input}
                placeholder="Seu nome"
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Sobrenome</label>
              <input
                type="text"
                value={formData.last_name}
                onChange={handleChange('last_name')}
                style={styles.input}
                placeholder="Seu sobrenome"
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              style={styles.input}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Bio</label>
            <textarea
              value={formData.bio}
              onChange={handleChange('bio')}
              style={styles.textarea}
              placeholder="Conte um pouco sobre você..."
              rows={4}
              maxLength={160}
            />
            <div style={styles.charCount}>
              {formData.bio.length}/160
            </div>
          </div>

          <div style={styles.buttons}>
            <button
              type="button"
              onClick={onClose}
              style={styles.cancelButton}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                ...styles.saveButton,
                ...(isLoading ? styles.saveButtonDisabled : {}),
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

EditProfileModal.displayName = 'EditProfileModal';
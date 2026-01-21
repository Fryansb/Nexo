import { useState, memo, useCallback, useMemo, type FC, type FormEvent, type ChangeEvent } from 'react';
import { validatePostContent } from '../../utils/helpers';
import { styles } from './styles';

type CreatePostFormProps = {
  userInitials?: string;
  onSubmit: (content: string) => void;
};

/**
 * CreatePostForm component for creating new posts
 * Memoized to prevent unnecessary re-renders
 */
export const CreatePostForm: FC<CreatePostFormProps> = memo(({ userInitials = 'U', onSubmit }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string>();

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    
    const validation = validatePostContent(content);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    
    setError(undefined);
    onSubmit(content.trim());
    setContent('');
  }, [content, onSubmit]);

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    // Clear error when user starts typing
    if (error) {
      setError(undefined);
    }
  }, [error]);

  const isDisabled = useMemo(() => !content.trim(), [content]);

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <div style={styles.header}>
          <div style={styles.avatar}>{userInitials}</div>
          <textarea
            value={content}
            onChange={handleChange}
            placeholder="No que você está pensando?"
            style={styles.textarea}
            aria-label="Post content"
            maxLength={280}
          />
        </div>
        {error && (
          <div style={{ color: '#dc2626', fontSize: '14px', marginTop: '8px' }}>
            {error}
          </div>
        )}
        <div style={styles.footer}>
          <button type="button" style={styles.imageButton}>
            <span>🖼️</span>
            <span>Imagem</span>
          </button>
          <button
            type="submit"
            style={{
              ...styles.submitButton,
              ...(isDisabled ? styles.submitButtonDisabled : {}),
            }}
            disabled={isDisabled}
            aria-label="Submit post"
          >
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
});

CreatePostForm.displayName = 'CreatePostForm';

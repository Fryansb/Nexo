import { memo, useMemo, type FC } from 'react';
import type { Post } from '../../types';
import { formatRelativeTime } from '../../utils/helpers';
import { styles } from './styles';

type PostCardProps = {
  post: Post;
  onLike?: () => void;
  onComment?: () => void;
};

/**
 * PostCard component displays a single post with author info, content, and actions
 * Memoized to prevent unnecessary re-renders
 */
export const PostCard: FC<PostCardProps> = memo(({ post, onLike, onComment }) => {
  // Memoize initials calculation
  const initials = useMemo(() => {
    const first = post.author.first_name?.[0] || '';
    const last = post.author.last_name?.[0] || '';
    return (first + last).toUpperCase() || 'U';
  }, [post.author.first_name, post.author.last_name]);

  // Memoize formatted time
  const formattedTime = useMemo(
    () => formatRelativeTime(post.created_at),
    [post.created_at]
  );

  return (
    <div style={styles.card}>
      {/* Header with author info */}
      <div style={styles.header}>
        <div style={styles.avatar}>{initials}</div>
        <div style={styles.authorInfo}>
          <div style={styles.authorName}>
            {post.author.first_name} {post.author.last_name}
          </div>
          <div style={styles.username}>@{post.author.username}</div>
        </div>
        <div style={styles.timestamp}>{formattedTime}</div>
      </div>

      {/* Post content */}
      <div style={styles.content}>{post.content}</div>

      {/* Post image if exists */}
      {post.image && <img src={post.image} alt="Post" style={styles.image} />}

      {/* Actions: like and comment */}
      <div style={styles.actions}>
        <button
          style={{
            ...styles.actionButton,
            ...(post.is_liked ? styles.actionButtonActive : {}),
          }}
          onClick={onLike}
          aria-label={post.is_liked ? 'Unlike post' : 'Like post'}
        >
          <span>{post.is_liked ? '❤️' : '🤍'}</span>
          <span>{post.likes_count}</span>
        </button>
        <button
          style={styles.actionButton}
          onClick={onComment}
          aria-label="Comment on post"
        >
          <span>💬</span>
          <span>{post.comments_count}</span>
        </button>
      </div>
    </div>
  );
});

PostCard.displayName = 'PostCard';

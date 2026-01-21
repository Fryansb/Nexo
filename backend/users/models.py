from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import F
from PIL import Image


class CustomUser(AbstractUser):
    """
    Custom user model extending Django's AbstractUser.
    
    Adds social network specific fields like bio, profile picture,
    and follower counts for better performance.
    """
    
    # Profile fields
    bio = models.TextField(
        max_length=160, 
        blank=True, 
        help_text="Short biography (max 160 characters)"
    )
    
    profile_picture = models.ImageField(
        upload_to='profile_pictures/',
        blank=True,
        null=True,
        help_text="Profile picture image"
    )
    
    # Social counters (denormalized for performance)
    followers_count = models.PositiveIntegerField(
        default=0,
        help_text="Number of followers (cached for performance)"
    )
    
    following_count = models.PositiveIntegerField(
        default=0,
        help_text="Number of users being followed (cached for performance)"
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        
    def __str__(self):
        return f"@{self.username} ({self.get_full_name() or self.email})"
    
    def save(self, *args, **kwargs):
        """Override save to resize profile pictures."""
        super().save(*args, **kwargs)
        
        # Resize profile picture if it exists
        if self.profile_picture:
            self._resize_profile_picture()
    
    def _resize_profile_picture(self):
        """Resize profile picture to 300x300 pixels."""
        try:
            with Image.open(self.profile_picture.path) as img:
                if img.height > 300 or img.width > 300:
                    img.thumbnail((300, 300), Image.Resampling.LANCZOS)
                    img.save(self.profile_picture.path, optimize=True, quality=85)
        except Exception:
            # Fail silently if image processing fails
            pass
    
    @property
    def full_name(self):
        """Return full name or username as fallback."""
        return self.get_full_name() or self.username


class Follow(models.Model):
    """
    Model to represent follow relationships between users.
    
    Uses a through model for the many-to-many relationship
    to enable additional fields like created_at.
    """
    
    follower = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='following_set',
        help_text="User who is following"
    )
    
    following = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='followers_set',
        help_text="User being followed"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'user_follows'
        unique_together = ('follower', 'following')
        verbose_name = 'Follow'
        verbose_name_plural = 'Follows'
        
    def __str__(self):
        return f"{self.follower.username} follows {self.following.username}"
    
    def save(self, *args, **kwargs):
        """Update follower counts when creating follow relationship."""
        is_new = self.pk is None
        super().save(*args, **kwargs)
        
        if is_new:
            # Use F() expressions for atomic counter updates
            CustomUser.objects.filter(pk=self.follower.pk).update(
                following_count=F('following_count') + 1
            )
            CustomUser.objects.filter(pk=self.following.pk).update(
                followers_count=F('followers_count') + 1
            )
    
    def delete(self, *args, **kwargs):
        """Update follower counts when deleting follow relationship."""
        follower_id = self.follower_id
        following_id = self.following_id
        
        super().delete(*args, **kwargs)
        
        # Use F() expressions for atomic counter updates
        CustomUser.objects.filter(pk=follower_id).update(
            following_count=F('following_count') - 1
        )
        CustomUser.objects.filter(pk=following_id).update(
            followers_count=F('followers_count') - 1
        )

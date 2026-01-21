from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.html import format_html
from .models import CustomUser, Follow


@admin.register(CustomUser)
class CustomUserAdmin(BaseUserAdmin):
    """Custom admin for CustomUser model."""
    
    list_display = [
        'username', 
        'email', 
        'full_name', 
        'followers_count', 
        'following_count',
        'profile_image_preview',
        'is_staff', 
        'is_active',
        'date_joined'
    ]
    
    list_filter = [
        'is_staff', 
        'is_active', 
        'is_superuser',
        'date_joined'
    ]
    
    search_fields = ['username', 'email', 'first_name', 'last_name']
    
    readonly_fields = [
        'date_joined', 
        'last_login', 
        'created_at', 
        'updated_at',
        'followers_count',
        'following_count',
        'profile_image_preview'
    ]
    
    # Add custom fields to the fieldsets
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Social Profile', {
            'fields': (
                'bio',
                'profile_picture', 
                'profile_image_preview',
                ('followers_count', 'following_count')
            )
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    
    # Fields for add user form
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Profile Information', {
            'fields': ('email', 'first_name', 'last_name', 'bio')
        }),
    )
    
    def profile_image_preview(self, obj):
        """Show profile image preview in admin."""
        if obj.profile_picture:
            return format_html(
                '<img src="{}" width="50" height="50" style="border-radius: 50%;" />',
                obj.profile_picture.url
            )
        return "No image"
    profile_image_preview.short_description = "Profile Preview"


@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    """Admin for Follow model."""
    
    list_display = ['follower', 'following', 'created_at']
    list_filter = ['created_at']
    search_fields = ['follower__username', 'following__username']
    raw_id_fields = ['follower', 'following']
    
    def get_queryset(self, request):
        """Optimize queryset with select_related."""
        return super().get_queryset(request).select_related('follower', 'following')

from django.apps import AppConfig


class UsersConfig(AppConfig):
    """Configuration for the users app."""
    
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    verbose_name = 'Users'
    
    def ready(self):
        """Import signals when the app is ready."""
        # Import signals here if needed in the future
        pass

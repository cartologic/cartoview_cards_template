from django.db import models
from cartoview.app_manager.models import App


class SelectedApp(models.Model):
    app = models.OneToOneField(App, null=True, blank=True)

    def __unicode__(self):
        return unicode(self.app)

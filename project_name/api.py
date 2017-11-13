from .models import SelectedApp
# from tastypie import fields
from tastypie.resources import ModelResource, ALL_WITH_RELATIONS, ALL


class SelectedAppResource(ModelResource):
    class Meta:
        queryset = SelectedApp.objects.all()
        resource_name = 'selected_app'
        allowed_methods = ['get']
        filtering = {
            'SelectedApp': ALL_WITH_RELATIONS,
        }

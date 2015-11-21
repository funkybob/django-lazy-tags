
from django.db import models

from lazy_tags import fields, managers


class TestModel(models.Model):
    tags = fields.TagField()

    objects = managers.TagQuerySet.as_manager()

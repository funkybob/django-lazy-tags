from django import forms


class AdminTagWidget(forms.TextInput):
    @property
    def media(self):
        return forms.Media(
            js=['admin/js/array-tag.js'],
            css={
                'screen': ['admin/css/array-tag.css'],
            }
        )

    def __init__(self, attrs=None):
        final_attrs = {'class': 'array-tag'}
        if attrs:
            final_attrs.update(attrs)
        super(AdminTagWidget, self).__init__(final_attrs)

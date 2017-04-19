(function($) {
    'use strict';
    const DELIMITER = ',';

    function split_tags(value) {
        return value.split(DELIMITER).map(x => x.trim()).filter(Boolean);
    }

    var ArrayTag = function(el) {
        var self = this;
        this.$orig = $(el);
        this.values = new Set(split_tags(this.$orig.val()));

        this.$orig.closest('form').on('submit', function () {
            // IE 11 unfriendly
            self.$orig.val(Array.from(self.values).join(', '));
        })

        // Augment html
        // hide real input
        this.$orig.hide();
        // add our input + wrapper div + tag div
        this.$orig.wrap('<div class="tag-input"></div>');
        this.$el = this.$orig.parent();
        this.$el.append(
            '<input type="text" class="tag-input">' +
            ' <a class="button add-tag" title="Add tag">Add</a>' +
            '<p class="tags"></p>'
        );
        this.$inp = this.$el.find('input.tag-input');

        this.$el.on('click', 'a.add-tag', function (ev) {
            var value = self.$inp.val().trim();
            self.$inp.val('');
            if(value) {
                self.values.add(value);
                self.render_tags();
            }
        });

        this.$el.on('click', '.tags a', function (ev) {
          var val = $(this).parent().text().trim();
          self.values.delete(val);
          self.render_tags();
        });

        this.render_tags();
    };

    ArrayTag.prototype.render_tags =   function () {
        this.$el.find('.tags').html(
            Array.from(this.values)
                .map((val) => {return '<span>' + val + '<a href="#"></a></span>'})
                .join(' ')
        );
    }

    window.ArrayTag = ArrayTag;

    addEvent(window, 'load', function(e) {
        $('.array-tag').each(function () {
            new ArrayTag(this);
        })
    });
})(django.jQuery);

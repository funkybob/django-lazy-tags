(function($) {
    'use strict';
    var DELIMITER = ',';

    function split_tags(value) {
      return value.split(DELIMITER).map((x) => x.trim()).filter(Boolean);
    }

    var ArrayTag = function(el) {
        this.$orig = $(el);
        this.values = new Set(split_tags(this.$orig.val()));

        this.$orig.closest('form').on('submit', () => {
            // IE 11 unfriendly
            this.$orig.val(Array.from(this.values).join(', '));
        });

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

        this.$el.on('click', 'a.add-tag', () => {
            split_tags(this.$inp.val()).forEach((val) => this.values.add(val));
            this.$inp.val('');
            this.render_tags();
        });

        this.$el.on('click', '.tags a', (ev) => {
          var val = $(ev.target).parent().text().trim();
          this.values.delete(val);
          this.render_tags();
        });

        this.render_tags();
    };

    ArrayTag.prototype.render_tags = function () {
        this.$el.find('.tags').html(
            Array.from(this.values)
                .sort()
                .map(function (val) {return '<span>' + val + '<a href="#"></a></span>';})
                .join(' ')
        );
    };

    window.ArrayTag = ArrayTag;

    addEvent(window, 'load', function(e) {
        $('.array-tag').each(function () {
            new ArrayTag(this);
        });
    });
})(django.jQuery);

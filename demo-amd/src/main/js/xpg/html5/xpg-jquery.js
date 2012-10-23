define(['xpg/html5/util/Settings', 'order!moment', 'order!jQuery',
    'order!jQuery_validate', 'order!jQuery_validate_additional',
    'order!jQuery_ui', 'order!jQuery_address'], function (Settings) {

    $.datepicker.setDefaults($.datepicker.regional['nl']);

    $.datepicker.setDefaults({
        dateFormat:'dd-mm-yy',
        autoSize:true,
        showOn:'button',
        buttonImage:'images/calendar.gif',
        buttonImageOnly:true,
        showOtherMonths:true,
        showWeek:true,
        changeMonth:true,
        changeYear:true
    });

    var originalRemoveAttr = $.fn.removeAttr;
    var originalAttr = $.fn.attr;
    var originalVal = $.fn.val;

    $.fn.removeAttr = function () {
        if (arguments) {
            if ($(this).hasClass('datepicker') && arguments[0] == 'disabled') {
                $(this).datepicker("enable");
            }

            return originalRemoveAttr.apply(this, arguments);
        }
    };

    $.fn.attr = function () {
        if (arguments) {
            if ($(this).hasClass('datepicker') && arguments[0] == 'disabled') {
                $(this).datepicker("disable");
            }

            return originalAttr.apply(this, arguments);
        }
    };

    $.fn.val = function(value) {
        var originalValue = originalVal.apply(this, arguments);

        if (!arguments.length && originalValue === Settings.defaultSelectOptionValue) {
            originalValue = "";
        }

        return originalValue;
    };

    return $;
});

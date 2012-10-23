define(["xpg/html5/xpg-jquery", "xpg/html5/util/Settings", "xpg/html5/util/Converter"], function($, Settings, Converter) {
    function Validator() {};

    Validator.validateFirstDateGreaterThanSecondDate = function(firstDate, secondDate) {
        var isValid = true;

        if (firstDate instanceof Date && secondDate instanceof Date) {
            if (firstDate.getTime() < secondDate.getTime()) {
                isValid = false;
            }
        }

        return isValid;
    };

    Validator.validateDate = function(dateString) {
        var isValid = true;

        if (dateString != '') {
            try {
                Converter.parseFormattedDate(dateString);
            } catch (e) {
                isValid = false;
            }
        }

        return isValid;
    };
    
    $.validator.addMethod("date", function(value, element) {
        return Validator.validateDate(value);
    }, "Ongeldige datum ingevoerd (DD-MM-JJJJ)");
	
    $.validator.addMethod("dateBefore", function(value, element, secondDateSelector) {
        var isValid = true;
        var secondDate = null;

        if ($.trim(secondDateSelector) != '') {
            if ($(secondDateSelector).length > 0) {
                secondDate = Converter.parseFormattedDate($(secondDateSelector).val());
            } else {
                // SecondDateSelector is not a jQuery selector, try to parse date
                secondDate = Converter.parseISODateString(secondDateSelector);
            }
        }

        if ($.trim(value) != '' && secondDate != null) {
            var firstDate = Converter.parseFormattedDate(value);
            isValid = Validator.validateFirstDateGreaterThanSecondDate(secondDate, firstDate);
        }

        return isValid;
    }, "The given date is not set before the selected date");

    $.validator.addMethod("dateAfter", function(value, element, secondDateSelector) {
        var isValid = true;
        var secondDate = null;

        if ($.trim(secondDateSelector) != '') {
            if ($(secondDateSelector).length > 0) {
                secondDate = Converter.parseFormattedDate($(secondDateSelector).val());
            } else {
                // SecondDateSelector is not a jQuery selector, try to parse date
                secondDate = Converter.parseISODateString(secondDateSelector);
            }
        }

        if ($.trim(value) != '' && secondDate != null) {
            var firstDate = Converter.parseFormattedDate(value);
            isValid = Validator.validateFirstDateGreaterThanSecondDate(firstDate, secondDate);
        }


        return isValid;
    }, "The given date is not set after the selected date");

    // Override de default required validatie, zodat ook rekening wordt gehouden met Settings.defaultSelectOptionValue in
    // geval van een select veld.
    var defaultRequiredFunction = $.validator.methods['required'];
    $.validator.methods['required'] = function(value, element, params) {
        switch( element.nodeName.toLowerCase() ) {
            case 'select':
                var val = $(element).val();
                return val && (val.length > 0 && val != Settings.defaultSelectOptionValue);
            default:
                return defaultRequiredFunction.call($.validator.prototype, value, element, params);
        }
    }

    $.extend($.validator.messages, {
        required: "Dit veld is verplicht"
    });

    $.validator.setDefaults({
        errorPlacement: function(error, element) {
            if (element.hasClass('datepicker')) {
                error.insertAfter(element.next());
            } else {
                error.insertAfter(element);
            }
        }
    });

    return Validator;
});
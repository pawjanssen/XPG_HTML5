define(["xpg/html5/util/Settings", "xpg/html5/xpg-jquery"], function(Settings, $) {
    function Converter() {}

    var ISO_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';

    /**
     * Converteerd (formatteerd) een datum zodat deze getoond kan worden op het scherm.
     *
     * @param {Date} dateValue - Een javascript Date object om te formatteren als String.
     * @return {string} - Het Date object geformateerd als String in de vorm zoals in het Settings object gedefinieerd.
     */
    Converter.formatDate = function(dateValue) {
        var formattedDate = dateValue;
        if (dateValue instanceof Date) {
            formattedDate = $.datepicker.formatDate(Settings.dateFormat, dateValue);
        }

        return formattedDate;
    };

    Converter.parseFormattedDate = function(formattedDate) {
        return $.datepicker.parseDate(Settings.dateFormat, formattedDate);
    };

    Converter.formatISODateString = function(isoDate) {
        var date = Converter.parseISODateString(isoDate);
        return Converter.formatDate(date);
    };

    Converter.toISODateString = function(dateObject) {
        var isoString = '';

        if (dateObject instanceof Date) {
            isoString = moment(dateObject).format(ISO_DATE_FORMAT);
        }

        return isoString;
    };

    Converter.parseISODateString = function(isoDate) {
        var date = moment(isoDate, ISO_DATE_FORMAT).native();
        return date;
    };

    /**
     * Converts a jQuery param array (array with objects containing name/value properties) and converts it to
     * an object with name properties containing value. Does essentially the opposite of jQuery.param()
     *
     * @param paramArray - The jQuery parameter array to convert to an object.
     */
    Converter.convertParamArrayToObject = function(paramArray) {
        var convertedObject = {};

        $.each(paramArray, function(index){
            convertedObject[paramArray[index].name] = paramArray[index].value;
        });

        return convertedObject;
    };


    return Converter;
});
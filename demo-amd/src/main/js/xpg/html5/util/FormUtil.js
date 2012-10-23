define(["xpg/html5/util/LogUtil", 'xpg/html5/xpg-jquery', "xpg/html5/util/Settings", "xpg/html5/util/Validator"], function (LogUtil, $, Settings, Validator) {

    function FormUtil() {
    }

    /**
     * Formateerd de verplichte formulier velden. In de templates kunnen verplichtte formulier velden worden aangegeven met de CSS klasse
     * "required". Deze methode zorgt dat er bij die velden een sterretje achter het tekstlabel komt te staan, ter indicatie aan de gebruiker.
     */
    FormUtil.formatRequiredFields = function (formContainer) {
        // Labels van velden die required zijn dienen een * achter de tekst te krijgen.
        $(":input.required", formContainer).each(function () {
            var requiredLabel = $("label[for='" + $(this).attr("name") + "']", formContainer);

            if (requiredLabel) {
                requiredLabel.text(requiredLabel.text() + " *");
            }
        });
    };

    FormUtil.formatSelectFields = function(formContainer) {
        $("select", formContainer).each(function() {
            $("<option></option>")
                .attr("value", Settings.defaultSelectOptionValue)
                .text(Settings.defaultSelectOptionText)
                .appendTo(this);
        });
    };

    FormUtil.sortSelectFieldsAlphabetically = function(selectSelector) {
        $("option", selectSelector).sort(function(optionA, optionB){
            if ($(optionA).attr("value") == Settings.defaultSelectOptionValue) {
                return -1;
            } else if ($(optionB).attr("value") == Settings.defaultSelectOptionValue) {
                return 1;
            }

            if ($(optionA).text().toUpperCase() > $(optionB).text().toUpperCase()) {
                return 1;
            } else if ($(optionA).text().toUpperCase() < $(optionB).text().toUpperCase()) {
                return -1;
            } else {
                return 0;
            }
        }).appendTo(selectSelector);
    }

    FormUtil.clearField = function(selector) {
        var element = $(selector);

        if (element && element[0]) {
            if (element[0].tagName && element[0].tagName.toLowerCase() === "select") {
                $("option:not(option[value='" + Settings.defaultSelectOptionValue + "'])", element).remove();
            }
        }
    };

    /**
     * Activeerd de datumprikkers voor input velden op het formulier waarbij de css klasse "date" is gespecificeerd in het template. De dataumprikker
     * zorgt voor het weergeven van een kalender waardoor er makkelijk een datum getoond kan worden.
     */
    FormUtil.enableDatePickers = function (formContainer) {
        $(":input.datepicker", formContainer).each(function () {
            $(this).datepicker();

            if ($(this).is(":disabled")) {
                $(this).datepicker("disable");
            }

            $(this).change(function() {
            	try {
            		//$(this).val($.datepicker.formatDate(Settings.dateFormat, $.datepicker.parseDate(Settings.dateFormat, $(this).val())));
            	} catch (e) { /* parse exception, datum is niet valide, wordt echter afgehandeld door form validation */ }
            });
        });
    };

    FormUtil.hideElements = function(formContainer) {
        $(".hidden", formContainer).each(function() {
           if ($(this).hasClass("date")) {
               FormUtil.hideDatePicker(this);
           } else {
               $(this).hide();
           }
        });
    };

    FormUtil.hideDatePicker = function(datepickerElement) {
        $(datepickerElement).hide();
        // Next siblingi is the button image, we also want to hide that.
        $(datepickerElement).next().hide();
    };

    FormUtil.showDatePicker = function(datepickerElement) {
        $(datepickerElement).show();
        // Next sibling is the button image, whe also want to show that.
        $(datepickerElement).next().show();
    };

    FormUtil.cleanUpFormCss = function(formContainer) {
        $("form.applicatieForm fieldset.subset", formContainer).parent().addClass('autoheight');
    };

    FormUtil.beautifyButtons = function(formContainer) {
        $("input[type='button'], input[type='reset'], button", formContainer).each(function(){
            $(this).button();

           if ($(this).attr("icon")) {
               $(this).button("option", "icons", {
                   primary: $(this).attr("icon")
               });
           }
        });
    };

    FormUtil.enableForm = function(formContainer) {
    	FormUtil.enableDatePickers(formContainer);
    	FormUtil.formatSelectFields(formContainer);
    	FormUtil.formatRequiredFields(formContainer);
        FormUtil.hideElements(formContainer);
        FormUtil.cleanUpFormCss(formContainer);
        FormUtil.beautifyButtons(formContainer);

        $(formContainer).attr("onsubmit", "return false;");
    };

    return FormUtil;
});
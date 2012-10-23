/**
 * Deze file definieerd de errorhandlers die middels ajax kunnen worden gebruikt voor globale foutafhandeling
 * (zie initajax.js)
 */
define(["xpg/html5/util/LogUtil", "xpg/html5/xpg-jquery"], function(LogUtil, $) {

    var log = LogUtil.createLogger("ErrorHandlers");

	function ErrorHandlers() {}
	
	/**
     * Methode die wordt uitgevoerd indien de server (na een ajax request) aangeeft dat het object niet kon
     * worden gevonden.
     */
    ErrorHandlers.objectNotFoundError = function() {
        $("#messageDialog")
            .text("Het opgevraagde item kon niet worden gevonden")
            .dialog({
                modal: true
            });
    };

    /**
     * Methode die wordt uitgevoerd indien de server (na een ajax request) aangeeft dat het object niet kon
     * worden gevonden.
     */
    ErrorHandlers.internalServerError = function() {
        var modalText = "Er is een fout opgetreden op de server.";

        if (log.getLevel().name == "DEBUG") {
            log.debug(arguments[0].statusText);
            modalText += "<br /> <hr />" + arguments[0].statusText;
        }

        $("#messageDialog")
            .html(modalText)
            .dialog({
                modal: true
            });
    };
	
	return ErrorHandlers;
});
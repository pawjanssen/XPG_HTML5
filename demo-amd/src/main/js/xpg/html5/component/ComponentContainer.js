define(["xpg/html5/xpg-jquery"], function($) {
	/**
	 * Algemene component container te gebruiken om viewtemplates in te laden. De componentcontainer zorgt
	 * ervoor dat de componenten en views op de juiste plek op het scherm worden getoond. 
	 */
	function ComponentContainer() {
		var containerElement = $("#componentContainer");
        var infoMessageElement = $("#infoMessageContainer");

		/**
		 * Leegt de ingeladen componenten/views van het scherm.
		 */
		this.empty = function() {
			containerElement.empty();
		};
		
		/**
		 * Voegt het gegeven html element of jquery element toe aan de viewlocatie op het scherm.
		 * 
		 * @param {element} - Het element om toe te voegen.
		 */
		this.addElement = function(element) {
			containerElement.append(element);
		};
		
		/**
		 * Laad het gegeven template in en notificeert middels de gegeven callback indien dit gebeurd is. Indien
		 * een template wordt ingeladen, dan zal het vorige ingeladen template (indien van toepassing) automatisch
		 * van het scherm verwijderd worden. Een template wordt dus nooit toegevoegd aan de viewlocatie op het scherm,
		 * maar vervangen.
		 * 
		 * @param {templateLocation} - Template om in te laden (incl locatie relatief aan de template directory)
		 * @param {callback} - Callback die uitgevoerd wordt indien het template op het scherm is ingeladen.
		 */
		this.setTemplate = function(templateLocation, callback) {
			containerElement.load("templates/" + templateLocation, callback);
		};

        /**
         * Zet een informatiebericht op de pagina neer. Dient gebruikt te worden om een gebruiker te informeren.
         *
         * @param {string} message - Het bericht wat getoond moet worden, of null als het bericht bovenin verwijderd dient te worden.
         */
        this.setInfoMessage = function(message) {
            if (message != null) {
                $("span.infoText", infoMessageElement).text(message);
                infoMessageElement.show();
            } else {
                $("span.infoText", infoMessageElement).text("");
                infoMessageElement.hide();
            }
        }
	}
	
	var componentContainerInstance = new ComponentContainer();
	
	return {
		'object': ComponentContainer,
		'instance': componentContainerInstance
	};
});
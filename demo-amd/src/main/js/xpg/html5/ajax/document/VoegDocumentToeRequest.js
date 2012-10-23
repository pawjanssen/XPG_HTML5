define(["xpg/html5/ajax/GenericRequest"], function(GenericRequest) {
	
	/**
	 * Ajax request dat gebruikt kan worden om documenten op te halen van de server. Voert de successCallback uit
	 * indien het request is voltooid, en geeft daaraan als parameter de besluittype data mee.
	 *
     * @param {object} data - Data om met het request mee te sturen
	 * @param {function} successCallback - Uit te voeren callback indien de documenten zijn opgehaald. De documenten worden
	 * 										aan deze callback meegegeven.
	 * @param {function} errorCallback - Uit te voeren callbcak indien de documenten niet konden worden opgehaald.
	 */
	function VoegDocumentToeRequest(document, successCallback, errorCallback) {
		this.httpMethod = "PUT";
		this.resource = "document/" + document.id;
		this.successCallback = successCallback;
		this.errorCallback = errorCallback;
        this.data = JSON.stringify(document);
	}

    VoegDocumentToeRequest.prototype = new GenericRequest();
    VoegDocumentToeRequest.prototype.constructor = VoegDocumentToeRequest;
	
	return VoegDocumentToeRequest;
});
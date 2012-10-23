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
	function OphalenDocumentenRequest(successCallback, errorCallback) {
		this.httpMethod = "GET";
		this.resource = "documenten";
		this.successCallback = successCallback;
		this.errorCallback = errorCallback;
	}

    OphalenDocumentenRequest.prototype = new GenericRequest();
    OphalenDocumentenRequest.prototype.constructor = OphalenDocumentenRequest;
	
	return OphalenDocumentenRequest;
});
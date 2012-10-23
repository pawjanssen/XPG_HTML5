define(["xpg/html5/xpg-jquery"], function($) {
	
	/**
	 * Generiek request, te gebruiken als bouwblok om andere requests van te prototypen. Definieert
	 * welke http methode en resource (REST) aangeroepen dient te worden, en converteerd de meegegeven data
	 * naar een JSON string, waarna deze vervolgens verstuurd wordt.
	 * Het is tevens mogelijk success- en failfuncties mee te geven, die aangeroepen worden (callback) wanneer
	 * het ajax request successvol danwel onsuccessvol zijn verlopen.
	 * 
	 * @param {string} httpMethod - HTTP methode om aan te roepen (GET, POST, PUT, DELETE)
	 * @param {string} resource - De http server resource om aan te roepen, relatief vanaf de REST service server.
	 * @param {jsObject} data - Javascript object dat geJSONified wordt verstuurd met het request.
	 * @param {function} successCallback - Success callback die uitgevoerd wordt indien het ajaxrequest successvol is uitgevoerd.
	 * @param {function} errorCallback - Error callback die uitgevoerd wordt indien het ajaxrequest onsuccessvol is uitgevoerd.
	 */
	function GenericRequest(httpMethod, resource, data, successCallback, errorCallback) {
		this.httpMethod = httpMethod;
		this.resource = resource;
		this.data = data;
		this.successCallback = successCallback;
		this.errorCallback = errorCallback;
	}
	
	/**
	 * @param {function} callback - Setter functie voor de success callback, die uitgevoerd wordt indien het ajaxrequest
	 * 									successvol is verlopen.
	 */
	GenericRequest.prototype.setSuccessCallback = function(callback) {
		this.successCallback = callback;
	}

	/**
	 * @param {function} callback - Setter functie voor de error callback, die uitgevoerd wordt indien het ajaxrequest
	 * 									onsuccessvol is verlopen.
	 */
	GenericRequest.prototype.setErrorCallback = function(callback) {
		this.errorCallback = callback;
	};

	/**
	 * Voert het ajax request uit, waarbij alle in het request object meegegeven parameters op het request worden gezet.
	 */
	GenericRequest.prototype.performRequest = function() {
		$.ajax({
		  url: "/server/rest/dms/" + this.resource,
		  type: this.httpMethod,
          dataType: "json",
          contentType: 'application/json',
		  data: this.data,
		  success: this.successCallback,
		  error: this.errorCallback
		});
	}
	
	return GenericRequest;
});
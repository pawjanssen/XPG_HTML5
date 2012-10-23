define(["xpg/html5/util/LogUtil", "xpg/html5/xpg-jquery", "xpg/html5/ajax/ErrorHandlers"],
		function(LogUtil, $, ErrorHandlers) {
	
	/**
	 * Initialize methode om binnen de applicatie html5 client project ajax te initialiseren.
	 * Zet de globale ajax error afhandeling a.d.v. http status codes.
	 * Zet een ajax loader neer, die weergegeven wordt wanneer er ajax requests bezig zijn.
	 */
	function initialize() {
		this.log = LogUtil.createLogger("initialize");
		this.log.info("Initializing default ajax settings");
		
		$.ajaxSetup({
			statusCode: {
				404: ErrorHandlers.objectNotFoundError,
                400: ErrorHandlers.internalServerError,
                500: ErrorHandlers.internalServerError
			}
		});
		
		$("#ajaxLoader").ajaxStart(function() {
			$(this).css("display", "inline");
		});
		
		$("#ajaxLoader").ajaxStop(function() {
			$(this).css("display", "none");
		});
		
		this.log.info("Initialized default ajax settings");
	}
	
	return {
		initialize: initialize
	};
});

define(["xpg/html5//util/LogUtil", "xpg/html5/Model", "xpg/html5/ajax/document/OphalenDocumentenRequest"],
    function(LogUtil, Model, OphalenDocumentenRequest) {

        /**
         * Client side statusTypeService, verantwoordelijk voor het communiceren met de server
         * om statustypes op te halen. Aan de client kant het aanspreekpunt om te werken met zaken.
         *
         * Zorgt voor updaten van model en caching waar nodig (@todo afterpoc).
         */
        function DocumentService() {
            this.model = Model.instance;
            this.log = LogUtil.createLogger("DocumentService");
        };

        /**
         * Haalt de actieve zaaktypes op van de server.
         *
         * @param {function} onRetrieveCompleteCallback - Callback function om aan te roepen als het ophalen van actieve statustypes voltooid is.
         */
        DocumentService.prototype.getAllDocumenten = function(onRetrieveCompleteCallback) {
            this.log.info("Ophalen van documenten");

            var self = this;
            var ophalenDocumentenRequest = new OphalenDocumentenRequest(function(data) {
                self.model.documenten = data;

                if (onRetrieveCompleteCallback) {
                    onRetrieveCompleteCallback();
                }
            });

            ophalenDocumentenRequest.performRequest();
        };

        var documentServiceInstance = new DocumentService();

        return {
            'object': DocumentService,
            'instance': documentServiceInstance
        };
    });
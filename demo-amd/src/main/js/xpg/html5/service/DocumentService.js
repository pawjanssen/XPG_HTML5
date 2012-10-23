define(["xpg/html5//util/LogUtil", "xpg/html5/Model", "xpg/html5/ajax/document/OphalenDocumentenRequest",
        "xpg/html5/ajax/document/VoegDocumentToeRequest"],
    function(LogUtil, Model, OphalenDocumentenRequest, VoegDocumentToeRequest) {

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
         * Haalt de documenten op van de server.
         *
         * @param {function} onRetrieveCompleteCallback - Callback function om aan te roepen als het ophalen van documenten voltooid is.
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

        DocumentService.prototype.voegDocumentToe = function(document, onCompleteCallback) {
            if (document != undefined) {
                this.log.info("Het document wordt toegevoegd");

                var self = this;
                var voegDocumentToeRequest = new VoegDocumentToeRequest(document.id, document, function() {
                    self.getAllDocumenten(onCompleteCallback);
                });

                voegDocumentToeRequest.performRequest();
            } else {
                this.log.info("Document om toe te voegen niet meegegeven");
            }
        };

        var documentServiceInstance = new DocumentService();

        return {
            'object': DocumentService,
            'instance': documentServiceInstance
        };

    });


var model = (function() {
    function Model() {
        this.documenten = undefined;
    }

    var modelInstance = new Model();
    return {
        'object': Model,
        'instance': modelInstance
    };
})();

var documentService = (
    function($, Model) {

        /**
         * Client side DocumentService, verantwoordelijk voor het communiceren met de server
         * om document op te halen. Aan de client kant het aanspreekpunt om te werken met documenten.
         */
        function DocumentService() {
            this.model = Model.instance;
        };

        /**
         * Haalt de documenten op van de server.
         *
         * @param {function} onRetrieveCompleteCallback - Callback function om aan te roepen als het ophalen van documenten voltooid is.
         */
        DocumentService.prototype.getAllDocumenten = function(onRetrieveCompleteCallback) {

            var self = this;

            $.ajax({
                url: "/server/rest/dms/documenten",
                type: "GET",
                dataType: "json",
                contentType: 'application/json',
                success: function(data) {
                    self.model.documenten = data;

                    if (onRetrieveCompleteCallback) {
                        onRetrieveCompleteCallback();
                    }
                }
            });
        };

        DocumentService.prototype.voegDocumentToe = function(document, onCompleteCallback) {
            if (document != undefined) {

                var self = this;

                $.ajax({
                    url: "/server/rest/dms/document/" + document.id,
                    type: "PUT",
                    dataType: "json",
                    data: JSON.stringify(document),
                    contentType: 'application/json',
                    success: function(data) {
                        self.getAllDocumenten(onCompleteCallback);
                    }
                });
            }
        };

        var documentServiceInstance = new DocumentService();

        return {
            'object': DocumentService,
            'instance': documentServiceInstance
        };

    })($, model);

var documentOverzichtView = (
    function ($, Model) {

        function DocumentOverzichtView(documentOverzichtController) {
            this.controller = documentOverzichtController;
            var self = this;
            this.formContainer = undefined;

            /**
             * Zorgt ervoor dat het juiste template geladen wordt en intialiseert het scherm. Zet click listeners
             * e.d. op knoppen koppelt deze aan de juiste view methoden.
             *
             * @param {function} onSchermInitializedCallback- Deze callback wordt uitgevoerd indien het scherm is geinitaliseerd.
             */
            this.display = function (onSchermInitializedCallback) {
                // Template ophalen, formulier intialiseren en overzicht renderen
                $("#componentContainer").load("templates/document/overzicht.html", function () {
                    self.formContainer = $("#document_overzicht form.applicatieForm");

                    $("button[name='toevoegen']", self.formContainer).click(function () {
                        self.voegDocumentToe();
                        return false;
                    });

                    onSchermInitializedCallback();
                });
            };
        };

        DocumentOverzichtView.prototype.voegDocumentToe = function() {
                var toeTeVoegenDocument = {};
                toeTeVoegenDocument.id = $("#id").val();
                toeTeVoegenDocument.naam = $("#naam").val();
                toeTeVoegenDocument.tekst = $("#tekst").val();

                this.controller.voegZaakToe(toeTeVoegenDocument);
        };

        DocumentOverzichtView.prototype.renderModel = function() {
            $("#gevonden_documenten tbody tr").remove();
            var documentenTabel = $("#gevonden_documenten tbody");
            $.each(Model.instance.documenten, function() {
                var rij = $("<tr></tr>");
                rij.append("<td>" + this.id + "</td>");
                rij.append("<td>" + this.naam + "</td>");
                rij.append("<td>" + this.tekst + "</td>");

                rij.appendTo(documentenTabel);
            });
        };

        return DocumentOverzichtView;
})($, model);

var documentOverzichtController = (
    function (Model, DocumentService, DocumentOverzichtView) {

        function DocumentOverzichtController() {
            this.documentService = DocumentService.instance;
            this.view = new DocumentOverzichtView(this);
            this.model = Model.instance;
            var self = this;

            this.view.display(function () {
                self.documentService.getAllDocumenten(function() {
                    self.view.renderModel();
                });
            });
        }

        DocumentOverzichtController.prototype.voegZaakToe = function (document) {
            var self = this;

            this.documentService.voegDocumentToe(document, function () {
                self.view.renderModel();
            });
        };

        return DocumentOverzichtController;
    })(model, documentService, documentOverzichtView);
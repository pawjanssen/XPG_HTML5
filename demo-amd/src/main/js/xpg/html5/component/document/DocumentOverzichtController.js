define(["xpg/html5/util/LogUtil", "xpg/html5/Model", "xpg/html5/component/GenericController",
    "xpg/html5/service/DocumentService", "xpg/html5/component/document/DocumentOverzichtView"],
    function (LogUtil, Model, GenericController, DocumentService, DocumentOverzichtView) {

        function DocumentOverzichtController(infoMessage) {
            this.init(infoMessage);
            this.documentService = DocumentService.instance;
            this.view = new DocumentOverzichtView(this);
            this.model = Model.instance;
            var self = this;
            this.logger = LogUtil.createLogger("DocumentOverzichtController");

            this.view.display(function () {
                self.documentService.getAllDocumenten(function() {
                    self.view.renderModel();
                });
            });
        }

        DocumentOverzichtController.prototype = new GenericController();
        DocumentOverzichtController.prototype.constructor = DocumentOverzichtController;

        DocumentOverzichtController.prototype.voegZaakToe = function (document) {
            var self = this;

            this.documentService.voegDocumentToe(document, function () {
                self.view.renderModel();
            });
        };

        return DocumentOverzichtController;
    });
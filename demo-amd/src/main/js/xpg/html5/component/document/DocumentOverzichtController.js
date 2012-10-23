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

            /**
             * Toont de view en definieert een callback indien de view gerenderd is.
             * Indien de view is gerendered wordt gecontroleert of het model zaken bevat, en indien
             * nodig wordt een actie afgevuurd waarmee het model wordt gerefreshed.
             */

            this.view.display(function () {
                self.documentService.getAllDocumenten(function() {
                    self.view.renderModel();
                });
            });
        }

        DocumentOverzichtController.prototype = new GenericController();
        DocumentOverzichtController.prototype.constructor = DocumentOverzichtController;

        return DocumentOverzichtController;
    });
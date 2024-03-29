define(["xpg/html5/util/LogUtil", "xpg/html5/xpg-jquery", "xpg/html5/component/ComponentContainer",
    "xpg/html5/Model", "xpg/html5/util/FormUtil", "xpg/html5/util/Settings"],
    function (LogUtil, $, ComponentContainer, Model, FormUtil, Settings) {

        function DocumentOverzichtView(documentOverzichtController) {
            this.controller = documentOverzichtController;
            var self = this;
            this.log = LogUtil.createLogger("DocumentOverzichtView");
            this.formContainer = undefined;
            this.formValidator = undefined;

            if (this.controller != undefined) {
                this.controller.registerView(this);
            }

            /**
             * Zorgt ervoor dat het juiste template geladen wordt en intialiseert het scherm. Zet click listeners
             * e.d. op knoppen koppelt deze aan de juiste view methoden.
             *
             * @param {function} onSchermInitializedCallback- Deze callback wordt uitgevoerd indien het scherm is geinitaliseerd.
             */
            this.display = function (onSchermInitializedCallback) {
                // Template ophalen, formulier intialiseren en overzicht renderen
                ComponentContainer.instance.setTemplate("document/overzicht.html", function () {
                    self.formContainer = $("#document_overzicht form.applicatieForm");

                    self.formValidator = self.formContainer.validate({
                        rules: {
                            id: {
                                required: true
                            },
                            naam: {
                                required: true
                            }
                        }
                    });

                    FormUtil.enableForm(self.formContainer);

                    $("button[name='toevoegen']", self.formContainer).click(function () {
                        self.voegDocumentToe();
                    });

                    self.log.info("View loaded");
                    onSchermInitializedCallback();
                });
            };
        };

        DocumentOverzichtView.prototype.voegDocumentToe = function() {
            if (this.formValidator.valid()) {

                var toeTeVoegenDocument = {};
                toeTeVoegenDocument.id = $("#id").val();
                toeTeVoegenDocument.naam = $("#naam").val();
                toeTeVoegenDocument.tekst = $("#tekst").val();

                this.controller.voegZaakToe(toeTeVoegenDocument);
            }
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
    });
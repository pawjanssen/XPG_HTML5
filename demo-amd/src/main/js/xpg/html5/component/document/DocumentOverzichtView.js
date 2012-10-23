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

                    FormUtil.beautifyButtons("#document_overzicht");

                    self.log.info("View loaded");
                    onSchermInitializedCallback();
                });
            };
        }

        DocumentOverzichtView.prototype.renderModel = function() {
            console.log(Model.instance.documenten);

            $("#gevonden_documenten tbody tr").remove();
            var documentenTabel = $("#gevonden_documenten tbody");
            $.each(Model.instance.documenten, function() {
                var rij = $("<tr></tr>");
                rij.append("<td>" + this.id + "</td>");
                rij.append("<td>" + this.naam + "</td>");

                rij.appendTo(documentenTabel);
            });
        };

        return DocumentOverzichtView;
    });
define(["xpg/html5/util/LogUtil", "xpg/html5/component/GenericView", "xpg/html5/component/ComponentContainer"], function(LogUtil, GenericView, ComponentContainer) {
	
	/**
	 * Generieke controller, te gebruiken als prototype voor andere controllers. Bevat methode om views zich te laten
	 * registreren en ook om alle geregistreerde views te laten rerenderen.
	 */
	function GenericController() {
		this.registeredViews = new Array();
		this.log = LogUtil.createLogger("GenericController");
        this.componentContainer = ComponentContainer.instance;
	};
	
	GenericController.prototype.registerView = function(genericView) {
		if (genericView instanceof GenericView) {
			this.log.info("view registered" + genericView);
			this.registeredViews.push(genericView);
		} else {
			this.log.warn("Given view not an instance of GenericView " + this);
		}
	};
	
	GenericController.prototype.unRegisterView = function(genericView) {
		if (genericView instanceof GenericView) {
			for (var count = 0; count < this.registeredViews.length; count++) {
				if (this.registeredViews[count] === genericView) {
					this.registeredViews.splice(count, 1);
				}
			}
		} else {
			this.log.warn("Given view not an instance of GenericView " + this);
		}
	};
	
	GenericController.prototype.rerenderRegisteredViews = function() {
		for (var viewCount = 0; viewCount < this.registeredViews.length; viewCount++) {
			this.registeredViews[viewCount].render();
		}
	};

    GenericController.prototype.init = function(infoMessage) {
        if (infoMessage) {
            this.componentContainer.setInfoMessage(infoMessage);
        } else {
            this.componentContainer.setInfoMessage(null);
        }
    };
	
	return GenericController;
});
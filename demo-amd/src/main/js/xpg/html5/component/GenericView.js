define(["xpg/html5/util/LogUtil", "xpg/html5/component/ComponentContainer"], function(LogUtil, ComponentContainer) {
	
	/**
	 * Generieke view, te gebruiken als prototype voor andere views. Registreerd zich automatisch op de meegegeven
	 * controller. Definieerd ook de "display" methode waaraan views moeten voldoen.
	 */
	function GenericView(genericController) {
		this.controller = genericController;
		this.log = LogUtil.createLogger("GenericView");
		
		if (this.controller != undefined) {
			this.controller.registerView(this);
		}
		
		/**
		 * Display methoden, te overriden door prototypes. Deze implementatie leegt de componentencontainer.
		 */
		this.display = function() {
			ComponentContainer.instance.empty();
		};
	}
	
	/**
	 * Render methode, te overriden door prototypes. Deze implementatie renderd niets, maar logt alleen een rendering
	 * bericht.
	 */
	GenericView.prototype.render = function() {
		this.log.info("Rendering " + this);
	}
	
	
	return GenericView;
});
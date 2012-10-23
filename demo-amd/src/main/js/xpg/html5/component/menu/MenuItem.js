/**
 * Creert een menuitem, waarmee gewerkt kan worden binnen javascript (inactief zetten, instantieren van een
 * controller indien erop geklikt wordt).
 * 
 * Een menuitem is standaard niet actief.
 * 
 * @param {string} label - label die op het menuitem dient te verschijnen.
 * @param {GenericController} controllerToInitiate - De controller die geinstantieerd moet worden als op het menuitem geklikt wordt.
 */
define(["xpg/html5/xpg-jquery", "xpg/html5/util/LogUtil", "xpg/html5/component/GenericController", "xpg/html5/component/GenericView"],
		function ($, LogUtil, GenericController, GenericView) {
	
	function MenuItem(label, linkHash) {
		this.element = undefined;
		this.menuController = undefined;
		var itemlabel = label;
		var self = this;
		this.log = LogUtil.createLogger("MenuItem['" + label + "']");
        this.linkHash = linkHash;

		this.click = function() {
			this.log.debug("Er is op mij geklikt");
			
			if (this.menuController) {
				this.menuController.setActiveItem(this);
			}
			
			if (this.linkHash) {
				$.address.value(this.linkHash);
			} else {
				this.controllerInstance = new GenericController();
				var view = new GenericView(this.controllerInstance);
				view.display();
			}
		};
		
		var createElement = function() {
			if (self.element == undefined) {
				self.element = $(document.createElement("li")).text(itemlabel);
			}
			
			return self.element;
		};
		
		this.setActief = function(isActief) {
			if (isActief) {
				this.element.addClass("active");
			} else {
				this.element.removeClass("active");
			}
		};
		
		this.onAddedToDocument = function() {
			this.element.click(function() {
				self.click();
			});
		};
		
		createElement();
		this.setActief(false);
	}
	
	return MenuItem;
});
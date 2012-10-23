define(["xpg/html5/util/LogUtil", "xpg/html5/component/GenericView", "xpg/html5/xpg-jquery"], function(LogUtil, GenericView, $) {

	/**
	 * View die het menu uit de gegeven MenuController renderd aan de linkerkant van het scherm.
	 * 
	 * @param {MenuController} menuController - MenuController die de menulogica bevat.
	 */
	function LeftMenuView(menuController) {
		this.controller = menuController;
		this.controller.registerView(this);
		this.log = LogUtil.createLogger("LeftMenuView");
	}
	
	LeftMenuView.prototype = new GenericView();
	LeftMenuView.prototype.constructor = LeftMenuView;
	
	/**
	 * Renderd het menu verticaal aan de linkerkant van het scherm zoals dat op moment van renderen in de controller bekend is.
	 */
	LeftMenuView.prototype.render = function() {
		this.log.debug("rendering view");
		var leftMenuElement = $("#leftMenu");
        var leftMenuParentUL = document.createElement("ul");
		
		if (leftMenuElement && this.controller.menuItems) {
			leftMenuElement.empty();
            leftMenuElement.append(leftMenuParentUL);
			
			for (var itemCount = 0; itemCount < this.controller.menuItems.length; itemCount++) {
				var menuItem = this.controller.menuItems[itemCount];
                $(leftMenuParentUL).append(menuItem.element);
				menuItem.onAddedToDocument();
			}
		}
	};
	
	return LeftMenuView;
});






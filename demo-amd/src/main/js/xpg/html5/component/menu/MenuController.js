define(["xpg/html5/util/LogUtil", "xpg/html5/component/GenericController", "xpg/html5/component/menu/MenuItem"],
    function(LogUtil, GenericController, MenuItem) {
	
	/**
	 * MenuController, verantwoordelijke voor het creeren van een menu a.d.v. MenuItem objecten. Handelt logica af
	 * om MenuItem objecten te kunnen toevoegen en activeren, en zal dan de geregistreerde views laten rerenderen.
	 */
	function MenuController() {
		this.menuItems = new Array();
		this.log = LogUtil.createLogger("MenuController");
	}
	
	MenuController.prototype = new GenericController();
	MenuController.prototype.constructor = MenuController;
	

	/**
	 * Voegt het gegeven MenuItem toe en zet dit op niet actief. Rerenderd de geregistreerde views als
	 * het MenuItem is toegevoegd.
	 * 
	 * @param {MenuItem} menuItem - Het menuItem object om aan het menu toe te voegen.
	 */
	MenuController.prototype.addMenuItem = function(menuItem) {
		menuItem.menuController = this;
		menuItem.setActief(false);
		
		this.menuItems.push(menuItem);
		this.rerenderRegisteredViews();
		
		this.log.info("MenuItem toegevoegd");
	};

	/**
	 * Creerd een MenuItem a.d.v. de gegeven itemTekst (label van het MenuItem). Indien op het MenuItem geklikd wordt,
	 * dan zal de meegegeven controller geinstantieerd worden.
	 * 
	 * @param {string} itemTekst - Het label van het menuitem.
	 * @param {GenericController} controllerToInstantiate - De controller die geinstantieerd moet worden als het menuitem
	 * 															wordt geactiveerd.
	 */
	MenuController.prototype.createAndAddMenuItem = function(itemTekst, linkHash) {
		var menuItem = new MenuItem(itemTekst, linkHash);
		menuItem.menuController = this;
		
		this.menuItems.push(menuItem);
		this.rerenderRegisteredViews();
		
		this.log.info("MenuItem '" + itemTekst + "' toegevoegd");
		
		return menuItem;
	};

	/**
	 * Zet het gegeven menu item op actief, en alle andere MenuItem objecten van het menu op inactief.
	 * 
	 * @param {MenuItem} menuItemToSetActief - Het MenuItem object om op actief te zetten.
	 */
	MenuController.prototype.setActiveItem = function(menuItemToSetActief) {
		for (var menuCount = 0; menuCount < this.menuItems.length; menuCount++) {
			var menuItem = this.menuItems[menuCount];
			if (menuItem === menuItemToSetActief) {
				menuItem.setActief(true);
			} else {
				menuItem.setActief(false);
			}
		}

		this.rerenderRegisteredViews();
	};

    MenuController.prototype.setActiveItemByHash = function(linkHash) {
        for (var menuCount = 0; menuCount < this.menuItems.length; menuCount++) {
            var menuItem = this.menuItems[menuCount];
            if (menuItem.linkHash === linkHash) {
                menuItem.setActief(true);
            } else {
                menuItem.setActief(false);
            }
        }

        this.rerenderRegisteredViews();
    };
	
	return MenuController;
});

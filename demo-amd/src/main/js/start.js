/**
 * Start script of the javascript app.
 */

// Define the configuration of where to fetch external libraries from.
require.config({
    paths:{
        moment: 'external/moment/moment.min',
        jQuery: 'external/jquery/js/jquery-1.7.1',
        jQuery_validate: 'external/validate/jquery.validate.1.9',
        jQuery_validate_additional: 'external/validate/jquery.validate.1.9.additional-methods',
        jQuery_ui: 'external/jquery/js/jquery-ui-1.8.17.custom.min',
        log4javascript: 'external/log4javascript/log4javascript',
        jQuery_address: 'external/jquery-address/jquery.address-1.4'
    }
});

require([
    // Load our app module and pass it to our definition function
    'xpg/html5/component/menu/MenuItem',
    'xpg/html5/component/menu/MenuController',
    'xpg/html5/component/menu/LeftMenuView',
    'xpg/html5/ajax/initajax',
    'xpg/html5/xpg-jquery',
    'xpg/html5/util/HistoryManager'
],
    function (MenuItem, MenuController, LeftMenuView, initAjax, $, HistoryManager) {
        initAjax.initialize();

        // Menuitems creeren
        var archiveringMenuItem = new MenuItem('Documenten');

        // Menu uit de dom halen
        var topMenuElement = $("#top .topMenu");

        // Menuelementen toevoegen
        topMenuElement.append(archiveringMenuItem.element);

        var leftMenuController = new MenuController();
        new LeftMenuView(leftMenuController);

        HistoryManager.addHistoryChangeListener(function(event) {
            leftMenuController.setActiveItemByHash(event.path.substring(1));
        });

        // Menuelementen maken en aan menu toevoegen
        leftMenuController.createAndAddMenuItem('Document overzicht', HistoryManager.documentoverzicht);
    }
);
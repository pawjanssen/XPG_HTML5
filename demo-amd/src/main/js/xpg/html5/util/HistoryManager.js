define(["xpg/html5/xpg-jquery", "xpg/html5/component/document/DocumentOverzichtController"],
    function($, DocumentOverzichtController) {
    /**
     * HistoryManager, die gebruik maakt van jQuery Address. Dit is een jquery implementatie om
     * met de browser history om te gaan, om zo backbutton support te kunnen ondersteunen evenals
     * het bookmarken van pagina's.
     */
    $.address.init(function(event){
        var initScreen = event.path;

        if (event.path == "/") {
            initScreen = "/xpg/html5/component/document/DocumentOverzichtController";
        }

        $.address.value(initScreen.substring(1));
    }).change(function(event){
        require([event.path.substring(1)], function (NavigateTo) {
            new NavigateTo();
        });
    });

    /**
     * Geeft de verschillende te gebruiken hashes terug (die bookmarkable zijn), met daaraan gekoppeld
     * de controller die gestart moet worden bij het activeren van een hash.
     */
    return {
        documentoverzicht: "/xpg/html5/component/document/DocumentOverzichtController",
        addHistoryChangeListener: function(historyChangeListenerFunction) {
            $.address.change(historyChangeListenerFunction);
        }
    }
});
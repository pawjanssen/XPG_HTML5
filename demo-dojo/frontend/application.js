/**
 * Load required files for dojo, with AMD
 */
require([
    "dojo/ready",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/html",
    "dojo/query",
    "dijit/Dialog",
    "dijit/form/TextBox",
    "dijit/form/Button",
    "dojo/parser",
    "dijit/Editor",
    "dijit/_editor/plugins/EnterKeyHandling"

], function(ready, dom, domConstruct, html, query, Dialog, TextBox, Button, parser, Editor){

    /**
     * Will hold the socket connection
     *
     * @type {*}
     */
    var socket = io.connect();

    /**
     * Namespace for the demo app
     *
     * @namespace
     */
    var atos = {};

    /**
     * A new user joins to edit the document
     */
    atos.join = function() {
        var input = dom.byId("name");
        socket.emit("register", {'name': input.value});
        atos.createListeners();
    };

    /**
     *  function(){console.log('editor1 onChange handler: ' + arguments[0])}
     */
    atos.change = function() {
        var tmp = dijit.byId("editor");
        var tmp_content = tmp.get("value");
        socket.emit("change", {content: tmp_content});
    };

    /**
     * Create event listeners on the socket to receive updates
     */
    atos.createListeners = function() {
        socket.on('change', function (data) {
            //console.log(data);
            var tmp = dijit.byId("editor");
            tmp.set("value", data["content"]);
            //socket.emit('my other event', { my: 'data' });
        });

        socket.on("dudes", function(data){
            var ul = query("#users ul")[0];
            html.set(ul, "");
            var map = data["list"];

            for(var key in map){
                domConstruct.create("li", {
                    innerHTML: map[key],
                    id: key
                }, ul);
            }
        });
    };

    /**
     * If everything is loaded the dialog can be shown
     */
    ready(function(){
        window["nameDialog"].show();
    });

    /**
     * Export the atos namespace
     */
    window["atos"] = atos;
});




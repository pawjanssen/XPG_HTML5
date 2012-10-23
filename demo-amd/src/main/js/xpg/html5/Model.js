/**
 * Client side model, met daarin variabelen om model objecten die vanuit de
 * server komen in te bewaren.
 */
define(function() {
	function Model() {
        this.documenten = undefined;
	}
	
	var modelInstance = new Model();
	return {
		'object': Model,
		'instance': modelInstance
	};
});
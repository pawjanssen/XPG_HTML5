/**
 * Globale applicatie settings definitie.
 */
define(function(){
   return {
       /* Het datumformaat wat door jQuery gebruikt wordt om datums op het scherm weer te geven */
       dateFormat: "dd-mm-yy",
       /* De default waarde voor selectie dropdownlijsten */
       defaultSelectOptionValue: "default-select",
       /* De default tekst voor selectie dropdownlijsten */
       defaultSelectOptionText: "Kies ...",
       searchResultShowHideEffect: 'blind',
       searchResultShowHideTime: 1000,
       datatablesSettings: {
           fnServerParams: function(aoData) {
               if (aoData instanceof Array) {
                   aoData.push({
                      name: "isjQueryDatatable",
                      value: true
                   });
               }
           },
           bFilter: false,
           bPaginate: true,
           bLengthChange: true,
           iDisplayLength: 25,
           sPaginationType: "full_numbers",
           bJQueryUI: true,
           oLanguage: {
	           "sProcessing":   "Bezig met verwerken...",
	           "sLengthMenu":   "Toon _MENU_ rijen",
	           "sZeroRecords":  "Geen resultaten gevonden",
	           "sInfo":         "_START_ tot _END_ van _TOTAL_ rijen",
	           "sInfoEmpty":    "Er zijn geen records om te tonen",
	           "sInfoFiltered": "(gefilterd uit _MAX_ rijen)",
	           "sInfoPostFix":  "",
	           "sSearch":       "Zoek:",
	           "sUrl":          "",
	           "oPaginate": {
	               "sFirst":    "Eerste",
	               "sPrevious": "Vorige",
	               "sNext":     "Volgende",
	               "sLast":     "Laatste"
	           }
	       }
       }
   }
});
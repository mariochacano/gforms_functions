var carreraEstudiante = " ";

var str_to_name = generic_functions.search_in_sheet(carreraEstudiante,2,generic_functions.master_info_ID,"Directores","A:C"); // notify name receipt 
var str_to_e = generic_functions.search_in_sheet(carreraEstudiante,3,generic_functions.master_info_ID,"Directores","A:C"); // notify email receipt

var master_data_ID = generic_functions.search_in_sheet(carreraEstudiante,3,generic_functions.master_info_ID,"Forms_IDs","A:E");

function onFormSubmit(e) {
  var sheet = e.source.getActiveSheet();  // Get the sheet that triggered the event
  var sheetName = sheet.getName();        // Get the name of the sheet

  // Perform different actions based on which form (sheet) was updated
  if (sheetName === '1 sol_pra') {
    update_students();
    notify_sol_pra(e);
  } else if (sheetName === '2.2 ev_pra') {
    notify_ev(e);
  } else if (sheetName === '2.3 inf_pra') {
    notify_inf(e);
  }
}

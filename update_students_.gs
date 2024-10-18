function update_students() {
  // List of form IDs
  var formIDs = generic_functions.formsIDs_to_update_students(carreraEstudiante);
  
  var sheetName = '1 sol_pra';

  var ss = SpreadsheetApp.openById(master_data_ID);
  var sheet = ss.getSheetByName(sheetName);
  var startRow = 2;
  var lastRow = sheet.getLastRow();

  var choices = [];
  if (lastRow >= startRow) {
    var range = sheet.getRange(startRow, 1, lastRow - startRow + 1);
    var values = range.getValues();
    for (var i = 0; i < values.length; i++) {
      choices.push(values[i][0]);
    }
    choices.sort();
  }

  // Loop through all form IDs and update each form
  formIDs.forEach(function(formID) {
    var form = FormApp.openById(formID);
    var items = form.getItems(FormApp.ItemType.LIST);
    var dropdown = items[0].asListItem();
    dropdown.setChoiceValues(choices);
  });
}

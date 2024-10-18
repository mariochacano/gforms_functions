var master_info_ID = "1-bo5KbMO6fFVA0nU40Y1-2aQIpAa7i6LkqyJwi31aP8"

function calc_workdays(date_start, date_end){
  var workdays = 0;

  for (var d = new Date(date_start); d <= date_end; d.setDate(d.getDate() + 1)) {var day = d.getDay();
  if (day != 0 && day != 6) { // 0 = Sunday, 6 = Saturday
    workdays++;
    }
  }

  return workdays;
}

function calc_nota(score_percent){
  var score_aprobacion = 51;
  var score_max = 100;

  var nota = 0;
  if (score_percent < score_aprobacion) {nota = 1 + (score_percent / score_aprobacion) * 3;}
  else {nota = 4 + ((score_percent - score_aprobacion) / (score_max - score_aprobacion)) * 3;}
  
  var nota = nota.toFixed(1);

  return nota;
}

function search_in_sheet(searchValue, var_position, ss_ID, sheet_ID, range_ID) {
  var ss = SpreadsheetApp.openById(ss_ID);  
  var sheet = ss.getSheetByName(sheet_ID);
  var range = sheet.getRange(range_ID).getValues(); 

  // Recorrer el rango y buscar el valor
  for (var i = 0; i < range.length; i++) {
    if (range[i][0] == searchValue) {  // [0] es la primera columna del rango
      var result = range[i][var_position - 1];  // Obtener el valor de la columna correspondiente
      return result;  // Devuelve el valor si lo encuentra
    }
  }
}

function formsIDs_to_update_students(Carrera_Estudiante){
  var form_list = [
    search_in_sheet(Carrera_Estudiante,4,master_info_ID,"Forms_IDs","A:O"),  // formID_bitacora
    search_in_sheet(Carrera_Estudiante,5,master_info_ID,"Forms_IDs","A:O"),  // formID_ev_sup
    search_in_sheet(Carrera_Estudiante,6,master_info_ID,"Forms_IDs","A:O")   // formID_inffinal
  ];
  return form_list;
}

var str_html_signature = "<p>Saludos,<br>" +
                    "Sin otro particular, se despide cordialmente,</p>" +
                    "<p><strong>Mario A. Chacano</strong><br>" +
                    "Unidad de Prácticas Profesionales<br>" +
                    "Facultad de Ingeniería UBB<br>" +
                    "Av. Collao 1202, Concepción<br>" +
                    "+56 41 311 1953<br>" +
                    "<a href='mailto:practicasfi@ubiobio.cl'>practicasfi@ubiobio.cl</a> – <a href='http://www.ubiobio.cl'>www.ubiobio.cl</a></p>";

function notify_ev(e) {
  // obtener datos
  var responses = e.values;

  // info del estudiante
  var idEstudiante = responses[1];

  var sheetName = '1 sol_pra';
  var sheetRange = "A:AI";

  var nombresEstudiante = generic_functions.search_in_sheet(idEstudiante,3,master_data_ID,sheetName,sheetRange) + " " + generic_functions.search_in_sheet(idEstudiante,4,master_data_ID,sheetName,sheetRange) + " " + generic_functions.search_in_sheet(idEstudiante,5,master_data_ID,sheetName,sheetRange);
  var rutEstudiante = generic_functions.search_in_sheet(idEstudiante,6,master_data_ID,sheetName,sheetRange)
  var correoInstitucionalEstudiante = generic_functions.search_in_sheet(idEstudiante,7,master_data_ID,sheetName,sheetRange)

  var str_fechaInicio = responses[2]; // Fecha estimada de Inicio de la Práctica
  var str_fechaTermino = responses[3]; // Fecha estimada de Término de la Práctica

  var parts_fechaInicio = str_fechaInicio.split("/"); // divide en formato dia, mes, año
  var parts_fechaTermino = str_fechaTermino.split("/"); // divide en formato dia, mes, año

  var date_fechaInicio = new Date((parseInt(parts_fechaInicio[2])),(parseInt(parts_fechaInicio[1])-1),(parseInt(parts_fechaInicio[0])));
  var date_fechaTermino = new Date((parseInt(parts_fechaTermino[2])),(parseInt(parts_fechaTermino[1])-1),(parseInt(parts_fechaTermino[0])));

  // calc dias laborales lunes a viernes
  var horasPractica = ((generic_functions.calc_workdays(date_fechaInicio, date_fechaTermino))*(responses[4]/5));

  // valores rubrica
  var FG1 = responses[5];
  var FG2 = responses[6];
  var FG3 = responses[7];
  var FG4 = responses[8];
  var FG5 = responses[9];
  var FG6 = responses[10];

  var DR1 = responses[11];
  var DR2 = responses[12];
  var DR3 = responses[13];
  var DR4 = responses[14];
  var DR5 = responses[15];

  var ER1 = responses[16];
  var ER2 = responses[17];
  var ER3 = responses[18];
  var ER4 = responses[19];
  var ER5 = responses[20];

  var TA1 = responses[21];
  var TA2 = responses[22];
  var TA3 = responses[23];

  var fortalezas = responses[24];
  var debilidades = responses[25];

  // creacion de valores
  var FG_Count = 0;
  var FG_Sum = 0;

  var DR_Count = 0;
  var DR_Sum = 0;

  var ER_Count = 0;
  var ER_Sum = 0;

  var TA_Count = 0;
  var TA_Sum = 0;

  var total_Count = 0;
  var total_Sum = 0;

  // obtencion de valores 
  for (var i = 5; i <= 10; i++) {
    var value = responses[i];
    var numValue = parseFloat(value); // Convertir el valor a número (si no es número, devuelve NaN)
    
    if (!isNaN(numValue)) {
      FG_Count++;
      FG_Sum += numValue;
    }
  }

  for (var i = 11; i <= 15; i++) {
    var value = responses[i];
    var numValue = parseFloat(value); // Convertir el valor a número (si no es número, devuelve NaN)
    
    if (!isNaN(numValue)) {
      DR_Count++;
      DR_Sum += numValue;
    }
  }

  for (var i = 16; i <= 20; i++) {
    var value = responses[i];
    var numValue = parseFloat(value); // Convertir el valor a número (si no es número, devuelve NaN)
    
    if (!isNaN(numValue)) {
      ER_Count++;
      ER_Sum += numValue;
    }
  }

  for (var i = 21; i <= 23; i++) {
    var value = responses[i];
    var numValue = parseFloat(value); // Convertir el valor a número (si no es número, devuelve NaN)
    
    if (!isNaN(numValue)) {
      TA_Count++;
      TA_Sum += numValue;
    }
  }

  for (var i = 5; i <= 23; i++) {
    var value = responses[i];
    var numValue = parseFloat(value); // Convertir el valor a número (si no es número, devuelve NaN)
    
    if (!isNaN(numValue)) {
      total_Count++;
      total_Sum += numValue;
    }
  }

  // calc nota
  var FG_nota = generic_functions.calc_nota((((FG_Sum/(FG_Count*5))*100).toFixed(1)))
  var DR_nota = generic_functions.calc_nota((((DR_Sum/(DR_Count*5))*100).toFixed(1)))
  var ER_nota = generic_functions.calc_nota((((ER_Sum/(ER_Count*5))*100).toFixed(1)))
  var TA_nota = generic_functions.calc_nota((((TA_Sum/(TA_Count*5))*100).toFixed(1)))

  var total_nota = generic_functions.calc_nota((((total_Sum/(total_Count*5))*100).toFixed(1)))

  // estructura del email
  // asunto
  var str_subject = "Evaluación de práctica";

  // cuerpo
  var str_info = "<p>Estimad@ " + str_to_name + ",</p>" +
               "<p>Se ha ingresado la siguiente evaluación de práctica:</p>" +

               "<h3>Información del estudiante</h3><ul>" +
               "<li><strong>Nombre del Estudiante:</strong> " + nombresEstudiante + "</li>" +
               "<li><strong>RUT del Estudiante:</strong> " + rutEstudiante + "</li>" +
               "<li><strong>Correo Institucional del Estudiante:</strong> " + correoInstitucionalEstudiante + "</li>" +
               "</ul>" +

               "<h3>Información de la práctica</h3><ul>" +
               "<li><strong>Fecha estimada de Inicio de la Práctica:</strong> " + str_fechaInicio + "</li>" +
               "<li><strong>Fecha estimada de Término de la Práctica:</strong> " + str_fechaTermino + "</li>" +
               "<li><strong>Número de horas de práctica:</strong> " + horasPractica + "</li>" +
               "</ul>" +

               "<h3>Notas</h3><ul>" +
               "<li><strong>Competencias específicas:</strong><ul>" +
               "<li>Formación general, conocimientos teóricos y prácticos: " + FG_nota + "</li>" +
               "<li>Diagnóstico y resolución de problemas: " + DR_nota + "</li></ul></li>" +
               "<li><strong>Competencias genéricas:</strong><ul>" +
               "<li>Ética y responsabilidad: " + ER_nota + "</li>" +
               "<li>Trabajo con otros y autonomía: " + TA_nota + "</li></ul></li>" +
               "<li><strong>Nota Total:</strong> " + total_nota + "</li>" +
               "</ul>" +

               "<h3>Desempeño del estudiante en la práctica profesional</h3>" +
               "<p><strong>Fortalezas:</strong> " + fortalezas + "</p>" +
               "<p><strong>Debilidades:</strong> " + debilidades + "</p>" +

               "<h3>Detalle de la Evaluación</h3><ul>" +
               "<li><strong>Competencias específicas:</strong><ul>" +
               "<li>Formación general, conocimientos teóricos y prácticos:<ul>" +
               "<li>1. Describe y caracteriza procesos asociados a su campo disciplinar: " + FG1 + "</li>" +
               "<li>2. Utiliza herramientas y recursos propios de su disciplina: " + FG2 + "</li>" +
               "<li>3. Elabora estudios técnicos en su disciplina: " + FG3 + "</li>" +
               "<li>4. Aplica conocimientos teóricos y prácticos desde su perspectiva disciplinar: " + FG4 + "</li>" +
               "<li>5. Emplea con precisión el lenguaje técnico de su especialidad: " + FG5 + "</li>" +
               "<li>6. Integra conocimientos, metodologías y herramientas para la solución de problemas: " + FG6 + "</li></ul></li>" +

               "<li><strong>Diagnóstico y resolución de problemas:</strong><ul>" +
               "<li>1. Examina procesos identificando problemáticas desde su área disciplinar: " + DR1 + "</li>" +
               "<li>2. Formula un problema considerando las distintas variables y aspectos técnicos: " + DR2 + "</li>" +
               "<li>3. Propone alternativas de solución a problemas detectados en su centro de práctica: " + DR3 + "</li>" +
               "<li>4. Planifica tareas y acciones estableciendo períodos, objetivos y resultados: " + DR4 + "</li>" +
               "<li>5. Comunica efectivamente resultados de su trabajo y aspectos esenciales de la práctica profesional: " + DR5 + "</li></ul></li></ul></li>" +

               "<li><strong>Competencias genéricas:</strong><ul>" +
               "<li>Ética y responsabilidad:<ul>" +
               "<li>1. Respeta los horarios establecidos de la empresa o institución de práctica: " + ER1 + "</li>" +
               "<li>2. Realiza las tareas solicitadas demostrando responsabilidad en su desempeño: " + ER2 + "</li>" +
               "<li>3. Acoge las sugerencias u observaciones del supervisor para mejorar su desempeño: " + ER3 + "</li>" +
               "<li>4. Cumple con las normas de seguridad establecidas en la institución o empresa: " + ER4 + "</li>" +
               "<li>5. Respeta el acuerdo de confidencialidad de la institución o empresa: " + ER5 + "</li></ul></li>" +

               "<li><strong>Trabajo con otros y autonomía:</strong><ul>" +
               "<li>1. Colabora con equipos de trabajo en función del logro de objetivos comunes: " + TA1 + "</li>" +
               "<li>2. Manifiesta capacidad de toma de decisiones basados en argumentos técnicos: " + TA2 + "</li>" +
               "<li>3. Demuestra autonomía para desempeñarse durante el trabajo asignado: " + TA3 + "</li></ul></li></ul></li>" +
               "</ul>";

  var str_body = str_info + generic_functions.str_html_signature;

  // enviar email
  MailApp.sendEmail({
        to: str_to_e,
        subject: str_subject,
        htmlBody: str_body
      });
}

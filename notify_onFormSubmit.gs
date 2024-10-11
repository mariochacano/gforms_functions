function calc_workdays(date_start, date_end){
    var workdays = 0;
  for (var d = new Date(date_fechaInicio); d <= date_fechaTermino; d.setDate(d.getDate() + 1)) {var day = d.getDay();
    if (day != 0 && day != 6) { // 0 = Sunday, 6 = Saturday
      workdays++;
    }
  }
}

function notify_onFormSubmit(e) {
  // obtener datos
  var responses = e.values;

  // info del estudiante
  var nombresEstudiante = responses[1]; // Nombres del Estudiante
  //var rutEstudiante = responses[4]; // RUT del Estudiante
  //var correoInstitucionalEstudiante = responses[5]; // Correo Institucional del Estudiante
  //var carreraEstudiante = responses[8]; // Carrera del Estudiante

  var str_fechaInicio = responses[2]; // Fecha estimada de Inicio de la Práctica
  var str_fechaTermino = responses[3]; // Fecha estimada de Término de la Práctica

  var parts_fechaInicio = str_fechaInicio.split("/"); // divide en formato dia, mes, año
  var parts_fechaTermino = str_fechaTermino.split("/"); // divide en formato dia, mes, año

  var date_fechaInicio = new Date((parseInt(parts_fechaInicio[2])),(parseInt(parts_fechaInicio[1])-1),(parseInt(parts_fechaInicio[0])));
  var date_fechaTermino = new Date((parseInt(parts_fechaTermino[2])),(parseInt(parts_fechaTermino[1])-1),(parseInt(parts_fechaTermino[0])));

  // calc dias laborales lunes a viernes
  var workdays = 0;
  for (var d = new Date(date_fechaInicio); d <= date_fechaTermino; d.setDate(d.getDate() + 1)) {var day = d.getDay();
    if (day != 0 && day != 6) { // 0 = Sunday, 6 = Saturday
      workdays++;
    }
  }

  var horasemana = responses[4];
  var horasdia = horasemana/5;
  var horasPractica = (workdays*horasdia);
  
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

  // calc nota
  var numericCount = 0;
  var numericSum = 0;

  for (var i = 5; i <= 23; i++) {
    var value = responses[i];
    var numValue = parseFloat(value); // Convertir el valor a número (si no es número, devuelve NaN)
    
    if (!isNaN(numValue)) {
      numericCount++;
      numericSum += numValue;
    }
  }

  var calificacion_porcentual = ((numericSum/(numericCount*5))*100).toFixed(1)
  
  var puntajeMinimo = 51;
  var puntajeMaximo = 100;
  var nota = 0
  if (calificacion_porcentual < puntajeMinimo) {nota = 1 + (calificacion_porcentual / puntajeMinimo) * 3;}
  else {nota = 4 + ((calificacion_porcentual - puntajeMinimo) / (puntajeMaximo - puntajeMinimo)) * 3;}
  var nota = nota.toFixed(1);

  // estructura del email
  // correos y nombres
  var str_to_name = "DEFAULT";
  var str_to_e = "mchacano@ubiobio.cl";
  
  // asunto
  var str_subject = "Evaluación de práctica";

  // cuerpo
  var str_info = "Estimad@ " + str_to_name + "; Se ha ingresado la siguiente evaluación de práctica:\n\n" + 
            "Información del estudiante\n" +
             "  Nombre del Estudiante: " + nombresEstudiante + "\n\n" + 
             //"RUT del Estudiante: " + rutEstudiante + "\n" +
             //"Correo Institucional del Estudiante: " + correoInstitucionalEstudiante + "\n\n" +

             "Información de la práctica\n" +
             "  Fecha estimada de Inicio de la Práctica: " + str_fechaInicio + "\n" +
             "  Fecha estimada de Término de la Práctica: " + str_fechaTermino + "\n" +
             "  Número de horas de práctica: " + horasPractica + "\n\n" +

             "Nota :" + nota + " " + calificacion_porcentual + "\n\n" +

             "Detalle de la Evaluación\n" +
             "  Competencias específicas\n" +
             "    Formación general, conocimientos teóricos y prácticos\n" + 
             "      1. Describe y caracteriza procesos asociados a su campo disciplinar: " + FG1 + "\n" +
             "      2. Utiliza herramientas y recursos propios de su disciplina: " + FG2 + "\n" +
             "      3. Elabora estudios técnicos en su disciplina: " + FG3 + "\n" +
             "      4. Aplica conocimientos teóricos y prácticos desde su perspectiva disciplinar: " + FG4 + "\n" +
             "      5. Emplea con precisión el lenguaje técnico de su especialidad: " + FG5 + "\n" +
             "      6. Integra conocimientos, metodologías y herramientas para la solución de problemas: " + FG6 + "\n" +

             "    Diagnóstico y resolución de problemas\n" +
             "      1. Examina procesos identificando problemáticas desde su área disciplinar: " + DR1 + "\n" +
             "      2. Formula un problema considerando las distintas variables y aspectos técnicos: " + DR2 + "\n" +
             "      3. Propone alternativas de solución a problemas detectados en su centro de práctica: " + DR3 + "\n" +
             "      4. Planifica tareas y acciones estableciendo períodos, objetivos y resultados: " + DR4 + "\n" +
             "      5. Comunica efectivamente resultados de su trabajo y aspectos esenciales de la práctica profesional: " + DR5 + "\n\n" +

             "  Competencias genericas\n" +
             "    Ética y responsabilidad\n" +
             "      1. Respeta los horarios establecidos de la empresa o institución de práctica: " + ER1 + "\n" +
             "      2. Realiza las tareas solicitadas demostrando responsabilidad en su desempeño: " + ER2 + "\n" +
             "      3. Acoge las sugerencias u observaciones del supervisor para mejorar su desempeño: " + ER3 + "\n" +
             "      4. Cumple con las normas de seguridad establecidas en la institución o empresa: " + ER4 + "\n" +
             "      5. Respeta el acuerdo de confidencialidad de la institución o empresa: " + ER5 + "\n\n" +

             "    Trabajo con otros y autonomía\n" +
             "      1. Colabora con equipos de trabajo en función del logro de objetivos comunes: " + TA1 + "\n" +
             "      2. Manifiesta capacidad de toma de decisiones basados en argumentos técnicos: " + TA2 + "\n" +
             "      3. Demuestra autonomía para desempeñarse durante el trabajo asignado: " + TA3 + "\n\n" +

             "  Desempeño del estudiante en la práctica profesional\n" +
             "    Fortalezas:\n " + fortalezas + "\n\n" +
             "    Debilidades:\n " + debilidades + "\n\n" ;
             
  //firma
    var str_signature = "Saludos,\n" +
             "Sin otro particular, se despide cordialmente,\n\n" +
             "Mario A. Chacano\n" +
             "Unidad de Prácticas Profesionales\n" +
             "Facultad de Ingeniería UBB\n" +
             "Av. Collao 1202, Concepción\n" +
             "+56 41 311 1953\n" +
             "practicasfi@ubiobio.cl – www.ubiobio.cl";

    var str_body = str_info + str_signature;

  // enviar email
  GmailApp.sendEmail(str_to_e, str_subject, str_body);
}

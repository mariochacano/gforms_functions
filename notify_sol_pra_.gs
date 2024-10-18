function notify_sol_pra(e) {
  // obtener datos
  var responses = e.values;

  var nombresEstudiante = responses[1]; // Nombres del Estudiante
  var apellido1Estudiante = responses[2]; // Apellido1 del Estudiante
  var apellido2Estudiante = responses[3]; // Apellido2 del Estudiante
  var rutEstudiante = responses[4]; // RUT del Estudiante
  var correoInstitucionalEstudiante = responses[5]; // Correo Institucional del Estudiante
  var telefonoEstudiante = responses[6];
  var direccionEstudiante = responses[7];
  var fechaInicio = responses[8]; // Fecha estimada de Inicio de la Práctica
  var fechaTermino = responses[9]; // Fecha estimada de Término de la Práctica
  var horasPractica = responses[10]; // Número estimado de horas de práctica
  var tipoJornada = responses[11]; // Tipo de jornada laboral

  var nombresContactoEmergencia = responses[12];
  var apellidosContactoEmergencia = responses[13];
  var telefonoContactoEmergencia = responses[14];
  
  var nombreOrganizacion = responses[15]; // Nombre de la Organización
  var tamanoOrganizacion = responses[16];
  var rubroOrganizacion = responses[17]; // Rubro de la Organización
  var direccionOrganizacion = responses[18];
  var rutOrganizacion = responses[19];
  var telefonoOrganizacion = responses[20];

  var nombresSupervisor = responses[21]; // Nombres del supervisor/a
  var apellido1Supervisor = responses[22]; // Apellido1 del supervisor/a
  var apellido2Supervisor = responses[23]; // Apellido2 del supervisor/a
  var profesionSupervisor = responses[24]; // Profesion del supervisor/a
  var cargoSupervisor = responses[25]; // Cargo del supervisor/a
  var departamento = responses[26]; // Departamento, División y/o Sección
  var correoSupervisor = responses[27]; // Correo del supervisor/a
  var telefonoSupervisor =responses[28];

  var areaPractica = responses[29]; // Área en la que desarrollará la práctica
  var tareasPractica = responses[30]; // Descripción general de tareas a realizar
  var dec_acc_DDE_drive = responses[31]; // Obtener declaracion de accidente escolar DDE
  var comentarios = responses[32]; // Comentarios o consultas

// obtener declaracion
  var file_ID;
  var file;
  if (dec_acc_DDE_drive){
    file_ID = dec_acc_DDE_drive.match(/[-\w]{25,}/)[0];
    file = DriveApp.getFileById(file_ID);
  }

  // estructura del email
  // asunto
  var str_subject = "Solicitud de inscripción de práctica";

  // cuerpo
var str_info = "<p>Estimad@ " + str_to_name + ",</p>" +
               "<p>Se ha ingresado la siguiente solicitud de práctica:</p>" +

               "<h3>Información del estudiante:</h3><ul>" +
               "<li><strong>Nombre del Estudiante:</strong> " + nombresEstudiante + " " + apellido1Estudiante + " " + apellido2Estudiante + "</li>" +
               "<li><strong>RUT del Estudiante:</strong> " + rutEstudiante + "</li>" +
               "<li><strong>Correo Institucional del Estudiante:</strong> " + correoInstitucionalEstudiante + "</li>" +
               "</ul>" +

               "<h3>Información de la práctica:</h3><ul>" +
               "<li><strong>Fecha estimada de Inicio de la Práctica:</strong> " + fechaInicio + "</li>" +
               "<li><strong>Fecha estimada de Término de la Práctica:</strong> " + fechaTermino + "</li>" +
               "<li><strong>Número estimado de horas de práctica:</strong> " + horasPractica + "</li>" +
               "<li><strong>Tipo de jornada laboral:</strong> " + tipoJornada + "</li>" +
               "<li><strong>Área en la que desarrollará la práctica:</strong> " + areaPractica + "</li>" +
               "<li><strong>Enlace declaración de accidente escolar DDE:</strong> <a href='" + dec_acc_DDE_drive + "'>Ver Declaración</a></li>" +
               "<li><strong>Tareas a realizar:</strong><br>" + tareasPractica + "</li>" +
               "</ul>" +

               "<h3>Información de la organización:</h3><ul>" +
               "<li><strong>Nombre de la Organización:</strong> " + nombreOrganizacion + "</li>" +
               "<li><strong>Rubro de la Organización:</strong> " + rubroOrganizacion + "</li>" +
               "</ul>" +

               "<h3>Información del supervisor:</h3><ul>" +
               "<li><strong>Nombre del supervisor/a:</strong> " + nombresSupervisor + " " + apellido1Supervisor + " " + apellido2Supervisor + "</li>" +
               "<li><strong>Profesión del supervisor/a:</strong> " + profesionSupervisor + "</li>" +
               "<li><strong>Cargo del supervisor/a:</strong> " + cargoSupervisor + "</li>" +
               "<li><strong>Departamento, División y/o Sección:</strong> " + departamento + "</li>" +
               "<li><strong>Correo del supervisor/a:</strong> " + correoSupervisor + "</li>" +
               "</ul>" +

               "<h3>Información adicional:</h3><ul>" +
               "<li><strong>Comentarios o consultas:</strong><br>" + comentarios + "</li>" +
               "</ul>";

  var str_body = str_info + generic_functions.str_html_signature;

  // enviar email
  if (file){
    MailApp.sendEmail({
      to: str_to_e,
      subject: str_subject,
      htmlBody: str_body,
      attachments: [file.getAs(MimeType.PDF)]
    });
    } else {
      MailApp.sendEmail({
        to: str_to_e,
        subject: str_subject,
        htmlBody: str_body
      });
    }
}

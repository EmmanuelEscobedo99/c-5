const Validation = (create) =>{

    let errors = {}



   if (!create.averiguacion ){
      errors.averiguacion = "El campo de averiguación no puede estar vacio ";

   }
   
   if (!create.fecha_averigua){
    errors.fecha_averigua = "Debes de seleccionar una fecha de denuncia";

 }
 
 if(create.fecha_averigua > create.fe){
    errors.fecha_averigua= "no dedes seleccionar una fecha mayor a la fecha actual"
 }




   if (!create.agencia_mp){
      errors.agencia_mp = "Este campo no puede estar vacio, agregue la Agencia donde se realizo la denuncia";

   }

   if (!create.agente_mp){
      errors.agente_mp = "Ingrese el nombre completo del agente del ministerio público";

   }

   if (!create.id_modalidad){
      errors.id_modalidad = "Debes seleccionar una modalidad";

   } 
    if (!create.fecha_robo){
    errors.fecha_robo = "Debes seleccionar la fecha del robo";

     }
     
     if(create.fecha_robo> create.fe){
        errors.fecha_robo= "no dedes seleccionar una fecha mayor a la fecha actual"
     }

  if (!create.hora_robo){
   errors.hora_robo = "Este campo deber ser completado con una hora";

   } 

  if (!create.calle_robo){
        errors.calle_robo = "Ingrese la calle ";
    
    } 
    
         
  if (!create.num_ext_robo){
        errors.num_ext_robo = "Este campo debe ser completado a";
    
     } 
   
  if (!create.colonia_robo){
       errors.colonia_robo = "Ingrese la colonia donde ocurrio el robo";
        
     } 
        
             
  if (!create.id_entidad_robo){
       errors.id_entidad_robo = "esta entidad debe ser completada b";
       
      } 
       
  if (!create.id_municipio_robo){
      errors.id_municipio_robo = "ingrese el municipio donde ocurrio el robo";
           
     } 
            
                 
 if (!create.id_tipo_lugar){
     errors.id_tipo_lugar = "Ingrese el tipo de lugar";
            
     } 

 if (!create.nombre_den){
    errors.nombre_den = "Desbes ingresar el nombre quien realizo la denuncia";
               
    } 

if (!create.paterno_den){
    errors.paterno_den = "Ingresa el apellido paterno";
                    
    } 

if (!create.calle_den){
    errors.calle_den = "Ingresa la calle del domicilio del denunciante";
                        
    } 

if (!create.numext_dom_den){
    errors.numext_dom_den = "ingrese el numero exterior del domicilio del denunciante";
                            
    } 

if (!create.colonia_den){
    errors.colonia_den = "Debes ingresar la colonia del domicilio del denunciante";
                              
        }     

if (!create.id_entidad_den){
   errors.id_entidad_den = "Debes ingresar la entidad del denunciante";
                                      
                }  

if (!create.id_municipio_den){
    errors.id_municipio_den= "Debes ingresar el municipio del denunciante";
                                                       
  }      

  if (!create.cp_den){
    errors.cp_den= "Debes ingresar un codigo postal del denunciante";
                                                       
  }  

  if (!create.placa){
    errors.placa= "Campo requerido para ingresar la placa o un numero de permiso";
                                                       
  }  

if (!create.id_marca){
    errors.id_marca= "Campo de la marca del vehiculo robado es obligatorio";
                                                       
  }  

  if (!create.id_submarca){
    errors.id_submarca= "Campo de la submarca es obligatorio";
                                                       
  }
  if (!create.modelo){
    errors.modelo= "Debes ingresar un modelo del vehiculo";
                                                       
  }
  
  if (!create.id_color){
    errors.id_color= "Selecciona el color del vehiculo ";
                                                       
  } 

  if (!create.serie){
    errors.serie= "Ingrese la serie del vehiculo robado";
                                                       
  }   

  if (!create.id_tipo_uso){
    errors.id_tipo_uso= "Seleccione un tipo de uso del vehiculo";
                                                       
  }    

  if (!create.id_procedencia){
    errors.id_procedencia= "Seleccione una procedencia del vehiculo";
                                                       
  } 
  
  











    return errors;



}
export default Validation
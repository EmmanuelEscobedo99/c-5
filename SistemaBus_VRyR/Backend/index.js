const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const secretKey = 'fsfzdferg45yertg54rgdf$&/%&/%TR';


const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'vehi_bus'
})


app.get('/', (re, res) => {
    return res.json("from backend side");
});

//traer registros  GET

app.get('/registro', (req, res) => {
    const sql = "select robado.*, recuperado.ID_ALTERNA as recuperado , entregado.ID_ALTERNA as entregado from vehiculo_robado robado left join vehiculo_recuperado recuperado on robado.ID_ALTERNA = recuperado.ID_ALTERNA left join vehiculo_entregado entregado on entregado.ID_ALTERNA = robado.ID_ALTERNA";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/registroRec', (req, res) => {
    const sql = "SELECT * FROM vehiculo_recuperado";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

//LLENAR SELECT CON REGISTROS DE LA BD
app.get('/llenarColor', (req, res) => {
    const sql = "SELECT * FROM color";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

app.get('/entidades', (req, res) => {
    const sql = "SELECT * FROM entidades";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

app.get('/municipios/:id_entidad', async (req, res) => {
    const id_entidad = req.params.id_entidad;
    const sql = ("SELECT ENTIDAD, MUNICIPIO, ID_MUNICIPIO FROM entidades INNER JOIN municipios ON municipios.ID_ENTIDAD=" + req.params.id_entidad + " AND entidades.ID_ENTIDAD =" + req.params.id_entidad);
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

app.get('/fuente', (req, res) => {
    const sql = ("SELECT * from fuente LEFT JOIN vehiculo_recuperado ON vehiculo_recuperado.ID_FUENTE = fuente.ID_FUENTE");
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

app.get('/ultimoId', (req, res) => {
    const sql = ("SELECT MAX(ID_ALTERNA) AS id FROM vehiculo_recuperado");
    const id_last = req.params.id_alterna;
    const id_alterna = id_last + 1;
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

//traer registros  GET

app.get('/registro', (req, res) => {
    const sql = "SELECT * FROM vehiculo_robado ORDER BY ID_ALTERNA DESC LIMIT 6";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

//seleccion por id

app.get('/buscarId/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM vehiculo_robado WHERE ID_ALTERNA= ?", id, (err, result) => {
        if (err) {
            console.log("sindatos");
        } else {
            res.send(result);
        }
    })
})



// CRear un registro POST

app.post("/crear", (req, res) => {

    const averiguacion = req.body.averiguacion;
    const fecha_averigua = req.body.fecha_averigua;
    const agencia_mp = req.body.agencia_mp;


    db.query(
        "INSERT INTO vehiculo_robado (averiguacion,fecha_averigua,agencia_mp) VALUES (?,?,?)",
        [averiguacion, fecha_averigua, agencia_mp],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("registrado")
            }
        }
    )

})

app.post("/crearRecuperado", (req, res) => {

    const placa = req.body.placa;
    const serie = req.body.serie;
    const calle = req.body.calle_rec;
    const numext = req.body.numext_rec;
    const colonia = req.body.colonia_rec;
    const codigoPostal = req.body.cp_rec;
    const fecha = req.body.fecha_rec;
    const hora = req.body.hora_rec;
    const id_color = req.body.id_color;
    const id_fuente = req.body.id_fuente;
    const id_entidad_recupera = req.body.id_entidad_recupera;
    const id_alterna = req.body.id_alterna;
    const lastId = id_alterna + 1;
    const id_municipio_rec = req.body.id_municipio_rec;
    const fechaToday = req.body.fecha;
    const horaToday = req.body.hora;
    const nombre = req.body.nombre_bitacora;
    const apellidos = req.body.apellidos_bitacora;
    const correoIns = req.body.correoIns_bitacora;
    const username = req.body.username_bitacora;
    const municipio = req.body.municipio_bitacora;
    const idUser = req.body.idUser_bitacora;

    //TIPO DE MOVIMIENTO = CAMBIO
    // ESTATUS = RECUPERADO
    // PROCESADO = 0
    // ID_FUENTE = 10

    db.query(
        "INSERT INTO vehiculo_recuperado (ID_ALTERNA, PLACA, SERIE, CALLE_REC, NUMEXT_REC, COLONIA_REC, CP_REC, FECHA_REC, HORA_REC, ID_COLOR, ID_FUENTE, ID_ENTIDAD_RECUPERA, ID_MUNICIPIO_REC) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [id_alterna, placa, serie, calle, numext, colonia, codigoPostal, fecha, hora, id_color, 10, id_entidad_recupera, id_municipio_rec],
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                db.query(
                    "INSERT INTO control_alterna (ID_ALTERNA, ID_FUENTE, TIPO_MOVIMIENTO, ESTATUS, FECHA, HORA, USUARIO) VALUES (?,?,?,?,?,?,?)",
                    [id_alterna, 10, 'CAMBIO', 'RECUPERADO', fechaToday, horaToday, username],
                    (err, res) => {
                        if (err) {
                            console.log(err)
                        } else {
                            db.query("INSERT INTO bitacora (id, nombre, apellidos, correoIns, username, municipio, fecha, hora, id_user, tabla_movimiento) VALUES (?,?,?,?,?,?,?,?,?,?)",
                                ['', nombre, apellidos, correoIns, username, municipio, fechaToday, horaToday, idUser, 'Inserción en Vehículo Recuperado'],
                                (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    } else {

                                    }
                                }
                            )
                        }
                    }
                )

            }
        }
    )

})


app.post("/crearRecuperadoTemporal", (req, res) => {

    const placa = req.body.placa;
    const serie = req.body.serie;
    const calle = req.body.calle_rec;
    const numext = req.body.numext_rec;
    const colonia = req.body.colonia_rec;
    const codigoPostal = req.body.cp_rec;
    const fecha = req.body.fecha_rec;
    const hora = req.body.hora_rec;
    const id_color = req.body.id_color;
    const id_fuente = req.body.id_fuente;
    const id_entidad_recupera = req.body.id_entidad_recupera;
    const id_alterna = req.body.id_alterna;
    const lastId = id_alterna + 1;
    const id_municipio_rec = req.body.id_municipio_rec;
    const fechaToday = req.body.fecha;
    const horaToday = req.body.hora;
    const nombre = req.body.nombre_bitacora;
    const apellidos = req.body.apellidos_bitacora;
    const correoIns = req.body.correoIns_bitacora;
    const username = req.body.username_bitacora;
    const municipio = req.body.municipio_bitacora;
    const idUser = req.body.idUser_bitacora;

    //TIPO DE MOVIMIENTO = CAMBIO
    // ESTATUS = RECUPERADO
    // PROCESADO = 0
    // ID_FUENTE = 10

    db.query(
        "INSERT INTO vehiculo_recuperado_temporal (ID_ALTERNA, PLACA, SERIE, CALLE, NUM_EXT, COLONIA, CP_REC, FECHA, HORA, COLOR, ID_FUENTE, ENTIDAD, MUNICIPIO) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [id_alterna, placa, serie, calle, numext, colonia, codigoPostal, fecha, hora, id_color, 10, id_entidad_recupera, id_municipio_rec],
        (err, res) => {
            if (err) {
                console.log(err);
            } else {

            }
        }
    )

})

app.post("/crearEntregadoTemporal", (req, res) => {

    const id_alterna = req.body.id_alterna
    const calle_entrega = req.body.calle_entrega
    const colonia_entrega = req.body.colonia_entrega
    const id_municipio_entrega = req.body.id_municipio_entrega
    const id_entidadid_entrega = req.body.id_entidad_entrega
    const cp_entrega = req.body.cp_entrega
    const inspeccion = req.body.inspeccion
    const id_fuente_entrega = req.body.id_fuente_entrega
    const fecha_entrega = req.body.fecha_entrega
    const hora_entrega = req.body.hora_entrega
    const serie = req.body.serie
    const motor = req.body.motor
    const factura_vehiculo = req.body.factura_vehiculo
    const comprob_domic_prop = req.body.comprob_domic_prop
    const persona_entrega = req.body.persona_entrega
    const nombre_entrega = req.body.nombre_entrega
    const paterno_entrega = req.body.paterno_entrega
    const fechaToday = req.body.fecha;
    const horaToday = req.body.hora;
    const nombre = req.body.nombre_bitacora;
    const apellidos = req.body.apellidos_bitacora;
    const correoIns = req.body.correoIns_bitacora;
    const username = req.body.username_bitacora;
    const municipio = req.body.municipio_bitacora;
    const idUser = req.body.idUser_bitacora;

    //TIPO DE MOVIMIENTO = CAMBIO
    // ESTATUS = RECUPERADO
    // PROCESADO = 0
    // ID_FUENTE = 10

    db.query(
        "INSERT INTO vehiculo_entregado_temporal (ID_ALTERNA, ID_FUENTE, ENTIDAD, MUNICIPIO, CALLE, COLONIA, CP_ENTREGA, SERIE, MOTOR, INSPECCION, NUM_FACTURA, FECHA, HORA, NOM_PROPIETARIO, AP_PROPIETARIO, COMPR_DOMIC, RECIBE) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [id_alterna, 10, id_entidadid_entrega, id_municipio_entrega, calle_entrega, colonia_entrega, cp_entrega, serie, motor, inspeccion, factura_vehiculo, fecha_entrega, hora_entrega, nombre_entrega, paterno_entrega, comprob_domic_prop, persona_entrega],
        (err, res) => {
            if (err) {
                console.log(err);
            } else {

            }
        }
    )

})

app.post("/crearRecVerificado", (req, res) => {

    const placa = req.body.placaRec;
    const serie = req.body.serieRec;
    const calle = req.body.calleRec;
    const numext = req.body.num_extRec;
    const colonia = req.body.coloniaRec;
    const codigoPostal = req.body.cpRec;
    const fecha = req.body.fechaRec;
    const hora = req.body.horaRec;
    const id_color = req.body.colorRec;
    const id_entidad_recupera = req.body.entidadRec;
    const id_alterna = req.body.alternaRec;
    const id_municipio_rec = req.body.municipioRec;

    const ID_ALTERNA = req.body.ID_ALTERNA;
    const CALLE = req.body.CALLE;
    const COLONIA = req.body.COLONIA;
    const COLOR = req.body.COLOR;
    const CP_REC = req.body.CP_REC;
    const ENTIDAD = req.body.ENTIDAD;
    const FECHA = req.body.FECHA;
    const HORA = req.body.HORA;
    const MUNICIPIO = req.body.MUNICIPIO;
    const NUM_EXT = req.body.NUM_EXT;
    const PLACA = req.body.PLACA;
    const SERIE = req.body.SERIE;

    const fechaToday = req.body.fecha;
    const horaToday = req.body.hora;
    const nombre = req.body.nombre_bitacora;
    const apellidos = req.body.apellidos_bitacora;
    const correoIns = req.body.correoIns_bitacora;
    const username = req.body.username_bitacora;
    const municipio = req.body.municipio_bitacora;
    const idUser = req.body.idUser_bitacora;

    console.log(placa)

    //TIPO DE MOVIMIENTO = CAMBIO
    // ESTATUS = RECUPERADO
    // PROCESADO = 0
    // ID_FUENTE = 10

    if (ID_ALTERNA === undefined) {
        db.query(
            "INSERT INTO vehiculo_recuperado (ID_ALTERNA, PLACA, SERIE, CALLE_REC, NUMEXT_REC, COLONIA_REC, CP_REC, FECHA_REC, HORA_REC, ID_COLOR, ID_FUENTE, ID_ENTIDAD_RECUPERA, ID_MUNICIPIO_REC) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [ID_ALTERNA, PLACA, SERIE, CALLE, NUM_EXT, COLONIA, CP_REC, FECHA, HORA, COLOR, 10, ENTIDAD, MUNICIPIO],
            (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    db.query(
                        "INSERT INTO control_alterna (ID_ALTERNA, ID_FUENTE, TIPO_MOVIMIENTO, ESTATUS, FECHA, HORA, USUARIO) VALUES (?,?,?,?,?,?,?)",
                        [ID_ALTERNA, 10, 'CAMBIO', 'RECUPERADO', fechaToday, horaToday, username],
                        (err, res) => {
                            if (err) {
                                console.log(err)
                            } else {
                                db.query("INSERT INTO bitacora (id, nombre, apellidos, correoIns, username, municipio, fecha, hora, id_user, tabla_movimiento) VALUES (?,?,?,?,?,?,?,?,?,?)",
                                    ['', nombre, apellidos, correoIns, username, municipio, fechaToday, horaToday, idUser, 'Inserción en Vehículo Recuperado'],
                                    (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            db.query("DELETE FROM vehiculo_recuperado_temporal WHERE ID = 3",
                                                (err, result) => {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {

                                                    }
                                                }
                                            )
                                        }
                                    }
                                )
                            }
                        }
                    )

                }
            }
        )
    }

    if (ID_ALTERNA != undefined) {
        db.query(
            "INSERT INTO vehiculo_recuperado (ID_ALTERNA, PLACA, SERIE, CALLE_REC, NUMEXT_REC, COLONIA_REC, CP_REC, FECHA_REC, HORA_REC, ID_COLOR, ID_FUENTE, ID_ENTIDAD_RECUPERA, ID_MUNICIPIO_REC) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [id_alterna, placa, serie, calle, numext, colonia, codigoPostal, fecha, hora, id_color, 10, id_entidad_recupera, id_municipio_rec],
            (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    db.query(
                        "INSERT INTO control_alterna (ID_ALTERNA, ID_FUENTE, TIPO_MOVIMIENTO, ESTATUS, FECHA, HORA, USUARIO) VALUES (?,?,?,?,?,?,?)",
                        [id_alterna, 10, 'CAMBIO', 'RECUPERADO', fechaToday, horaToday, username],
                        (err, res) => {
                            if (err) {
                                console.log(err)
                            } else {

                                db.query("INSERT INTO bitacora (id, nombre, apellidos, correoIns, username, municipio, fecha, hora, id_user, tabla_movimiento) VALUES (?,?,?,?,?,?,?,?,?,?)",
                                    ['', nombre, apellidos, correoIns, username, municipio, fechaToday, horaToday, idUser, 'Inserción en Vehículo Recuperado'],
                                    (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            db.query("DELETE FROM vehiculo_recuperado_temporal WHERE ID_ALTERNA = ?", id_alterna,
                                                (err, result) => {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {

                                                    }
                                                }
                                            )
                                        }
                                    }
                                )
                            }
                        }
                    )

                }
            }
        )
    }

})

app.post("/crearEntregadoVerificado", (req, res) => {

    const alternaEntrega = req.body.alternaEntrega;
    const apellido_entrega = req.body.apellido_entrega;
    const calle_entrega = req.body.calle_entrega;
    const colonia_entrega = req.body.colonia_entrega;
    const comprob_domic_prop = req.body.comprob_domic_prop;
    const cp_entrega = req.body.cp_entrega;
    const factura_vehiculo = req.body.factura_vehiculo;
    const fecha_entrega = req.body.fecha_entrega;
    const hora_entrega = req.body.hora_entrega;
    const id_entidad_entrega = req.body.id_entidad_entrega;
    const id_municipio_entrega = req.body.id_municipio_entrega;
    const inspeccion = req.body.inspeccion;
    const motor = req.body.motor;
    const nombre_entrega = req.body.nombre_entrega;
    const persona_recibe = req.body.persona_recibe;
    const serie = req.body.serie;


    const ID_ALTERNA = req.body.ID_ALTERNA;
    const CALLE = req.body.CALLE;
    const COLONIA = req.body.COLONIA;
    const COMPR_DOMIC = req.body.COMPR_DOMIC;
    const CP_ENTREGA = req.body.CP_ENTREGA;
    const ENTIDAD = req.body.ENTIDAD;
    const FECHA = req.body.FECHA;
    const HORA = req.body.HORA;
    const INSPECCION = req.body.INSPECCION;
    const MOTOR = req.body.MOTOR;
    const MUNICIPIO = req.body.MUNICIPIO;
    const NOM_PROPIETARIO = req.body.NOM_PROPIETARIO;
    const NUM_FACTURA = req.body.NUM_FACTURA;
    const RECIBE = req.body.RECIBE;
    const SERIE = req.body.SERIE;
    const AP_PROPIETARIO = req.body.AP_PROPIETARIO

    const fechaToday = req.body.fecha;
    const horaToday = req.body.hora;
    const nombre = req.body.nombre_bitacora;
    const apellidos = req.body.apellidos_bitacora;
    const correoIns = req.body.correoIns_bitacora;
    const username = req.body.username_bitacora;
    const municipio = req.body.municipio_bitacora;
    const idUser = req.body.idUser_bitacora;



    //TIPO DE MOVIMIENTO = CAMBIO
    // ESTATUS = RECUPERADO
    // PROCESADO = 0
    // ID_FUENTE = 10

    if (ID_ALTERNA != undefined) {
        db.query(
            "INSERT INTO vehiculo_entregado (ID_ALTERNA, ID_FUENTE, CALLE_ENTREGA, COLONIA_ENTREGA, ID_MUNICIPIO_ENTREGA, ID_ENTIDAD_ENTREGA, CP_ENTREGA, INSPECCION, FECHA_ENTREGA, HORA_ENTREGA, SERIE, MOTOR, FACTURA_VEHICULO, COMPROB_DOMIC_PROP, PERSONA_ENTREGA, NOMBRE_ENTREGA, PATERNO_ENTREGA) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [ID_ALTERNA, 10, CALLE, COLONIA, MUNICIPIO, ENTIDAD, CP_ENTREGA, INSPECCION, FECHA, HORA, SERIE, MOTOR, NUM_FACTURA, COMPR_DOMIC, RECIBE, NOM_PROPIETARIO, AP_PROPIETARIO],
            (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    db.query(
                        "INSERT INTO control_alterna (ID_ALTERNA, ID_FUENTE, TIPO_MOVIMIENTO, ESTATUS, FECHA, HORA, USUARIO) VALUES (?,?,?,?,?,?,?)",
                        [ID_ALTERNA, 10, 'CAMBIO', 'RECUPERADO', fechaToday, horaToday, username],
                        (err, res) => {
                            if (err) {
                                console.log(err)
                            } else {
                                db.query("INSERT INTO bitacora (id, nombre, apellidos, correoIns, username, municipio, fecha, hora, id_user, tabla_movimiento) VALUES (?,?,?,?,?,?,?,?,?,?)",
                                    ['', nombre, apellidos, correoIns, username, municipio, fechaToday, horaToday, idUser, 'Inserción en Vehículo Recuperado'],
                                    (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            db.query("DELETE FROM vehiculo_recuperado_temporal WHERE ID_ALTERNA = ?", alternaEntrega,
                                                (err, result) => {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {

                                                    }
                                                }
                                            )
                                        }
                                    }
                                )
                            }
                        }
                    )

                }
            }
        )
    }

    if (ID_ALTERNA === undefined) {
        db.query(
            "INSERT INTO vehiculo_entregado (ID_ALTERNA, ID_FUENTE, CALLE_ENTREGA, COLONIA_ENTREGA, ID_MUNICIPIO_ENTREGA, ID_ENTIDAD_ENTREGA, CP_ENTREGA, INSPECCION, FECHA_ENTREGA, HORA_ENTREGA, SERIE, MOTOR, FACTURA_VEHICULO, COMPROB_DOMIC_PROP, PERSONA_ENTREGA, NOMBRE_ENTREGA, PATERNO_ENTREGA) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [alternaEntrega, 10, calle_entrega, colonia_entrega, id_municipio_entrega, id_entidad_entrega, cp_entrega, inspeccion, fecha_entrega, hora_entrega, serie, motor, factura_vehiculo, comprob_domic_prop, persona_recibe, nombre_entrega, apellido_entrega],
            (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    db.query(
                        "INSERT INTO control_alterna (ID_ALTERNA, ID_FUENTE, TIPO_MOVIMIENTO, ESTATUS, FECHA, HORA, USUARIO) VALUES (?,?,?,?,?,?,?)",
                        [alternaEntrega, 10, 'CAMBIO', 'ENTREGADO', fechaToday, horaToday, username],
                        (err, res) => {
                            if (err) {
                                console.log(err)
                            } else {

                                db.query("INSERT INTO bitacora (id, nombre, apellidos, correoIns, username, municipio, fecha, hora, id_user, tabla_movimiento) VALUES (?,?,?,?,?,?,?,?,?,?)",
                                    ['', nombre, apellidos, correoIns, username, municipio, fechaToday, horaToday, idUser, 'Inserción en Vehículo Entregado'],
                                    (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            db.query("DELETE FROM vehiculo_entregado_temporal WHERE ID_ALTERNA = ?", alternaEntrega,
                                                (err, result) => {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {

                                                    }
                                                }
                                            )
                                        }
                                    }
                                )
                            }
                        }
                    )

                }
            }
        )
    }

})


//traer registros de temporales

app.get('/registro_temp', (req, res) => {
    const sql = "SELECT * FROM temporal_vr ORDER BY ID_ALTERNA DESC LIMIT 6";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

//traer ultimo registro  GET

app.get('/ultimo', (req, res) => {
    const sql = "SELECT ID_ALTERNA FROM `vehiculo_robado` ORDER BY ID_ALTERNA DESC LIMIT 1";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})


//fecha

app.get('/fecha/:id', (req, res) => {
    const pro = req.params.id;
    db.query("SELECT DATE_FORMAT(FECHA_AVERIGUA,'%Y-%m-%d') as fecha FROM temporal_vr where ID_TEMPORAL= ?", pro, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})


//fecha robo

app.get('/fechaRobo/:id', (req, res) => {
    const pro = req.params.id;
    db.query("SELECT DATE_FORMAT(FECHA_ROBO,'%Y-%m-%d') as fecha FROM temporal_vr where ID_TEMPORAL= ?", pro, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

//seleccion por id sin revisar

app.get('/bId/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM temporal_vr WHERE ID_TEMPORAL=?", id, (err, result) => {
        if (err) {
            console.log("sindatos");
        } else {
            res.send(result);
        }
    })
})

app.get('/bId2/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM vehiculo_robado WHERE ID_ALTERNA=?", id, (err, result) => {
        if (err) {
            console.log("sindatos");
        } else {
            res.send(result);
        }
    })
})

//seleccion modalidad por id sin revisar
app.get('/moda/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT tipo FROM modalidad_robo WHERE id=?", id, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

//entidad

app.get('/entirobo/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT ENTIDAD FROM entidades WHERE ID_ENTIDAD= ?", id, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

// select anidados entidad municipio
app.get('/entidades', (req, res) => {
    const sql = "SELECT * FROM entidades";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

// tipo lugar

app.get('/tipolugar', (req, res) => {
    const sql = "SELECT * FROM tipo_lugar";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/municipios/:id_entidad', async (req, res) => {
    //const id_entidad_recupera = req.body.id_entidad;
    const id_entidad = req.params.id_entidad;
    const sql = ("SELECT ENTIDAD, MUNICIPIO, ID_MUNICIPIO FROM municipios INNER JOIN entidades ON municipios.ID_ENTIDAD=" + req.params.id_entidad + " AND entidades.ID_ENTIDAD =" + req.params.id_entidad);
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err + "error del municipio ");
        } else {
            return res.json(data);
        }
    })
})

//muni

app.get('/munirobo/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT MUNICIPIO FROM municipios WHERE ID_MUNICIPIO= ?", id, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

// select anidados marca

app.get('/marca', (req, res) => {
    const sql = "SELECT * FROM catalogo_marca";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

app.get('/submarca/:id_marca', async (req, res) => {
    //const id_entidad_recupera = req.body.id_entidad;
    const id_entidad = req.params.id_marca;
    const sql = ("SELECT catalogo_marca.descripcion, submarcas.DESCRIPCION, submarcas.ID_SUBMARCA FROM catalogo_marca INNER JOIN submarcas ON submarcas.ID_MARCA=" + req.params.id_marca + " AND catalogo_marca.id_marca =" + req.params.id_marca);
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err + "error ");
        } else {
            return res.json(data);
        }
    })
})


//color

app.get('/color', (req, res) => {
    const sql = "SELECT * FROM color";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})


//tipo de uso

app.get('/tipouso', (req, res) => {
    const sql = "SELECT * FROM catalogo_tipouso";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

//procedencia

app.get('/procedencia', (req, res) => {
    const sql = "SELECT * FROM catalogo_procedencia";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

//marca

app.get('/m_marca/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT descripcion FROM catalogo_marca WHERE id_marca= ?", id, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})



//sub-marca

app.get('/subm/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT DESCRIPCION FROM submarcas WHERE ID_SUBMARCA = ?", id, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

//color

app.get('/color/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT DESCRIPCION, ID_COLOR FROM color WHERE ID_COLOR= ?", id, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

app.get('/serieAutomovil/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT SERIE, PLACA FROM vehiculo_robado WHERE ID_ALTERNA =?", id, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

app.get('/colorAutomovil/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT DESCRIPCION FROM color WHERE ID_COLOR =?", id, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

// Crear un registro POST

app.post("/temporal_crear", (req, res) => {
    procesado = 0;
    id_fuente = 10;
    const edo = req.body.edo;
    const fe = req.body.fe;
    const hora = req.body.hora;
    const id_alterna = req.body.id_alterna;
    const averiguacion = req.body.averiguacion;
    const fecha_averigua = req.body.fecha_averigua;
    const agencia_mp = req.body.agencia_mp;

    const agente_mp = req.body.agente_mp;
    const id_modalidad = req.body.id_modalidad;
    const fecha_robo = req.body.fecha_robo;

    const hora_robo = req.body.hora_robo;
    const calle_robo = req.body.calle_robo;
    const num_ext_robo = req.body.num_ext_robo;
    const colonia_robo = req.body.colonia_robo;

    const id_municipio_robo = req.body.id_municipio_robo;
    const id_entidad_robo = req.body.id_entidad_robo;
    const id_tipo_lugar = req.body.id_tipo_lugar;
    const nombre_den = req.body.nombre_den;
    const paterno_den = req.body.paterno_den;

    const calle_den = req.body.calle_den;
    const numext_dom_den = req.body.numext_dom_den;
    const colonia_den = req.body.colonia_den;
    const id_municipio_den = req.body.id_municipio_den;
    const id_entidad_den = req.body.id_entidad_den;
    const cp_den = req.body.cp_den;
    const placa = req.body.placa;

    const id_marca = req.body.id_marca;
    const id_submarca = req.body.id_submarca;
    const modelo = req.body.modelo;
    const id_color = req.body.id_color;
    const serie = req.body.serie;
    const id_tipo_uso = req.body.id_tipo_uso;
    const id_procedencia = req.body.id_procedencia;



    db.query("INSERT INTO temporal_vr (fecha,hora,id_alterna,id_fuente,averiguacion,fecha_averigua,agencia_mp, agente_mp, id_modalidad, fecha_robo, hora_robo, calle_robo, num_ext_robo, colonia_robo,id_municipio_robo , id_entidad_robo,id_tipo_lugar,nombre_den,paterno_den, calle_den, numext_dom_den, colonia_den, id_municipio_den, id_entidad_den, cp_den, placa,id_marca, id_submarca, modelo, id_color, serie, id_tipo_uso, id_procedencia, placa_ext   ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [fe, hora, id_alterna, id_fuente, averiguacion, fecha_averigua, agencia_mp, agente_mp, id_modalidad, fecha_robo, hora_robo, calle_robo, num_ext_robo, colonia_robo, id_municipio_robo,
            id_entidad_robo, id_tipo_lugar, nombre_den, paterno_den, calle_den, numext_dom_den, colonia_den, id_municipio_den, id_entidad_den, cp_den, placa,
            id_marca, id_submarca, modelo, id_color, serie, id_tipo_uso, id_procedencia, edo],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {

                //    db.query("INSERT INTO control_alterna (id_alterna, id_fuente, fecha, hora, procesado ) VALUES (?,?,?,?,?)",[ id_alterna, id_fuente, fe, hora, procesado ])
                res.send("registrado")

            }
        })
})

// para modificar
//video /users/:id
app.put("/modificar/:id", (req, res) => {
    const id = req.params.id;
    const query_u = "UPDATE temporal_vr SET AVERIGUACION=?,PLACA_EXT=?, FECHA_AVERIGUA=?,AGENCIA_MP=?,AGENTE_MP=?,ID_MODALIDAD=?,FECHA_ROBO=?,HORA_ROBO=?,CALLE_ROBO=?,NUM_EXT_ROBO=?,COLONIA_ROBO=?,ID_MUNICIPIO_ROBO=?,ID_ENTIDAD_ROBO=?,ID_TIPO_LUGAR=?,NOMBRE_DEN=?,PATERNO_DEN=?,CALLE_DEN=?,NUMEXT_DOM_DEN=?,COLONIA_DEN=?,ID_MUNICIPIO_DEN=?,ID_ENTIDAD_DEN=?,CP_DEN=?,PLACA=?,ID_MARCA=?,ID_SUBMARCA=?,MODELO=?,ID_COLOR=?,SERIE=?,ID_TIPO_USO=?,ID_PROCEDENCIA=?   WHERE ID_TEMPORAL=?"
    const values = [
        req.body.AVERIGUACION,
        req.body.FECHA_AVERIGUA,
        req.body.AGENCIA_MP,
        req.body.AGENTE_MP,
        req.body.ID_MODALIDAD,
        req.body.FECHA_ROBO,
        req.body.HORA_ROBO,
        req.body.CALLE_ROBO,
        req.body.NUM_EXT_ROBO,
        req.body.COLONIA_ROBO,
        req.body.ID_MUNICIPIO_ROBO,
        req.body.ID_ENTIDAD_ROBO,
        req.body.ID_TIPO_LUGAR,
        req.body.NOMBRE_DEN,
        req.body.PATERNO_DEN,
        req.body.CALLE_DEN,
        req.body.NUMEXT_DOM_DEN,
        req.body.COLONIA_DEN,
        req.body.ID_MUNICIPIO_DEN,
        req.body.ID_ENTIDAD_DEN,
        req.body.CP_DEN,
        req.body.PLACA,
        req.body.ID_MARCA,
        req.body.ID_SUBMARCA,
        req.body.MODELO,
        req.body.ID_COLOR,
        req.body.SERIE,
        req.body.ID_TIPO_USO,
        req.body.ID_PROCEDENCIA,
        req.body.PE
    ];

    db.query(query_u, [...values, id], (err, result) => {
        if (err) return res.send(err);
        return res.json(result)
    })
})

//tipo de uso

app.get('/tipo/:id', (req, res) => {
    const tipo = req.params.id;
    db.query("SELECT descripcion FROM catalogo_tipouso WHERE id_tipo_uso= ?", tipo, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})




//procedencia

app.get('/pro/:id', (req, res) => {
    const pro = req.params.id;
    db.query("SELECT descripcion FROM catalogo_procedencia WHERE id_procedencia = ?", pro, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

//tipo lugar

app.get('/tlugar/:id', (req, res) => {
    const tipo = req.params.id;
    db.query("SELECT descripcion FROM tipo_lugar WHERE id_tipo_lugar= ?", tipo, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})




app.post("/tabla_VR", (req, res) => {
    procesado = 0;
    id_fuente = 10;
    const fe = req.body.FECHA;
    const hora = req.body.HORA;
    const id_temporal = req.body.ID_TEMPORAL;
    const id_alterna = req.body.ID_ALTERNA;
    const averiguacion = req.body.AVERIGUACION;
    const fecha_averigua = req.body.FECHA_AVERIGUA;
    const agencia_mp = req.body.AGENCIA_MP;

    const agente_mp = req.body.AGENTE_MP;
    const id_modalidad = req.body.ID_MODALIDAD;
    const fecha_robo = req.body.FECHA_ROBO;

    const hora_robo = req.body.HORA_ROBO;
    const calle_robo = req.body.CALLE_ROBO;
    const num_ext_robo = req.body.NUM_EXT_ROBO;
    const colonia_robo = req.body.COLONIA_ROBO;

    const id_municipio_robo = req.body.ID_MUNICIPIO_ROBO;
    const id_entidad_robo = req.body.ID_ENTIDAD_ROBO;
    const id_tipo_lugar = req.body.ID_TIPO_LUGAR;
    const nombre_den = req.body.NOMBRE_DEN;
    const paterno_den = req.body.PATERNO_DEN;

    const calle_den = req.body.CALLE_DEN;
    const numext_dom_den = req.body.NUMEXT_DOM_DEN;
    const colonia_den = req.body.COLONIA_DEN;
    const id_municipio_den = req.body.ID_MUNICIPIO_DEN;
    const id_entidad_den = req.body.ID_ENTIDAD_DEN;
    const cp_den = req.body.CP_DEN;
    const placa = req.body.PLACA;
    const placa_ext = req.body.PLACA_EXT;

    const id_marca = req.body.ID_MARCA;
    const id_submarca = req.body.ID_SUBMARCA;
    const modelo = req.body.MODELO;
    const id_color = req.body.ID_COLOR;
    const serie = req.body.SERIE;
    const id_tipo_uso = req.body.ID_TIPO_USO;
    const id_procedencia = req.body.ID_PROCEDENCIA;


    db.query("INSERT INTO vehiculo_robado (ID_ALTERNA,ID_FUENTE,AVERIGUACION,FECHA_AVERIGUA,AGENCIA_MP,AGENTE_MP,ID_MODALIDAD,FECHA_ROBO,HORA_ROBO,CALLE_ROBO,NUM_EXT_ROBO,COLONIA_ROBO,ID_MUNICIPIO_ROBO,ID_ENTIDAD_ROBO,ID_TIPO_LUGAR,NOMBRE_DEN,PATERNO_DEN,CALLE_DEN,NUMEXT_DOM_DEN,COLONIA_DEN,ID_MUNICIPIO_DEN,ID_ENTIDAD_DEN,CP_DEN,PLACA,PLACA_EXTRANJERA,ID_MARCA,ID_SUBMARCA,MODELO,ID_COLOR,SERIE,ID_TIPO_USO,ID_PROCEDENCIA) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [id_alterna, id_fuente, averiguacion, fecha_averigua, agencia_mp, agente_mp, id_modalidad, fecha_robo, hora_robo, calle_robo, num_ext_robo, colonia_robo, id_municipio_robo,
            id_entidad_robo, id_tipo_lugar, nombre_den, paterno_den, calle_den, numext_dom_den, colonia_den, id_municipio_den, id_entidad_den, cp_den, placa, placa_ext,
            id_marca, id_submarca, modelo, id_color, serie, id_tipo_uso, id_procedencia],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {

                db.query("INSERT INTO control_alterna (ID_ALTERNA,ID_FUENTE,FECHA,HORA,PROCESADO) VALUES (?,?,?,?,?)", [id_alterna, id_fuente, fe, hora, procesado],

                    (err, result) => {
                        if (err) {   ///
                            console.log("error en el segundo query")
                        } else {
                            db.query("DELETE FROM `temporal_vr` WHERE  ID_TEMPORAL=?", id_temporal)
                        }
                    })
            }
        })
})





app.get('/nombres/:color', (req, res) => {
    const idColor = req.params.color;
    db.query("SELECT DESCRIPCION FROM color WHERE ID_COLOR = ?", idColor, (err, result) => {
        if (err) {
            console.log("sindatos");
        } else {
            res.send(result);
        }
    })
})

app.get('/entidad/:entidad', (req, res) => {
    const idEntidad = req.params.entidad;
    db.query("SELECT ENTIDAD FROM entidades WHERE ID_ENTIDAD = ?", idEntidad, (err, result) => {
        if (err) {
            console.log("sindatos");
        } else {
            res.send(result);
        }
    })
})

app.get('/municipio/:municipio', (req, res) => {
    const idMunicipio = req.params.municipio;
    db.query("SELECT MUNICIPIO FROM municipios WHERE ID_MUNICIPIO = ?", idMunicipio, (err, result) => {
        if (err) {
            console.log("sindatos");
        } else {
            res.send(result);
        }
    })
})



app.get("/maxId", (req, res) => {
    db.query("SELECT MAX(ID_ALTERNA) AS id FROM vehiculo_recuperado"), (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    }

    console.log(result)
})

app.get("/recuperado/:id?", (req, res) => {
    const id = req.params.id
    db.query("SELECT * FROM vehiculo_recuperado WHERE ID_ALTERNA = ?", id, (err, result) => {
        if (err) {
            console.log("error trayendo data")
        } else {
            res.send(result)
        }
    })
})

//modalidad

app.get('/modalidad', (req, res) => {
    const sql = "SELECT * FROM  modalidad_robo";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/llenarRec', (req, res) => {
    const id = req.params.id
    db.query("SELECT * FROM vehiculo_recuperado_temporal", (err, result) => {
        if (err) {
            console.log("error trayendo data")
        } else {
            res.send(result)
        }
    })
})

app.get('/llenar/:id?', (req, res) => {
    const id = req.params.id
    db.query("SELECT INSPECCION FROM vehiculo_entregado_temporal WHERE ID_ALTERNA = ?", id, (err, result) => {
        if (err) {
            console.log("error trayendo data")
        } else {
            res.send(result)
        }
    })
})

app.get("/entregado/:id?", (req, res) => {
    const id = req.params.id
    db.query("SELECT * FROM vehiculo_entregado WHERE ID_ALTERNA = ?", id, (err, result) => {
        if (err) {
            console.log("error trayendo data")
        } else {
            res.send(result)
        }
    })
})



//seleccion por id

app.get('/buscarId/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM registro WHERE id= ?", id, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

app.get('/recuRevision/:id/:color/:entidad/:municipio', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM vehiculo_recuperado_temporal WHERE ID_ALTERNA = ?", id, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

app.get('/entregadoRevision/:id/:inspeccion/:entidad/:municipio', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM vehiculo_entregado_temporal WHERE ID_ALTERNA = ?", id, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

app.get('/recuRevisionTodo', (req, res) => {
    db.query("SELECT * FROM vehiculo_recuperado_temporal", (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

app.get('/recuEntregaTodo', (req, res) => {
    db.query("SELECT * FROM vehiculo_entregado_temporal", (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

app.get('/fechaRobado/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT FECHA_ROBO FROM vehiculo_robado WHERE ID_ALTERNA= ?", id, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

app.get('/fechaRecuperado/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT FECHA_REC FROM vehiculo_recuperado WHERE ID_ALTERNA= ?", id, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

// Middleware para verificar el token en las solicitudes protegidas
function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token.replace('Bearer ', ''), secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token no válido' });
        }
        req.userId = decoded.userId;
        next();
    });
}

app.post('/login', (req, res) => {
    const privilegios = req.body.privilegios
    const { username, password } = req.body;

    // Realiza una consulta a la base de datos para verificar las credenciales
    const query = 'SELECT * FROM usuarios WHERE username = ?';

    db.query(query, [username], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al buscar usuario en la base de datos' });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ error: 'Usuario no encontrado' });
            return;
        }

        const user = results[0];

        if (password != user.password) {
            res.status(401).json({ error: "Usuario o contraseña incorrectos" });

        } else {
            // Si el usuario se autentica correctamente, emitimos un token JWT
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '8h' });

            res.json({ token });
        }


    });
});

app.post('/passwordSuperUsuario', (req, res) => {
    const { password, username } = req.body;

    // Realiza una consulta a la base de datos para verificar las credenciales
    const query = 'SELECT * FROM usuarios WHERE username = ?';

    db.query(query, [username], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al buscar usuario en la base de datos' });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ error: 'Usuario no encontrado' });
            return;
        }

        const user = results[0];

        if (password != user.superuserpass) {
            res.status(401).json({ error: "Usuario o contraseña incorrectos" });

        } else {
            res.json()
        }


    });
});

app.get('/todosDatos', verifyToken, (req, res) => {
    const userId = req.userId;

    const sql = "SELECT * FROM usuarios WHERE id = ?";
    db.query(sql, [userId], (err, data) => {
        if (!sql) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(data);
    })
});

// para modificar
//video /users/:id
app.post("/modificarRecuperado/:id", (req, res) => {
    const id = req.params.id;
    const query_u = "UPDATE vehiculo_recuperado SET `CALLE_REC`=?, `NUMEXT_REC`=?, `COLONIA_REC`=?, `CP_REC`=?, `SERIE`=?, `PLACA`=?, `ID_ENTIDAD_RECUPERA`=?, `ID_MUNICIPIO_REC`=?, `ID_COLOR`=?, `FECHA_REC`=?, `HORA_REC`=? WHERE ID_ALTERNA=? ";
    const values = [
        req.body.calle_rec,
        req.body.numext_rec,
        req.body.colonia_rec,
        req.body.cp_rec,
        req.body.serie,
        req.body.placa,
        req.body.id_entidad_recupera,
        req.body.id_municipio_rec,
        req.body.id_color,
        req.body.fecha_rec,
        req.body.hora_rec
    ];
    db.query(query_u, [...values, id], (err, result) => {
        if (err) return res.send(err);
        return res.json(result)
    })
})

app.post("/modificarEntregado/:id", (req, res) => {
    const id = req.params.id;
    const query_u = "UPDATE vehiculo_entregado SET `CALLE_ENTREGA`, `COLONIA_ENTREGA`, `CP_ENTREGA`, `SERIE`, `MOTOR`, `FACTURA_VEHICULO`, `NOMBRE_ENTREGA`, `PATERNO, ENTREGA`, `COMPROB_DOMIC_PROP`, `ID_ENTIDAD_ENTREGA`, `ID_MUNICIPIO_ENTREGA`, `INSPECCION`, `FECHA_ENTREGA`, `HORA_ENTREGA`, `PERSONA_ENTREGA` =?  WHERE ID_ALTERNA=? ";
    const values = [
        req.body.calle_entrega,
        req.body.colonia_entrega,
        req.body.cp_entrega,
        req.body.serie,
        req.body.motor,
        req.body.factura_vehiculo,
        req.body.nombre_entrega,
        req.body.paterno_entrega,
        req.body.comprob_domic_prop,
        req.body.id_entidad_entrega,
        req.body.id_municipio_entrega,
        req.body.inspeccion,
        req.body.fecha_entrega,
        req.body.hora_entrega,
        req.body.persona_entrega

    ];
    db.query(query_u, [...values, id], (err, result) => {
        if (err) return res.send(err);
        return res.json(result)
    })
})

// Crear un registro POST

app.post("/crear", (req, res) => {
    procesado = 0;
    id_fuente = 10;
    const fe = req.body.fe;
    const hora = req.body.hora;
    const id_alterna = req.body.id_alterna;
    const averiguacion = req.body.averiguacion;
    const fecha_averigua = req.body.fecha_averigua;
    const agencia_mp = req.body.agencia_mp;

    const agente_mp = req.body.agente_mp;
    const id_modalidad = req.body.id_modalidad;
    const fecha_robo = req.body.fecha_robo;

    const hora_robo = req.body.hora_robo;
    const calle_robo = req.body.calle_robo;
    const num_ext_robo = req.body.num_ext_robo;
    const colonia_robo = req.body.colonia_robo;

    const id_municipio_robo = req.body.id_municipio_robo;
    const id_entidad_robo = req.body.id_entidad_robo;
    const id_tipo_lugar = req.body.id_tipo_lugar;
    const nombre_den = req.body.nombre_den;
    const paterno_den = req.body.paterno_den;

    const calle_den = req.body.calle_den;
    const numext_dom_den = req.body.numext_dom_den;
    const colonia_den = req.body.colonia_den;
    const id_municipio_den = req.body.id_municipio_den;
    const id_entidad_den = req.body.id_entidad_den;
    const cp_den = req.body.cp_den;
    const placa = req.body.placa;

    const id_marca = req.body.id_marca;
    const id_submarca = req.body.id_submarca;
    const modelo = req.body.modelo;
    const id_color = req.body.id_color;
    const serie = req.body.serie;
    const id_tipo_uso = req.body.id_tipo_uso;
    const id_procedencia = req.body.id_procedencia;



    db.query("INSERT INTO vehiculo_robado (id_alterna,id_fuente,averiguacion,fecha_averigua,agencia_mp, agente_mp, id_modalidad, fecha_robo, hora_robo, calle_robo, num_ext_robo, colonia_robo,id_municipio_robo , id_entidad_robo,id_tipo_lugar,nombre_den,paterno_den, calle_den, numext_dom_den, colonia_den, id_municipio_den, id_entidad_den, cp_den, placa,id_marca, id_submarca, modelo, id_color, serie, id_tipo_uso, id_procedencia   ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [id_alterna, id_fuente, averiguacion, fecha_averigua, agencia_mp, agente_mp, id_modalidad, fecha_robo, hora_robo, calle_robo, num_ext_robo, colonia_robo, id_municipio_robo,
            id_entidad_robo, id_tipo_lugar, nombre_den, paterno_den, calle_den, numext_dom_den, colonia_den, id_municipio_den, id_entidad_den, cp_den, placa,
            id_marca, id_submarca, modelo, id_color, serie, id_tipo_uso, id_procedencia],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {


                db.query("INSERT INTO control_alterna (id_alterna, id_fuente, fecha, hora, procesado ) VALUES (?,?,?,?,?)", [id_alterna, id_fuente, fe, hora, procesado])
                res.send("registrado")

            }
        }
    )

})

app.post("/crearDatos", (req, res) => {

    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const municipio = req.body.municipio;
    const correoIns = req.body.correoIns;
    const contraseña = req.body.contraseña;
    const username = req.body.username
    let contraseñaSU = req.body.contraseñaSU

    if (contraseñaSU === undefined) {
        contraseñaSU = "HDUJhisdhfi889h9h/(&/(&/(/tyYDFGDFGAsfgg___??*][fdg"
    }



    db.query("INSERT INTO usuarios (id, nombre, apellidos, municipio, correoIns, username, password, superuserpass) VALUES (?,?,?,?,?,?,?,?)",
        ['', nombre, apellidos, municipio, correoIns, username, contraseña, contraseñaSU],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {

            }
        }
    )

})

app.post("/crearBitacora", (req, res) => {

    const nombre = req.body.nombre;

    db.query("INSERT INTO bitacora (id, nombre, apellidos, correoIns, username, municipio, fecha, hora) VALUES (?,?,?,?,?,?,?,?)",
        ['', 'nombre', 'apellidos', 'correoIns', 'username', 'municipio', 'fecha', 'hora'],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {

            }
        }
    )

})

app.listen(8081, () => {
    console.log("escuchando");
})
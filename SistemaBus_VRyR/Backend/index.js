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
    const sql = "SELECT * FROM vehiculo_robado";
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
app.get('/llenar', (req, res) => {
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
                    "INSERT INTO control_alterna (ID_ALTERNA, ID_FUENTE, TIPO_MOVIMIENTO, ESTATUS, FECHA, HORA) VALUES (?,?,?,?,?,?)",
                    [id_alterna, 10, 'CAMBIO', 'RECUPERADO', fechaToday, horaToday],
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

app.post("/crearEntregado", (req, res) => {

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
        "INSERT INTO vehiculo_entregado (ID_ALTERNA, ID_FUENTE, CALLE_ENTREGA, COLONIA_ENTREGA, ID_MUNICIPIO_ENTREGA, ID_ENTIDAD_ENTREGA, CP_ENTREGA, INSPECCION, ID_FUENTE_ENTREGA, FECHA_ENTREGA, HORA_ENTREGA, SERIE, MOTOR, FACTURA_VEHICULO, COMPROB_DOMIC_PROP, PERSONA_ENTREGA, NOMBRE_ENTREGA, PATERNO_ENTREGA) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [id_alterna, 10, calle_entrega, colonia_entrega, id_municipio_entrega, id_entidadid_entrega, cp_entrega, inspeccion, 10, fecha_entrega, hora_entrega, serie, motor, factura_vehiculo, comprob_domic_prop, persona_entrega, nombre_entrega, paterno_entrega],
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                db.query(
                    "INSERT INTO control_alterna (ID_ALTERNA, ID_FUENTE, TIPO_MOVIMIENTO, ESTATUS, FECHA, HORA) VALUES (?,?,?,?,?,?)",
                    [id_alterna, 10, 'CAMBIO', 'ENTREGADO', fechaToday, horaToday],
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
            console.log("contraseña incorrecta")
        } else {
            // Si el usuario se autentica correctamente, emitimos un token JWT
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '8h' });

            res.json({ token });
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

    db.query("INSERT INTO usuarios (id, nombre, apellidos, municipio, correoIns, username, password) VALUES (?,?,?,?,?,?,?)",
        ['', nombre, apellidos, municipio, correoIns, username, contraseña],
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
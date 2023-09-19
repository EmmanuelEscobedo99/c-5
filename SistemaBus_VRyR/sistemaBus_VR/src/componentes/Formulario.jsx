const formulario = document.getElementById('formulario')
const inputs = document.querySelectoraAll('#formulario input')

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}
const validarFormulario = (e) => {
	switch (e.target.name) {
		case "calle_rec":
			if(expresiones.usuario.test(e.target.value)){
				
			} else {
				document.getElementById('grupo_calle').classList.add('formulario_grupo-incorrecto')
			}
		break
	}
}

inputs.forEach((input)=>{
	input.addEventListener('keyup', validarFormulario)
	input.addEventListener('blur', validarFormulario)
})

formulario.addEventListener('submit', (e) => {
	e.preventDefault()
})

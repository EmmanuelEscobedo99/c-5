import { React, useEffect, useState } from 'react'
import "../archivosCss/formulario.css"

import { useNavigate } from 'react-router-dom'

export const Cargando = () => {
    const navigate = useNavigate()

    const CambiarComponente = () => {
        navigate("/TablaEntregado")
    }

    useEffect(() => {
        const inputs = document.querySelectorAll('.form-control-plaintext')
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i]
            setTimeout(() => {
                input.click()
            }, 5000)
        }
    }, [])

    return (
        <div className='bodyLogin'>
            <div className='area-form'>
                <div className='containerLogin'>
                    <form>
                        <div className="form-group">
                            <div className="brand-title">CARGANDO... </div>
                            <br></br>
                            <div className="brand-title2">Seras redirigido al login de faltantes por verificar... </div>
                            <br></br>
                            <img style={{ width: '300px' }} src='https://cdn.dribbble.com/users/330174/screenshots/2695600/comp_2.gif'></img>
                            <input className='form-control-plaintext' type='hidden' id='change' name='change' onClick={CambiarComponente} />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

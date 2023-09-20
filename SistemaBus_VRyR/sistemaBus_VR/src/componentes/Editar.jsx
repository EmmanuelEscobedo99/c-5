import React from 'react'

export const Editar = ({ recuperadoBD }) => {
    const titulo_componente = "Editar recuperados"
    const results = []
    console.log("DATOS RECUPERADOS YUJUUUUU", { recuperadoBD })
    return (
        <div className='edit_form'>
            <h3 className='title'>{titulo_componente}</h3>
            <form>
                {results.map(recuperadoBD => {
                    return (
                        <>
                            <label>CALLE:</label>
                            <input type='text' name='calle_rec' className='titulo_editado' defaultValue={recuperadoBD.CALLE_REC}></input>
                        </>
                    )
                })}
                <input type="submit" className='editar' value='Actualizar' />
            </form>
        </div>
    )
}

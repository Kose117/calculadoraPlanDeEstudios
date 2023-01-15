
export const getJson = async(path) => await(await fetch(path)).json();

export const putJson = async(path, body) => {
    return await(
        await fetch(path, {
            method: 'put',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        })
    ).json();
}

export const putClase = async(codigo, semestre = "No asignado", profesor = "No asignado", nota = 0) => {
    return await putJson('/json/clases', {codigo, semestre, profesor, nota});
}
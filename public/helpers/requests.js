
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

export const putClase = async(codigo, semestre = 0, profesor = "", nota = 0) => {
    const msgs = [];
    msgs.push(await putJson('/json/clases', {codigo, semestre, profesor, nota}));
    msgs.push(await putJson('/json/carrera', {codigo, semestre}));
    return {msgs};
}
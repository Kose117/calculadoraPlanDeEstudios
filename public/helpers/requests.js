
export const getJson = async(path) => await(await fetch(path));

export const putJson = async(path, body) => {
    return await fetch(path, {
        method: 'put',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    });
}

export const deleteJson = async(path, body) => {
    return await fetch(path, {
        method: 'delete',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    });
}

export const putClase = async(codigo, semestre = 0, profesor = "", nota = 0) => {
    const clases_msg = await putJson('/json/clases', {codigo, semestre, profesor, nota}),
        carrera_msg = await putJson('/json/carrera', {codigo, semestre});
    const msgs = [
        {
            status: clases_msg.status,
            msg: await clases_msg.json()
        }, {
            status: carrera_msg.status,
            msg: await carrera_msg.json()
        }
    ];
    return {msgs};
}

export const delClase = async(codigo, semestre) => {
    const clases_msg = await deleteJson('/json/clases', {codigo}),
        carrera_msg = await deleteJson('/json/carrera', {codigo, semestre});
    const msgs = [
        {
            status: clases_msg.status,
            msg: await clases_msg.json()
        }, {
            status: carrera_msg.status,
            msg: await carrera_msg.json()
        }
    ];
    return {msgs};
}

export const getJson = async(path) => await fetch(path);

export const putJson = async(path, body) => {
    return await fetch(path, {
        method: 'put',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    });
}
export const postJson = async(path, body) => {
    return await fetch(path, {
        method: 'post',
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

export const getClases = async() => {
    const clases_msg = await getJson('/json/clases');

    return await clases_msg.json();
}


export const getCarrera = async() => {
    const carrera_msg = await getJson('/json/carrera');

    return await carrera_msg.json();
}
export const putDefinitivaSemestre=async(semestre, definitiva)=>
{
    const carrera_msg = await putJson('/json/carrera/definitiva', {
        nuevaDefinitiva:definitiva,
        semestre
    });
    const msg = {
        status: carrera_msg.status,
        msg: await carrera_msg.json()
    }

    return {msg};
}

export const putClase = async(codigo, semestre = 0, profesor = "", nota = {definitiva: 0, notas: []}) => {
    const clases_msg = await putJson('/json/clases', {
        codigo,
        semestre,
        profesor,
        nota: nota.definitiva
    });

    const carrera_msg = await putJson('/json/carrera', {
        codigo,
        semestre,
        nota
    });

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

export const putCarrera = async(codigo, semestre = 0, profesor = '', nota = {definitiva: 0, notas: []}) => {
    const carrera_msg = await putJson('/json/carrera', {
        codigo,
        semestre,
        nota
    });

    const msg = {
        status: carrera_msg.status,
        msg: await carrera_msg.json()
    }

    return {msg};
}

export const delClase = async(codigo, semestre) => {
    const clases_msg = await deleteJson('/json/clases', {
        codigo
    });

    const carrera_msg = await deleteJson('/json/carrera', {
        codigo,
        semestre
    });

    const msgs = [
        {
            status: clases_msg.status,
        }, {
            status: carrera_msg.status,
            msg: await carrera_msg.json()
        }
    ];
    return {msgs};
}
export const carreraJsonPost = async(codigo,semestre,definitiva,tipo,creditos,nombre,departamento,profesor)=>
{
    const resp = await postJson('/json/carrera', {
        codigo,
        semestre,
        definitiva,
        tipo,
        creditos,
        nombre,
        departamento,
        profesor
    });
    return {mesg:await(resp.json())};
}
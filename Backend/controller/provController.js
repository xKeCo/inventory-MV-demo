const db = require('../db');

const allProviders = async (req, res) => {
    try {
        const result = await db.query('SELECT prov_id, name_prov, number, other_contact FROM proveedor');
        res.status(200).json(
            {
                status: 'Success',
                query: result.rows,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrio un error al consultar los proveedores' });
    }
}

const newProvider = async (req, res) => {
    const { name_prov, number, other_contact } = req.body;

    const provExists = await db.query('SELECT * FROM proveedor WHERE name_prov = $1', [name_prov]);
    let provider = provExists.rows[0];

    if (provider) {
        res.json({ msg: 'Ya hay un proveedor registrado con ese nombre.' });
    } else {
        try {
            const response = await db.query('INSERT INTO proveedor (name_prov, number, other_contact) VALUES ($1, $2, $3) RETURNING *', [name_prov, number, other_contact]);
            res.status(200).json(
                {
                    status: 'Success',
                    proveedor: response.rows[0]
                }
            )
        } catch (error) {
            res.status(500).json({ msg: ' Ocurrio un error al agregar el proveedor' });
        }
    }

}

const updateProvider = async (req, res) => {
    const { id } = req.params;
    const { name_prov, number, other_contact } = req.body;

    const provExists = await db.query('SELECT * FROM proveedor WHERE prov_id = $1', [id]);
    let provider = provExists.rows[0];

    provider.name_prov = name_prov || provider.name_prov;
    provider.number = number || provider.number;
    provider.other_contact = other_contact || provider.other_contact;

    try {
        const response = await db.query('UPDATE proveedor SET name_prov = $1, number = $2, other_contact = $3 WHERE prov_id = $4 RETURNING *', [name_prov, number, other_contact, id]);
        res.status(200).json(
            {
                status: 'Success',
                proveedor: response.rows[0]
            }
        )
    } catch (error) {
        res.status(500).json({ msg: 'Ocurrio un error al actualizar el proveedor' });
        console.log(error);
    }
}

const deleteProvider = async (req, res) => {
    const { id } = req.params;

    const provExists = await db.query('SELECT * FROM proveedor WHERE prov_id = $1', [id]);
    let provider = provExists.rows[0];

    if (!provider) {
        const error = Error('El proveedor no existe');
        return res.status(404).json({ msg: error.message });
    }

    try {
        const result = await db.query('DELETE FROM proveedor WHERE prov_id = $1 RETURNING *', [id]);
        res.status(201).json(
            {
                status: 'Success',
                proveedor: result.rows[0]
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrio un error al eliminar el proveedor' });
    }
}

module.exports = { allProviders, newProvider, updateProvider, deleteProvider };
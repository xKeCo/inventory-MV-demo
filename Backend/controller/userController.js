const db = require('../db');
const bcrypt = require('bcrypt');
const generateJWT = require('../helpers/jwtUser.js');

const login = async (req, res) => {
    const { username, password } = req.body;

    const userExists = await db.query('SELECT username, name, email, type, password FROM usuario WHERE username = $1', [username]);
    let user = userExists.rows[0];

    if (!user) {
        const error = new Error('El usuario no se encuentra registrado en la base de datos.');
        res.status(404).json({ msg: error.message });
        return;
    }

    if (await bcrypt.compare(password, user.password)) {
        let token = generateJWT(user.username);

        res.json({
            username: user.username,
            name: user.name,
            email: user.email,
            type: user.type,
            token
        });
    };
};

const createUser = async (req, res) => {
    const { username, name, email, type, password } = req.body;

    const userExist = await db.query('SELECT username FROM usuario WHERE username = $1', [username]);
    let user = userExist.rows[0];

    if (user) {
        const error = Error('El usuario ya se encuntra registrado');
        res.status(404).json({ msg: error.message });
    } else {
        try {
            const hashedPass = await bcrypt.hash(password, 10);
            const result = await db.query(
                'INSERT INTO usuario (username, name, email, type, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [username, name, email, type, hashedPass]
            );
            res.status(200).json(
                {
                    status: 'Success',
                    user: result.rows[0]
                }
            )
        } catch (error) {
            console.log(error);
            const errorMessage = Error('Ocurrio un error al crear el usuario');
            res.status(404).json({ msg: errorMessage.message });
        }
    }
}

module.exports = { login, createUser };
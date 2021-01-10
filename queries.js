const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'streetfighter',
    password: 'postgres',
    port: 5432,
})

const getStreetfighter = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getStreetfighterById = (request, response) => {
    const id = parseInt(request.params.id);   
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) =>{
        if(error){
            throw error;
        }
        response.status(200).json(results.rows)
    });
}

const createStreetfighter = (request, response) => {
    const {name, nickname, power, health, mobility, techniques, range, occupation, style, skill, image} = request.body;

    pool.query('INSERT INTO users (name, nickname, power, health, mobility, techniques, range, occupation, style, skill, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *', [name, nickname, power, health, mobility, techniques, range, occupation, style, skill, image], (error, results) =>{
        if(error){
            throw error;
        }
        response.status(200).json(results.rows)
    })
}

const updateStreetfighterById = (request, response) => {
    const {name, nickname, power, health, mobility, techniques, range, occupation, style, skill, image} = request.body;
    const id = parseInt(request.params.id);

    pool.query(`
    UPDATE users SET name = $1, nickname = $2,  power = $3, health = $4, mobility = $5, techniques = $6, range = $7, occupation = $8, style = $9, skill = $10, image = $11
    WHERE id = $12`,
    [name, nickname, power, health, mobility, techniques, range, occupation, style, skill, image, id],
    (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const deleteStreetfighterById = (request, response) =>{
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) =>{
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
        console.log(`Streetfighter with id:${id} was`)
    })
}

module.exports = {
    getStreetfighter,
    getStreetfighterById,
    createStreetfighter,
    deleteStreetfighterById,
    updateStreetfighterById
}
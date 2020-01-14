const axios = require('axios');
const Dev = require('../models/Devs.js')
const StringToArray = require ('./Utils/StringToArray')

module.exports = {
    async index(req, res) {
        return res.json(await Dev.find());
    },

    async store(req, res) {

    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
        const api_res = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name = login, avatar_url, bio } = api_res.data;
    
        const techsArray = StringToArray (techs)
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };
    
         dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        });
    }



    return res.json(dev);
}}
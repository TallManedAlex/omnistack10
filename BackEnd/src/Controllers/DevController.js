const axios = require('axios');
const Dev = require('../models/Devs.js')
const StringToArray = require ('../Utils/StringToArray')

module.exports = {
    async index(req, res) {
        return res.json(await Dev.find());
    },

    async store(req, res){
        const {github_username, techs, latitude, longitude} = req.body;

        let developer = await Dev.findOne({github_username});
        if(developer)
            return res.json(developer);
    
        const api_res = await axios.get(`https://api.github.com/users/${github_username}`);
        const { name = login, avatar_url, bio} = api_res.data;
    
        const arrayTechs = StringToArray(techs);
    
        const location = {
            type:`Point`,
            coordinates:[longitude, latitude]
        }
    
        developer = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs:arrayTechs,
            location
        });

        return res.json(developer);
    },

    async destroy(req, res){
        const { github_username } = req.body;
        await Dev.deleteOne({github_username});

        return res.json({message: "deletado com sucesso"});
    },

    async update(request, response){
        const {bio, github_username, avatar_url, techs, name} = request.body;
        const arrayTechs = StringToArray(techs);

        await Dev.update({github_username},{$set:{
            avatar_url,
            bio,
            techs:arrayTechs,
            name
        }})
        return response.json('conta atualizada')
    }
}
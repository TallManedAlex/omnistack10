const { Router } = require('express');
const DevController = require('./Controllers/DevController')
const SearchController = require('./Controllers/SearchController')

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.delete('/delete', DevController.destroy);
routes.put('/update', DevController.update);

routes.get('/search', SearchController.index);


module.exports = routes;
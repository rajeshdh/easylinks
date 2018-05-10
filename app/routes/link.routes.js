module.exports = (app) => {
    const links = require('../controllers/link.controller.js');
    
    // Create a new Link
    app.post('/link', links.create);
    
    // Retrieve all links
    app.get('/link', links.findAll);

    // Retrieve a single link with link id
    app.get('/link/:linkId', links.findOne);

    //Update a link with linkId
    app.put('/link/:linkId', links.update);

    // Delete a link with linkId
    app.delete('/link/:linkId', links.delete);

}
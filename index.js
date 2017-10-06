var ngsi = require('ngsi-parser');
var cb = require('ocb-sender');
var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var port = process.env.PORT || 8000;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

cb.config('http://207.249.127.149',1026,'v2'); 
cb.testConnect();

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

/*==================ROUTES=================
/api/entities				GET		Get all the entities.
/api/entities/:entity_type	POST	Create a entity with a ramdom ID.
/api/entities/:entity_type/:entity_id	POST Create a entity with a specific ID.
/api/entity/:entity_id	GET		Get a single entity.
/api/entity/:entity_id	DELETE	Delete a entity.
/api/entity/addAttribute/:entity_id    POST Add atribute to entity
/api/entity/updateJSONAttrEntity/:idEntity/:nameAttribute	PUT	Update a json object of a entity attribute.
/api/entity/updateEntityAttrs/:idEntity	PATCH	Update a json objects attributes of a entity.
/api/entity/updateEntityAttributeValue/:idEntity/:nameObjectAttribute/:val PUT update value attribute of the object to the entity*/

router.route('/')
.get((req, res) => {
	res.json({ message: 'Welcome to our api!' });   
});

router.route('/entities')
.get((req,res) =>{
	cb.listEntities()
	.then((result) => res.json(result))
	.catch((err) =>{res.status(404).send(err.toString())})
	
})

router.route('/entities/:entity_type')
.post((req, res) => {
	let id = Date.now().toString()
	let entity = ngsi.parseEntity(
		req.params.entity_type,
		id,
		req.body
	)
	cb.createEntity(entity)
	.then((result) => res.json({id : id}))
	.catch((err) =>{res.status(500).send(err.toString())})
}) 

router.route('/entities/:entity_type/:entity_id')
.post((req, res) => {
	//let id = Date.now().toString()
	let entity = ngsi.parseEntity(
		req.params.entity_type,
		req.params.entity_id,
		req.body
	)
	cb.createEntity(entity)
	.then((result) => res.json(result))
	.catch((err) =>{res.status(500).send(err.toString())})
}) 

router.route('/entity/:entity_id')
.delete((req, res) => {
	cb.deleteEntity(req.params.entity_id)
	.then((result) => res.json(result))
	.catch((err) => res.status(500).send(err.toString()))
})
.get((req,res) => {
	cb.getEntity(req.params.entity_id)
	.then((result) => res.json(result))
	.catch((err) => res.status(404).send(err.toString()))
})

router.route('/entity/addAttribute/:entity_id')
.post((req, res) => {
	let JSONAttribute = ngsi.parseAttrs(req.body)
	cb.addJSONAttributeToEntity(req.params.entity_id,JSONAttribute)
	.then((result) => res.json(result))
	.catch((err) =>{res.status(404).send(err.toString())})
}) 

router.route('/entity/updateJSONAttrEntity/:idEntity/:nameAttribute')
.put((req,res) =>{
	let jsonAttr = ngsi.parseValue(req.body)
	cb.updateJSONAttrEntity(req.params.idEntity,req.params.nameAttribute, jsonAttr)
	.then((result)=> res.json(result))
	.catch((err) => res.status(500).send(err.toString()))
})

router.route('/entity/updateEntityAttrs/:idEntity')
.patch((req,res) => {
	let jsonObjectAttrs = ngsi.parseAttrs(req.body)
	cb.updateEntityAttrs(req.params.idEntity, jsonObjectAttrs)
	.then((result)=> res.json(result))
	.catch((err) => res.status(500).send(err.toString()))
})

router.route('/entity/updateEntityAttributeValue/:idEntity/:nameObjectAttribute/:val')
.put((req,res) => {
	//let value = ngsi.parseValue(req.body);
	cb.updateEntityAttributeValue(req.params.idEntity,req.params.nameObjectAttribute,req.params.val)
	.then((result)=> res.json(result))
	.catch((err) => res.status(500).send(err.toString()))
})

// Middleware for Handle 404 - Keep this as a last route
app.use(function(req, res, next) {
    res.status(400);
    res.send('404 : Request Not Found, check the URL or the parameters sended');
});

// START THE SERVER
// =============================================================================

app.listen(port);

console.log('FIWARENGSIv2 RESTful API server started on: ' + port);


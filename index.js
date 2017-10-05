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

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our api!' });   
});

//==================ROUTES=================
//  /api/entities																				GET		Get all the entities.
//  /api/entities																				POST	Create a entity.
//  /api/entity/:entity_id																		GET		Get a single entity.
//  /api/entity/:entity_id																		DELETE	Delete a entity.
//  /api/entity/updateJSONAttrEntity/:idEntity/:nameAttribute/:jsonAttr							PUT		Update a json object of a entity attribute.
//  /api/entity/updateEntityAttrs/:idEntity/:jsonObjectAttrs									PATCH	Update a json objects attributes of a entity.
//	/api/entity/updateEntityAttributeValue/:idEntity/:nameObjectAttribute/:attrOfObject/:val 	PUT     Update a attribute that includes json object attribute of the entity.

router.route('/entities')
.get((req,res) =>{
	cb.listEntities()
	.then((result) => res.json(result))
	.catch((err) =>{res.status(500).send(err.toString())})
	
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
	let id = Date.now().toString()
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
.delete((req, res) =>{
	cb.deleteEntity(req.params.entity_id)
	.then((result) => res.json(result))
	.catch((err) =>{res.status(500).send(err.toString())})
})
.get((req,res) =>{
	cb.getEntity(req.params.entity_id)
	.then((result) => res.json(result))
	.catch((err) =>{res.status(500).send(err.toString())})
})

router.route('/entity/updateJSONAttrEntity/:idEntity/:nameAttribute/:jsonAttr')
.put((req,res) =>{

})
router.route('/entity/updateEntityAttrs/:idEntity/:jsonObjectAttrs')
.patch((req,res) =>{

})
router.route('/entity/updateEntityAttributeValue/:idEntity/:nameObjectAttribute/:attrOfObject/:val')
.put((req,res) =>{

})

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================

app.listen(port);

console.log('FIWARENGSIv2 RESTful API server started on: ' + port);


var ngsi = require('ngsi-parser');
var cb = require('ocbjslibrary');
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

// configure app to use bodyParser()
// this will let us get the data from a POST
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

cb.config('http://207.249.127.149',1026,'v2'); 
cb.testConnect();

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
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
	.post(function(req, res){

	}) 
	.get(function(req,res){
		res.send(cb.listEntities());
	})
router.route('/entity/:entity_id')
	.delete(function(req, res){
		
	})
	.get(function(req,res){
	
	})
router.route('/entity/updateJSONAttrEntity/:idEntity/:nameAttribute/:jsonAttr')
	.put(function(req,res){

	})
router.route('/entity/updateEntityAttrs/:idEntity/:jsonObjectAttrs')
	.patch(function(req,res){

	})
router.route('/entity/updateEntityAttributeValue/:idEntity/:nameObjectAttribute/:attrOfObject/:val')
	.put(function(req,res){
	
	})

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================

app.listen(port);

console.log('FIWARENGSIv2 RESTful API server started on: ' + port);

/*
var entidad = ngsi.parseEntity('Room', 'RoomPrueba',{
		temperature : {
			metadata : {
				acurrency : 0.8
			},
			value : 26.5
		}
	})
console.log(JSON.stringify(entidad))
cb.createEntity(entidad)

var update = ngsi.parseAttrs({
	temperature :50
})
console.log(update)
cb.updateEntityAttrs('RoomPrueba', update)

var updateValue = ngsi.parseValue(55.6)
console.log(updateValue)

cb.updateJSONAttrEntity('RoomPrueba', 'temperature', updateValue)
*/


/*
cb.createEntity(ngsi.parseEntity('Room', 'RoomPrueba2',{
	temperature : {
		metadata : {
			acurrency : 0.8
		},
		value : 26.5
	}
}))

cb.updateEntityAttrs('RoomPrueba2',ngsi.parseUpdate({
	temperature :50
}))

cb.updateJSONAttrEntity('RoomPrueba2', 'temperature', ngsi.parseValue(55.6))
*/

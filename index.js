var express = require('express');
var ngsi = require('ngsi-parser');
var cb = require('ocbjslibrary');

cb.config('http://207.249.127.149',1026,'v2'); 
cb.testConnect();
var app = express();

var _index = require('./routes/index');
var _delete = require('./routes/delete');
var _create = require('./routes/create');
var _list = require('./routes/list');
var _JSONAttrEntity = require('./routes/updateJSONAttrEntity');
var _AttributeValue = require('./routes/updateEntityAttributeValue');
var _EntityAttrs = require('./routes/updateEntityAttrs');



app.use('/index', _index);
app.use('/create', _create);
app.use('/delete', _delete);
app.use('/list', _list);
app.use('/updateJSONAttrEntity', _JSONAttrEntity);
app.use('/updateEntityAttributeValue', _AttributeValue);
app.use('/updateEntityAttrs', _EntityAttrs);


app.listen(3000, () => console.log('listening on *:3000'));

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

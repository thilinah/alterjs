var ActionHandlerFacade = require('../common/ActionHandler').ActionHandlerFacade;
var ActionHandler = require('../common/ActionHandler').ActionHandler;

function ServiceActionHandlerFacade(actionGroup) {
	this.uber('setData',actionGroup);
};

ServiceActionHandlerFacade.inherits(ActionHandlerFacade);

ServiceActionHandlerFacade.method('configureHandlers' , function() {
	this.addHandler(new EchoActionHandler());
});


/**
 * This class with echo the message parameter
 * @class: EchoActionHandler
 */

function EchoActionHandler() {
	
};

EchoActionHandler.inherits(ActionHandler);

EchoActionHandler.method('handle' , function(req, res, next, app, config) {
	var ActionResponse = require('../common/PlatformCommon').ActionResponse;
	var response = new ActionResponse(ActionResponse.SUCCESS, null, req.query.message);
	return response;
});

EchoActionHandler.method('getActionName' , function(config) {
	return "echo";
});



module.exports = ServiceActionHandlerFacade;
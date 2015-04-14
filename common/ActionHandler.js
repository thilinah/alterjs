function ActionHandler() {
};

ActionHandler.method('getActionName' , function(config) {
	
});

ActionHandler.method('handle' , function(req, res, next, app, config) {
	var ActionResponse = require('../common/PlatformCommon').ActionResponse;
	var response = new ActionResponse(ActionResponse.ERROR, null, "Not implemented");
	return response;
});


ActionHandler.method('registerRouter' , function(router) {
	var actionName = this.getActionName();
	if(!Object.isset(actionName)){
		return;
	}
	var routeCallback = function(req, res, next){
		var log = req.app.get('log');
		var config = require('../config');
		var urlParts = req.url.split("?");
		
		var response = this.actions[req.baseUrl.substring(1)].handlers[urlParts[0].substring(1)].handle(req, res, next, req.app, config);
		
		res.send(response.getJSON());
		
	};

	router.get('/'+actionName, routeCallback);

	return router;
});


/**
 * @class: ActionHandlerFacade
 * @returns
 */

function ActionHandlerFacade(actionGroup) {
	
};

ActionHandlerFacade.method('setData' , function(actionGroup) {
	this.handlers = {};
	this.actionGroup = actionGroup;
});

ActionHandlerFacade.method('configureHandlers' , function(actionGroup) {
	
});

ActionHandlerFacade.method('addHandler' , function(handler) {
	this.handlers[handler.getActionName()] = handler;
});

ActionHandlerFacade.method('registerRoutes' , function(app) {
	var index = null;
	var express = require('express');
	var router = express.Router();
	for(index in this.handlers){
		router = this.handlers[index].registerRouter(router);
	}
	app.use('/'+this.actionGroup, router);
});


module.exports = {
		'ActionHandlerFacade':ActionHandlerFacade,
		'ActionHandler':ActionHandler
};

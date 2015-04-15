function ActionHandler(auth) {
	if(auth == null || auth == undefined){
		//By default assume this require authentication
		this.auth = true;
	}else{
		this.auth = auth;
	}
};

ActionHandler.method('getActionName' , function(config) {
	
});

ActionHandler.method('process' , function(req, res, next, app, config) {
	var user = req.session.user;
	if(this.auth && !Object.isset(user)){
		var ActionResponse = require('../common/PlatformCommon').ActionResponse;
		return new ActionResponse(ActionResponse.ERROR, null, "Not loggedin");
	}
	return this.handle(user,req, res, next, app, config);
});

ActionHandler.method('handle' , function(user, req, res, next, app, config) {
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
		
		var response = this.actions[req.baseUrl.substring(1)].handlers[urlParts[0].substring(1)].process(req, res, next, req.app, config);
		
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

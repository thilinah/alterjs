Object.extend = function(destination, source) {
    for (var property in source) {
        if (source.hasOwnProperty(property)) {
            destination[property] = source[property];
        }
    }
    return destination;
};

Object.empty = function(data){
	if(data == undefined || data == null || data == ""){
		return true;
	}
	
	if(Object.prototype.toString.call(data) === '[object Array]'  && data.length > 0) {
		if(data.length != undefined && data.length != null){
			if(data.length > 0){
				return false;
			}
		}else{
			for (key in obj) {
		        if (obj.hasOwnProperty(key)){
		        	return false;
		        }
		    }
			//No keys found, Consider as empty
			return true;
		}
	}
	
	return false;
};

Object.isset = function(data){
	if(data == undefined || data == null){
		return false;
	}
	return true;
};


//Changes to date object

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + global.twoDigits(1 + this.getUTCMonth()) + "-" + global.twoDigits(this.getUTCDate()) + " " + global.twoDigits(this.getUTCHours()) + ":" + global.twoDigits(this.getUTCMinutes()) + ":" + global.twoDigits(this.getUTCSeconds());
};

Date.createFromMysql = function(mysqlDate)
{ 
   if(typeof mysqlDate === 'string')
   {
      var t = mysqlDate.split(/[- :]/);
      return new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);          
   }

   return null;   
};

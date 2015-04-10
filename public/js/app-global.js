var uploadId="";
var uploadAttr="";
var popupUpload = null;

function showUploadDialog(id,msg,group,user,postUploadId,postUploadAttr,postUploadResultAttr,fileType){
	var ts = Math.round((new Date()).getTime() / 1000);
	uploadId = postUploadId;
	uploadAttr = postUploadAttr;
	uploadResultAttr = postUploadResultAttr;
	var html='<div><iframe src="'+CLIENT_BASE_URL+'fileupload_page.php?id=_id_&msg=_msg_&file_group=_file_group_&file_type=_file_type_&user=_user_" frameborder="0" scrolling="no" width="300px" height="55px"></iframe></div>';
	var html = html.replace(/_id_/g,id);
	var html = html.replace(/_msg_/g,msg);
	var html = html.replace(/_file_group_/g,group);
	var html = html.replace(/_user_/g,user);
	var html = html.replace(/_file_type_/g,fileType);

	modJs.renderModel('upload',"Upload File",html);
	$('#uploadModel').modal('show');
	
}

function closeUploadDialog(success,error,data){
	var arr = data.split("|");
	var file = arr[0];
	var fileBaseName = arr[1];
	var fileId = arr[2];
	
	if(success == 1){
		//popupUpload.close();
		$('#uploadModel').modal('hide');
		if(uploadResultAttr == "url"){
			if(uploadAttr == "val"){
				$('#'+uploadId).val(file);
			}else if(uploadAttr == "html"){
				$('#'+uploadId).html(file);
			}else{
				$('#'+uploadId).attr(uploadAttr,file);
			}
			
		}else if(uploadResultAttr == "name"){
			if(uploadAttr == "val"){
				$('#'+uploadId).val(fileBaseName);
			}else if(uploadAttr == "html"){
				$('#'+uploadId).html(fileBaseName);
				$('#'+uploadId).attr("val",fileBaseName);
			}else{
				$('#'+uploadId).attr(uploadAttr,fileBaseName);
			}	
			$('#'+uploadId).show();	
			$('#'+uploadId+"_download").show();	
		}else if(uploadResultAttr == "id"){
			if(uploadAttr == "val"){
				$('#'+uploadId).attr(uploadAttr,fileId);
			}else if(uploadAttr == "html"){
				$('#'+uploadId).html(fileBaseName);
				$('#'+uploadId).attr("val",fileId);
			}else{
				$('#'+uploadId).attr(uploadAttr,fileId);
			}
			$('#'+uploadId).show();	
			$('#'+uploadId+"_download").show();	
		}
		
		
	}else{
		//popupUpload.close();
		$('#uploadModel').modal('hide');
	}
	
}

function download(name, closeCallback, closeCallbackData){

	var successCallback = function(data){	

		var link;
		var fileParts;
		var viewableImages = ["png","jpg","gif","bmp","jpge"]; 
		
		if(data['filename'].indexOf("https:") == 0){

			fileParts = data['filename'].split("?");
			fileParts = fileParts[0].split(".");
			
			link = '<a href="'+data['filename']+'" target="_blank">Download File <i class="icon-download-alt"></i> </a>';
			if(jQuery.inArray(fileParts[fileParts.length - 1], viewableImages ) >= 0) {
				link += '<br/><br/><img style="max-width:545px;max-height:350px;" src="'+data['filename']+'"/>';
			}	
		}else{
			fileParts = data['filename'].split(".");
			link = '<a href="'+modJs.getCustomActionUrl("download",{'file':data['filename']})+'" target="_blank">Download File <i class="icon-download-alt"></i> </a>';
			if(jQuery.inArray(fileParts[fileParts.length - 1], viewableImages ) >= 0) {
				link += '<br/><br/><img style="max-width:545px;max-height:350px;" src="'+modJs.getClientDataUrl()+data['filename']+'"/>';
			}
		}
		
		modJs.showMessage("Download File Attachment",link,closeCallback,closeCallbackData);		
	};
	
	var failCallback = function(data){
		modJs.showMessage("Error Downloading File","File not found");	
	};
	
	modJs.sendCustomRequest("file",{'name':name},successCallback,failCallback);
}

function randomString(length){
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    
    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }
    
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;	
}

function verifyInstance(key){
	var object = {};
	object['a'] = "verifyInstance";
	object['key'] = key;
	$.post(this.baseUrl, object, function(data) {
		if(data.status == "SUCCESS"){
			$("#verifyModel").hide();
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();	
			alert("Success: Instance Verified");
		}else{
			alert("Error: "+data.message);
		}
	},"json");
}
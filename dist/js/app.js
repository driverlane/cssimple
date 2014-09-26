/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse', []);

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').controller('BrowseController', function($scope, $routeParams, $rootScope, $location, csRepository) {

	// see if we've got an authenticated connection
	if (!csRepository.authenticated) {
		// todo authenticate
		
	}

	// get the container node
	var thisnode = $routeParams.id;
	if (!thisnode) {
		thisnode = $rootScope.startNode;
	}

	// get the details for the current container
	$scope.container = csRepository.getNode(thisnode);
	
	// get the nodes for the current container
	$scope.nodes = csRepository.getChildren(thisnode).data;

	// handles the click event for nodes
	$scope.openNode = function(type, id) {
		switch(type) {
			case 'Folder':
				$location.path('browse/' + id);
				break;
			default:
				// todo open this in the viewer
				console.log('open document ' + id);
				break;
		}
	};
});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('browse').directive('browseIcon', function() {

	return {
		restrict: 'A',
		replace: 'false',
		link: function(scope, el, atts) {
			var classes = 'browse-icon fa ';
			switch(atts.browseIcon.toString()) {
				case '141':
					classes += 'fa-home fa-3x';
					break;
				case '0':
					classes += 'fa-folder-open fa-3x';
					break;
				case '144':
					classes += 'fa-file-pdf-o fa-3x';
					break;
				default:
					classes += 'fa-bars fa-3x';
					break;
			}
			el.attr('class', classes);
			el.removeAttr('browse-icon');
		}
	};

});

/* glyphicons version

			var classes = 'browse-icon glyphicon ';
			switch(atts.browseIcon.toString()) {
				case '141':
					classes += 'glyphicon-home';
					break;
				case '0':
					classes += 'glyphicon-folder-close';
					break;
				case '144':
					classes += 'glyphicon-list-alt';
					break;
				default:
					classes += 'glyphicon-cog';
					break;
			}


/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
/* Dependencies

	The csLogin service relies on ui.bootstrap.modal module (from the angular-bootstrap library)

*/
	
angular.module('csRepository', []);

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csRepository').controller('LoginController', function($scope, $modalInstance, $timeout) {

	$scope.status = ' ';
	$scope.userError = false;

	/* sso functionality */
	
	$scope.ssoPath = '';
	// todo - get this from the service
	$scope.ssoStatus = false;

	// lets the timer know the sso iframe has loaded
	window.ssoLoaded = function() {
		$scope.ssoStatus = false;
	};

	// load the sso iframe if sso is enabled
	if ($scope.ssoStatus) {
		$scope.status = 'Attempting single sign on';
		// todo - get this from the service
		$scope.ssoPath = "/otcs/cs.exe";
	}
	else {
		$scope.status = 'Please enter your user name and password to continue';
	}
	
	/* login functionality */
	
	$scope.user = {};
	$scope.login = function () {
	
		// validate
		if (typeof $scope.user.name === 'undefined' || typeof $scope.user.password === 'undefined') {
			$scope.userError = true;
			return;
		}
		else {
			$scope.userError = false;
		}
		
		// attempt a login
		$scope.status = 'Logging in...';
		// todo - perform a username password login

		// pretend it's logging in
		$timeout(function() {}, 2000);
		
		// authenticated, so update the status and close
		$scope.status = 'Logging in';
		$timeout(function() {
			$modalInstance.close('authenticated');
		}, 1000);
	};
	
});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('csRepository').factory('csRepository', function() {

	var initialised = false;
	var apiPath = '';
	var authenticated = false;
	var ssoSupported = true;
	var token = '';

	var getNode = function(nodeId) {
		// todo - convert to real call
		return {"addable_types":[{"icon":"/img/webdoc/folder.gif","type":0,"type_name":"Folder"},{"icon":"/img/tinyali.gif","type":1,"type_name":"Shortcut"},{"icon":"/img/webattribute/16category.gif","type":131,"type_name":"Category"},{"icon":"/img/webdoc/cd.gif","type":136,"type_name":"Compound Document"},{"icon":"/img/webdoc/url.gif","type":140,"type_name":"URL"},{"icon":"/img/webdoc/doc.gif","type":144,"type_name":"Document"},{"icon":"/img/channel/16channel.gif","type":207,"type_name":"Channel"},{"icon":"/img/otemail/emailfolder.gif","type":751,"type_name":"E-mail Folder"}],"available_actions":[{"parameterless":false,"read_only":true,"type":"browse","type_name":"Browse","webnode_signature":null},{"parameterless":false,"read_only":false,"type":"update","type_name":"Update","webnode_signature":null}],"available_roles":[{"type":"audit","type_name":"Audit"},{"type":"categories","type_name":"Categories"}],"data":{"create_date":"2014-08-19T06:12:54","create_user_id":1000,"description":"","description_multilingual":{"en_US":""},"guid":null,"icon":"/img/webdoc/icon_library.gif","icon_large":"/img/webdoc/icon_library_large.gif","id":2000,"modify_date":"2014-09-02T03:03:03","modify_user_id":1000,"name":"Enterprise","name_multilingual":{"en_US":"Enterprise"},"owner_group_id":1001,"owner_user_id":1000,"parent_id":-1,"reserved":false,"reserved_date":null,"reserved_user_id":0,"type":141,"type_name":"Enterprise Workspace","volume_id":2000},"definitions":{"create_date":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"create_date","multi_value":false,"name":"Created","persona":"","read_only":true,"required":false,"type":-7,"type_name":"Date","valid_values":[],"valid_values_name":[]},"create_user_id":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"create_user_id","max_value":null,"min_value":null,"multi_value":false,"name":"Created By","persona":"user","read_only":false,"required":false,"type":2,"type_name":"Integer","valid_values":[],"valid_values_name":[]},"description":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"description","max_length":null,"min_length":null,"multiline":true,"multilingual":true,"multi_value":false,"name":"Description","password":false,"persona":"","read_only":false,"required":false,"type":-1,"type_name":"String","valid_values":[],"valid_values_name":[]},"guid":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"guid","multi_value":false,"name":"GUID","persona":"","read_only":false,"required":false,"type":-95,"type_name":"GUID","valid_values":[],"valid_values_name":[]},"icon":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"icon","max_length":null,"min_length":null,"multiline":false,"multilingual":false,"multi_value":false,"name":"Icon","password":false,"persona":"","read_only":false,"required":false,"type":-1,"type_name":"String","valid_values":[],"valid_values_name":[]},"icon_large":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"icon_large","max_length":null,"min_length":null,"multiline":false,"multilingual":false,"multi_value":false,"name":"Large Icon","password":false,"persona":"","read_only":false,"required":false,"type":-1,"type_name":"String","valid_values":[],"valid_values_name":[]},"id":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"id","max_value":null,"min_value":null,"multi_value":false,"name":"ID","persona":"node","read_only":false,"required":false,"type":2,"type_name":"Integer","valid_values":[],"valid_values_name":[]},"modify_date":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"modify_date","multi_value":false,"name":"Modified","persona":"","read_only":true,"required":false,"type":-7,"type_name":"Date","valid_values":[],"valid_values_name":[]},"modify_user_id":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"modify_user_id","max_value":null,"min_value":null,"multi_value":false,"name":"Modified By","persona":"user","read_only":false,"required":false,"type":2,"type_name":"Integer","valid_values":[],"valid_values_name":[]},"name":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"name","max_length":null,"min_length":null,"multiline":false,"multilingual":true,"multi_value":false,"name":"Name","password":false,"persona":"","read_only":false,"required":false,"type":-1,"type_name":"String","valid_values":[],"valid_values_name":[]},"owner_group_id":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"owner_group_id","max_value":null,"min_value":null,"multi_value":false,"name":"Owned By","persona":"group","read_only":false,"required":false,"type":2,"type_name":"Integer","valid_values":[],"valid_values_name":[]},"owner_user_id":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"owner_user_id","max_value":null,"min_value":null,"multi_value":false,"name":"Owned By","persona":"user","read_only":false,"required":false,"type":2,"type_name":"Integer","valid_values":[],"valid_values_name":[]},"parent_id":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"parent_id","max_value":null,"min_value":null,"multi_value":false,"name":"Parent ID","persona":"node","read_only":false,"required":false,"type":2,"type_name":"Integer","valid_values":[],"valid_values_name":[]},"reserved":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"reserved","multi_value":false,"name":"Reserved","persona":"","read_only":false,"required":false,"type":5,"type_name":"Boolean","valid_values":[],"valid_values_name":[]},"reserved_date":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"reserved_date","multi_value":false,"name":"Reserved","persona":"","read_only":false,"required":false,"type":-7,"type_name":"Date","valid_values":[],"valid_values_name":[]},"reserved_user_id":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"reserved_user_id","max_value":null,"min_value":null,"multi_value":false,"name":"Reserved By","persona":"member","read_only":false,"required":false,"type":2,"type_name":"Integer","valid_values":[],"valid_values_name":[]},"type":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"type","max_value":null,"min_value":null,"multi_value":false,"name":"Type","persona":"","read_only":true,"required":false,"type":2,"type_name":"Integer","valid_values":[],"valid_values_name":[]},"type_name":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"type_name","max_length":null,"min_length":null,"multiline":false,"multilingual":false,"multi_value":false,"name":"Type","password":false,"persona":"","read_only":true,"required":false,"type":-1,"type_name":"String","valid_values":[],"valid_values_name":[]},"volume_id":{"allow_undefined":false,"bulk_shared":false,"default_value":null,"description":null,"hidden":false,"key":"volume_id","max_value":null,"min_value":null,"multi_value":false,"name":"VolumeID","persona":"node","read_only":false,"required":false,"type":2,"type_name":"Integer","valid_values":[],"valid_values_name":[]}},"definitions_base":["create_date","create_user_id","description","guid","icon","icon_large","id","modify_date","modify_user_id","name","owner_group_id","owner_user_id","parent_id","reserved","reserved_date","reserved_user_id","type","type_name","volume_id"],"definitions_order":["id","type","type_name","name","description","parent_id","volume_id","guid","create_date","create_user_id","modify_date","modify_user_id","owner_user_id","owner_group_id","reserved","reserved_date","reserved_user_id","icon","icon_large"],"type":141,"type_info":{"advanced_versioning":false,"container":true},"type_name":"Enterprise Workspace"};
	};
	
	var getChildren = function (parentId) {
		// todo - convert to real call
		var first =  {"data":[{"volume_id":-2000,"id":7942,"parent_id":2000,"name":"Sandpit","type":0,"description":"","create_date":"2014-09-02T03:03:03","modify_date":"2014-09-07T21:49:40","reserved":false,"reserved_user_id":0,"reserved_date":null,"icon":"/img/webdoc/folder.gif","mime_type":null,"original_id":0,"wnd_owner":1000,"wnd_createdby":1000,"wnd_createdate":"2014-09-02T03:03:03","wnd_modifiedby":1000,"wnd_version":null,"wnf_readydate":null,"type_name":"Folder","container":true,"size":2,"perm_see":true,"perm_see_contents":true,"perm_modify":true,"perm_modify_attributes":true,"perm_modify_permissions":true,"perm_create":true,"perm_delete":true,"perm_delete_versions":true,"perm_reserve":true,"cell_metadata":{"data":{"menu":"api/v1/nodes/7942/actions","name":"api/v1/nodes/7942/nodes","type":""},"definitions":{"menu":{"body":"","content_type":"","display_hint":"menu","display_href":"","handler":"menu","image":"","method":"GET","name":"","parameters":{},"tab_href":""},"name":{"body":"","content_type":"","display_hint":"link","display_href":"","handler":"table","image":"","method":"GET","name":"Sandpit","parameters":{"is_default_action":true},"tab_href":""},"type":{"body":"","content_type":"","display_hint":"icon","display_href":"","handler":"","image":"/img/webdoc/folder.gif","method":"","name":"Folder","parameters":{},"tab_href":""}}},"menu":null,"size_formatted":"2 Items","reserved_user_login":null,"action_url":"/v1/actions/7942","parent_id_url":"/v1/nodes/2000","actions":[{"name":"Open","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=browse","children":{},"signature":"Browse"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Configure","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=editconfig&nexturl=","children":{},"signature":"EditConfig"},{"name":"Order Custom Views","url":"/otcs/cs.exe?func=srch.ordercustomviews&objId=7942&nexturl=","children":{},"signature":"OrderCustomViews"},{"name":"Rename","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=rename&nexturl=","children":{},"signature":"Rename"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Add to Favorites","url":"/otcs/cs.exe?func=ll&objid=7942&objaction=MakeFavorite&nexturl=","children":{},"signature":"MakeFavorite"},{"name":"Copy","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=copy&nexturl=","children":{},"signature":"Copy"},{"name":"Make Shortcut","url":"/otcs/cs.exe?func=ll&objType=1&objAction=Create&sourceID=7942&parentID=2000&nexturl=","children":{},"signature":"CreateAlias"},{"name":"Move","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=move&nexturl=","children":{},"signature":"Move"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Set Notification","url":"/otcs/cs.exe?func=notify.specificnode&Nodeid=7942&VolumeID=-2000&Subtype=0&Name=Sandpit&nexturl=","children":{},"signature":"SetNotification"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Make News","url":"/otcs/cs.exe?func=ll&objtype=208&objaction=create&createin&attachmentid=7942&nexturl=","children":{},"signature":"CreateNewsAndAttach"},{"name":"Pulse From Here","url":"/otcs/cs.exe?func=ll&objId=7942&objType=0&objAction=comment","children":{},"signature":"CommentFolder"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Permissions","url":"/otcs/cs.exe?func=ll&objAction=Permissions&objId=7942&id=7942&nexturl=","children":{},"signature":"Permissions"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Print","url":"/otcs/cs.exe?func=multifile.printmulti&nodeID_list=7942&nexturl=","children":{},"signature":"Print"},{"name":"Version Control","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=VersionControl&nexturl=","children":{},"signature":"VersionControl"},{"name":"WebDAV Folder View","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=webdavview","children":{},"signature":"WebDAVViewCmd"},{"name":"Zip & Download","url":"/otcs/cs.exe?func=multifile.zipdwnldmulti&nodeID_list=7942&nexturl=","children":{},"signature":"ZipDwnld"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Delete","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=delete&nexturl=","children":{},"signature":"Delete"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Properties","url":"","children":[{"children":{},"name":"General","signature":"Properties","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=properties&nexturl="},{"children":{},"name":"Audit","signature":"Audit","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=audit&nexturl="},{"children":{},"name":"Categories","signature":"InfoCmdCategories","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=attrvaluesedit&version=0&nexturl="},{"children":{},"name":"Classifications","signature":"Classifications","url":"/otcs/cs.exe?func=ll&objid=7942&objaction=Classifications&nexturl="},{"children":{},"name":"Columns","signature":"Columns","url":"/otcs/cs.exe?func=ll&objid=7942&objAction=columns&nexturl="},{"children":{},"name":"Holds","signature":"HoldsDetail","url":"/otcs/cs.exe?func=ll&objid=7942&objaction=HoldsDetail&nexturl="},{"children":{},"name":"Presentation","signature":"Catalog","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=catalog&nexturl="},{"children":{},"name":"Provenance","signature":"Provenance","url":"/otcs/cs.exe?func=ll&objid=7942&objaction=Provenance&nexturl="},{"children":{},"name":"Records Detail","signature":"RecordsDetail","url":"/otcs/cs.exe?func=ll&objid=7942&objaction=RecordsDetail&nexturl="},{"children":{},"name":"References","signature":"References","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=references&nexturl="},{"children":{},"name":"Security Clearance","signature":"SetRecmanSecurity","url":"/otcs/cs.exe?func=ll&objid=7942&objaction=SetRecmanSecurity&activeTab=1&nexturl="},{"children":{},"name":"WebDAV","signature":"WebDAVInfoCmd","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=webdavinfo&nexturl="},{"children":{},"name":"XReference","signature":"XReference","url":"/otcs/cs.exe?func=ll&objid=7942&objaction=XReference&nexturl="}],"signature":"PropertiesMenu"}]},{"volume_id":-2000,"id":8160,"parent_id":2000,"name":"System Configuration","type":0,"description":"","create_date":"2014-09-02T03:02:46","modify_date":"2014-09-02T03:02:46","reserved":false,"reserved_user_id":0,"reserved_date":null,"icon":"/img/webdoc/folder.gif","mime_type":null,"original_id":0,"wnd_owner":1000,"wnd_createdby":1000,"wnd_createdate":"2014-09-02T03:02:46","wnd_modifiedby":1000,"wnd_version":null,"wnf_readydate":null,"type_name":"Folder","container":true,"size":0,"perm_see":true,"perm_see_contents":true,"perm_modify":true,"perm_modify_attributes":true,"perm_modify_permissions":true,"perm_create":true,"perm_delete":true,"perm_delete_versions":true,"perm_reserve":true,"cell_metadata":{"data":{"menu":"api/v1/nodes/8160/actions","name":"api/v1/nodes/8160/nodes","type":""},"definitions":{"menu":{"body":"","content_type":"","display_hint":"menu","display_href":"","handler":"menu","image":"","method":"GET","name":"","parameters":{},"tab_href":""},"name":{"body":"","content_type":"","display_hint":"link","display_href":"","handler":"table","image":"","method":"GET","name":"System Configuration","parameters":{"is_default_action":true},"tab_href":""},"type":{"body":"","content_type":"","display_hint":"icon","display_href":"","handler":"","image":"/img/webdoc/folder.gif","method":"","name":"Folder","parameters":{},"tab_href":""}}},"menu":null,"size_formatted":"0 Items","reserved_user_login":null,"action_url":"/v1/actions/8160","parent_id_url":"/v1/nodes/2000","actions":[{"name":"Open","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=browse","children":{},"signature":"Browse"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Configure","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=editconfig&nexturl=","children":{},"signature":"EditConfig"},{"name":"Order Custom Views","url":"/otcs/cs.exe?func=srch.ordercustomviews&objId=8160&nexturl=","children":{},"signature":"OrderCustomViews"},{"name":"Rename","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=rename&nexturl=","children":{},"signature":"Rename"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Add to Favorites","url":"/otcs/cs.exe?func=ll&objid=8160&objaction=MakeFavorite&nexturl=","children":{},"signature":"MakeFavorite"},{"name":"Copy","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=copy&nexturl=","children":{},"signature":"Copy"},{"name":"Make Shortcut","url":"/otcs/cs.exe?func=ll&objType=1&objAction=Create&sourceID=8160&parentID=2000&nexturl=","children":{},"signature":"CreateAlias"},{"name":"Move","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=move&nexturl=","children":{},"signature":"Move"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Set Notification","url":"/otcs/cs.exe?func=notify.specificnode&Nodeid=8160&VolumeID=-2000&Subtype=0&Name=System%20Configuration&nexturl=","children":{},"signature":"SetNotification"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Make News","url":"/otcs/cs.exe?func=ll&objtype=208&objaction=create&createin&attachmentid=8160&nexturl=","children":{},"signature":"CreateNewsAndAttach"},{"name":"Pulse From Here","url":"/otcs/cs.exe?func=ll&objId=8160&objType=0&objAction=comment","children":{},"signature":"CommentFolder"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Permissions","url":"/otcs/cs.exe?func=ll&objAction=Permissions&objId=8160&id=8160&nexturl=","children":{},"signature":"Permissions"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Print","url":"/otcs/cs.exe?func=multifile.printmulti&nodeID_list=8160&nexturl=","children":{},"signature":"Print"},{"name":"Version Control","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=VersionControl&nexturl=","children":{},"signature":"VersionControl"},{"name":"WebDAV Folder View","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=webdavview","children":{},"signature":"WebDAVViewCmd"},{"name":"Zip & Download","url":"/otcs/cs.exe?func=multifile.zipdwnldmulti&nodeID_list=8160&nexturl=","children":{},"signature":"ZipDwnld"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Delete","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=delete&nexturl=","children":{},"signature":"Delete"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Properties","url":"","children":[{"children":{},"name":"General","signature":"Properties","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=properties&nexturl="},{"children":{},"name":"Audit","signature":"Audit","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=audit&nexturl="},{"children":{},"name":"Categories","signature":"InfoCmdCategories","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=attrvaluesedit&version=0&nexturl="},{"children":{},"name":"Classifications","signature":"Classifications","url":"/otcs/cs.exe?func=ll&objid=8160&objaction=Classifications&nexturl="},{"children":{},"name":"Columns","signature":"Columns","url":"/otcs/cs.exe?func=ll&objid=8160&objAction=columns&nexturl="},{"children":{},"name":"Holds","signature":"HoldsDetail","url":"/otcs/cs.exe?func=ll&objid=8160&objaction=HoldsDetail&nexturl="},{"children":{},"name":"Presentation","signature":"Catalog","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=catalog&nexturl="},{"children":{},"name":"Provenance","signature":"Provenance","url":"/otcs/cs.exe?func=ll&objid=8160&objaction=Provenance&nexturl="},{"children":{},"name":"Records Detail","signature":"RecordsDetail","url":"/otcs/cs.exe?func=ll&objid=8160&objaction=RecordsDetail&nexturl="},{"children":{},"name":"References","signature":"References","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=references&nexturl="},{"children":{},"name":"Security Clearance","signature":"SetRecmanSecurity","url":"/otcs/cs.exe?func=ll&objid=8160&objaction=SetRecmanSecurity&activeTab=1&nexturl="},{"children":{},"name":"WebDAV","signature":"WebDAVInfoCmd","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=webdavinfo&nexturl="},{"children":{},"name":"XReference","signature":"XReference","url":"/otcs/cs.exe?func=ll&objid=8160&objaction=XReference&nexturl="}],"signature":"PropertiesMenu"}]}],"definitions":{"create_date":{"align":"center","name":"Created","persona":"","type":-7,"width_weight":0},"description":{"align":"left","name":"Description","persona":"","type":-1,"width_weight":100},"icon":{"align":"center","name":"Icon","persona":"","type":-1,"width_weight":0},"id":{"align":"right","name":"DataID","persona":"node","sort":true,"type":2,"width_weight":0},"mime_type":{"align":"left","name":"MIME Type","persona":"","type":-1,"width_weight":0},"modify_date":{"align":"left","name":"Modified","persona":"","sort":true,"type":-7,"width_weight":0},"name":{"align":"left","name":"Name","persona":"","sort":true,"type":-1,"width_weight":100},"original_id":{"align":"left","name":"Original ID","persona":"node","type":2,"width_weight":0},"parent_id":{"align":"left","name":"Parent ID","persona":"node","type":2,"width_weight":0},"reserved":{"align":"center","name":"Reserve","persona":"","type":5,"width_weight":0},"reserved_date":{"align":"center","name":"Reserved","persona":"","type":-7,"width_weight":0},"reserved_user_id":{"align":"center","name":"Reserved By","persona":"member","type":2,"width_weight":0},"size":{"align":"right","name":"Size","persona":"","sort":true,"sort_key":"size","type":2,"width_weight":0},"size_formatted":{"align":"right","name":"Size","persona":"","sort":true,"sort_key":"size","type":2,"width_weight":0},"type":{"align":"center","name":"Type","persona":"","sort":true,"type":2,"width_weight":0},"volume_id":{"align":"left","name":"VolumeID","persona":"node","type":2,"width_weight":0}},"definitions_map":{"name":["menu"]},"definitions_order":["type","name","size_formatted","modify_date","id"],"limit":25,"page":1,"page_total":1,"range_max":2,"range_min":1,"sort":"asc_name","total_count":2,"where_facet":[],"where_name":"","where_type":[]};
		var other =  {"data":[{"volume_id":-2000,"id":7942,"parent_id":2000,"name":"Sandpit","type":0,"description":"","create_date":"2014-09-02T03:03:03","modify_date":"2014-09-07T21:49:40","reserved":false,"reserved_user_id":0,"reserved_date":null,"icon":"/img/webdoc/folder.gif","mime_type":null,"original_id":0,"wnd_owner":1000,"wnd_createdby":1000,"wnd_createdate":"2014-09-02T03:03:03","wnd_modifiedby":1000,"wnd_version":null,"wnf_readydate":null,"type_name":"Folder","container":true,"size":2,"perm_see":true,"perm_see_contents":true,"perm_modify":true,"perm_modify_attributes":true,"perm_modify_permissions":true,"perm_create":true,"perm_delete":true,"perm_delete_versions":true,"perm_reserve":true,"cell_metadata":{"data":{"menu":"api/v1/nodes/7942/actions","name":"api/v1/nodes/7942/nodes","type":""},"definitions":{"menu":{"body":"","content_type":"","display_hint":"menu","display_href":"","handler":"menu","image":"","method":"GET","name":"","parameters":{},"tab_href":""},"name":{"body":"","content_type":"","display_hint":"link","display_href":"","handler":"table","image":"","method":"GET","name":"Sandpit","parameters":{"is_default_action":true},"tab_href":""},"type":{"body":"","content_type":"","display_hint":"icon","display_href":"","handler":"","image":"/img/webdoc/folder.gif","method":"","name":"Folder","parameters":{},"tab_href":""}}},"menu":null,"size_formatted":"2 Items","reserved_user_login":null,"action_url":"/v1/actions/7942","parent_id_url":"/v1/nodes/2000","actions":[{"name":"Open","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=browse","children":{},"signature":"Browse"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Configure","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=editconfig&nexturl=","children":{},"signature":"EditConfig"},{"name":"Order Custom Views","url":"/otcs/cs.exe?func=srch.ordercustomviews&objId=7942&nexturl=","children":{},"signature":"OrderCustomViews"},{"name":"Rename","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=rename&nexturl=","children":{},"signature":"Rename"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Add to Favorites","url":"/otcs/cs.exe?func=ll&objid=7942&objaction=MakeFavorite&nexturl=","children":{},"signature":"MakeFavorite"},{"name":"Copy","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=copy&nexturl=","children":{},"signature":"Copy"},{"name":"Make Shortcut","url":"/otcs/cs.exe?func=ll&objType=1&objAction=Create&sourceID=7942&parentID=2000&nexturl=","children":{},"signature":"CreateAlias"},{"name":"Move","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=move&nexturl=","children":{},"signature":"Move"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Set Notification","url":"/otcs/cs.exe?func=notify.specificnode&Nodeid=7942&VolumeID=-2000&Subtype=0&Name=Sandpit&nexturl=","children":{},"signature":"SetNotification"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Make News","url":"/otcs/cs.exe?func=ll&objtype=208&objaction=create&createin&attachmentid=7942&nexturl=","children":{},"signature":"CreateNewsAndAttach"},{"name":"Pulse From Here","url":"/otcs/cs.exe?func=ll&objId=7942&objType=0&objAction=comment","children":{},"signature":"CommentFolder"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Permissions","url":"/otcs/cs.exe?func=ll&objAction=Permissions&objId=7942&id=7942&nexturl=","children":{},"signature":"Permissions"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Print","url":"/otcs/cs.exe?func=multifile.printmulti&nodeID_list=7942&nexturl=","children":{},"signature":"Print"},{"name":"Version Control","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=VersionControl&nexturl=","children":{},"signature":"VersionControl"},{"name":"WebDAV Folder View","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=webdavview","children":{},"signature":"WebDAVViewCmd"},{"name":"Zip & Download","url":"/otcs/cs.exe?func=multifile.zipdwnldmulti&nodeID_list=7942&nexturl=","children":{},"signature":"ZipDwnld"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Delete","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=delete&nexturl=","children":{},"signature":"Delete"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Properties","url":"","children":[{"children":{},"name":"General","signature":"Properties","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=properties&nexturl="},{"children":{},"name":"Audit","signature":"Audit","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=audit&nexturl="},{"children":{},"name":"Categories","signature":"InfoCmdCategories","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=attrvaluesedit&version=0&nexturl="},{"children":{},"name":"Classifications","signature":"Classifications","url":"/otcs/cs.exe?func=ll&objid=7942&objaction=Classifications&nexturl="},{"children":{},"name":"Columns","signature":"Columns","url":"/otcs/cs.exe?func=ll&objid=7942&objAction=columns&nexturl="},{"children":{},"name":"Holds","signature":"HoldsDetail","url":"/otcs/cs.exe?func=ll&objid=7942&objaction=HoldsDetail&nexturl="},{"children":{},"name":"Presentation","signature":"Catalog","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=catalog&nexturl="},{"children":{},"name":"Provenance","signature":"Provenance","url":"/otcs/cs.exe?func=ll&objid=7942&objaction=Provenance&nexturl="},{"children":{},"name":"Records Detail","signature":"RecordsDetail","url":"/otcs/cs.exe?func=ll&objid=7942&objaction=RecordsDetail&nexturl="},{"children":{},"name":"References","signature":"References","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=references&nexturl="},{"children":{},"name":"Security Clearance","signature":"SetRecmanSecurity","url":"/otcs/cs.exe?func=ll&objid=7942&objaction=SetRecmanSecurity&activeTab=1&nexturl="},{"children":{},"name":"WebDAV","signature":"WebDAVInfoCmd","url":"/otcs/cs.exe?func=ll&objId=7942&objAction=webdavinfo&nexturl="},{"children":{},"name":"XReference","signature":"XReference","url":"/otcs/cs.exe?func=ll&objid=7942&objaction=XReference&nexturl="}],"signature":"PropertiesMenu"}]},{"volume_id":-2000,"id":8160,"parent_id":2000,"name":"System Configuration","type":0,"description":"","create_date":"2014-09-02T03:02:46","modify_date":"2014-09-02T03:02:46","reserved":false,"reserved_user_id":0,"reserved_date":null,"icon":"/img/webdoc/folder.gif","mime_type":null,"original_id":0,"wnd_owner":1000,"wnd_createdby":1000,"wnd_createdate":"2014-09-02T03:02:46","wnd_modifiedby":1000,"wnd_version":null,"wnf_readydate":null,"type_name":"Folder","container":true,"size":0,"perm_see":true,"perm_see_contents":true,"perm_modify":true,"perm_modify_attributes":true,"perm_modify_permissions":true,"perm_create":true,"perm_delete":true,"perm_delete_versions":true,"perm_reserve":true,"cell_metadata":{"data":{"menu":"api/v1/nodes/8160/actions","name":"api/v1/nodes/8160/nodes","type":""},"definitions":{"menu":{"body":"","content_type":"","display_hint":"menu","display_href":"","handler":"menu","image":"","method":"GET","name":"","parameters":{},"tab_href":""},"name":{"body":"","content_type":"","display_hint":"link","display_href":"","handler":"table","image":"","method":"GET","name":"System Configuration","parameters":{"is_default_action":true},"tab_href":""},"type":{"body":"","content_type":"","display_hint":"icon","display_href":"","handler":"","image":"/img/webdoc/folder.gif","method":"","name":"Folder","parameters":{},"tab_href":""}}},"menu":null,"size_formatted":"0 Items","reserved_user_login":null,"action_url":"/v1/actions/8160","parent_id_url":"/v1/nodes/2000","actions":[{"name":"Open","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=browse","children":{},"signature":"Browse"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Configure","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=editconfig&nexturl=","children":{},"signature":"EditConfig"},{"name":"Order Custom Views","url":"/otcs/cs.exe?func=srch.ordercustomviews&objId=8160&nexturl=","children":{},"signature":"OrderCustomViews"},{"name":"Rename","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=rename&nexturl=","children":{},"signature":"Rename"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Add to Favorites","url":"/otcs/cs.exe?func=ll&objid=8160&objaction=MakeFavorite&nexturl=","children":{},"signature":"MakeFavorite"},{"name":"Copy","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=copy&nexturl=","children":{},"signature":"Copy"},{"name":"Make Shortcut","url":"/otcs/cs.exe?func=ll&objType=1&objAction=Create&sourceID=8160&parentID=2000&nexturl=","children":{},"signature":"CreateAlias"},{"name":"Move","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=move&nexturl=","children":{},"signature":"Move"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Set Notification","url":"/otcs/cs.exe?func=notify.specificnode&Nodeid=8160&VolumeID=-2000&Subtype=0&Name=System%20Configuration&nexturl=","children":{},"signature":"SetNotification"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Make News","url":"/otcs/cs.exe?func=ll&objtype=208&objaction=create&createin&attachmentid=8160&nexturl=","children":{},"signature":"CreateNewsAndAttach"},{"name":"Pulse From Here","url":"/otcs/cs.exe?func=ll&objId=8160&objType=0&objAction=comment","children":{},"signature":"CommentFolder"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Permissions","url":"/otcs/cs.exe?func=ll&objAction=Permissions&objId=8160&id=8160&nexturl=","children":{},"signature":"Permissions"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Print","url":"/otcs/cs.exe?func=multifile.printmulti&nodeID_list=8160&nexturl=","children":{},"signature":"Print"},{"name":"Version Control","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=VersionControl&nexturl=","children":{},"signature":"VersionControl"},{"name":"WebDAV Folder View","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=webdavview","children":{},"signature":"WebDAVViewCmd"},{"name":"Zip & Download","url":"/otcs/cs.exe?func=multifile.zipdwnldmulti&nodeID_list=8160&nexturl=","children":{},"signature":"ZipDwnld"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Delete","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=delete&nexturl=","children":{},"signature":"Delete"},{"name":"-","url":"","children":{},"signature":"-"},{"name":"Properties","url":"","children":[{"children":{},"name":"General","signature":"Properties","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=properties&nexturl="},{"children":{},"name":"Audit","signature":"Audit","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=audit&nexturl="},{"children":{},"name":"Categories","signature":"InfoCmdCategories","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=attrvaluesedit&version=0&nexturl="},{"children":{},"name":"Classifications","signature":"Classifications","url":"/otcs/cs.exe?func=ll&objid=8160&objaction=Classifications&nexturl="},{"children":{},"name":"Columns","signature":"Columns","url":"/otcs/cs.exe?func=ll&objid=8160&objAction=columns&nexturl="},{"children":{},"name":"Holds","signature":"HoldsDetail","url":"/otcs/cs.exe?func=ll&objid=8160&objaction=HoldsDetail&nexturl="},{"children":{},"name":"Presentation","signature":"Catalog","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=catalog&nexturl="},{"children":{},"name":"Provenance","signature":"Provenance","url":"/otcs/cs.exe?func=ll&objid=8160&objaction=Provenance&nexturl="},{"children":{},"name":"Records Detail","signature":"RecordsDetail","url":"/otcs/cs.exe?func=ll&objid=8160&objaction=RecordsDetail&nexturl="},{"children":{},"name":"References","signature":"References","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=references&nexturl="},{"children":{},"name":"Security Clearance","signature":"SetRecmanSecurity","url":"/otcs/cs.exe?func=ll&objid=8160&objaction=SetRecmanSecurity&activeTab=1&nexturl="},{"children":{},"name":"WebDAV","signature":"WebDAVInfoCmd","url":"/otcs/cs.exe?func=ll&objId=8160&objAction=webdavinfo&nexturl="},{"children":{},"name":"XReference","signature":"XReference","url":"/otcs/cs.exe?func=ll&objid=8160&objaction=XReference&nexturl="}],"signature":"PropertiesMenu"}]}],"definitions":{"create_date":{"align":"center","name":"Created","persona":"","type":-7,"width_weight":0},"description":{"align":"left","name":"Description","persona":"","type":-1,"width_weight":100},"icon":{"align":"center","name":"Icon","persona":"","type":-1,"width_weight":0},"id":{"align":"right","name":"DataID","persona":"node","sort":true,"type":2,"width_weight":0},"mime_type":{"align":"left","name":"MIME Type","persona":"","type":-1,"width_weight":0},"modify_date":{"align":"left","name":"Modified","persona":"","sort":true,"type":-7,"width_weight":0},"name":{"align":"left","name":"Name","persona":"","sort":true,"type":-1,"width_weight":100},"original_id":{"align":"left","name":"Original ID","persona":"node","type":2,"width_weight":0},"parent_id":{"align":"left","name":"Parent ID","persona":"node","type":2,"width_weight":0},"reserved":{"align":"center","name":"Reserve","persona":"","type":5,"width_weight":0},"reserved_date":{"align":"center","name":"Reserved","persona":"","type":-7,"width_weight":0},"reserved_user_id":{"align":"center","name":"Reserved By","persona":"member","type":2,"width_weight":0},"size":{"align":"right","name":"Size","persona":"","sort":true,"sort_key":"size","type":2,"width_weight":0},"size_formatted":{"align":"right","name":"Size","persona":"","sort":true,"sort_key":"size","type":2,"width_weight":0},"type":{"align":"center","name":"Type","persona":"","sort":true,"type":2,"width_weight":0},"volume_id":{"align":"left","name":"VolumeID","persona":"node","type":2,"width_weight":0}},"definitions_map":{"name":["menu"]},"definitions_order":["type","name","size_formatted","modify_date","id"],"limit":25,"page":1,"page_total":1,"range_max":2,"range_min":1,"sort":"asc_name","total_count":2,"where_facet":[],"where_name":"","where_type":[]};
		if (parentId == 2000)
			return first;
		else
			return other;
    };
	
	// return the public functions
	return {
		initialised: initialised,
		apiPath: apiPath,
		authenticated: authenticated,
		ssoSupported: ssoSupported,
		token: token,
		getNode: getNode,
		getChildren: getChildren
	};
	
});

angular.module('csRepository').service('csLogin', function($modal) {

	var loginDialog = function() {
		return $modal.open({
			templateUrl: './views/csRepository/login.html',
			controller: 'LoginController',
			size: 'sm'
		});
	};
	
	return {
		showLogin: loginDialog
	};
	
	
});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */
	
angular.module('tester', []);

/* --------------------------------------------------------------------------------
 Version history
 --------------------------------------------------------------------------------
 0.1 - initial version September 2014 Mark Farrall
 -------------------------------------------------------------------------------- */
	
angular.module('tester').controller('TesterController', function($scope, csLogin) {

	$scope.message = 'Budgie';
	
	var login = csLogin.showLogin();
	
	login.result.then(function(result) {
		$scope.message = result;
	},
	function() {
		$scope.message = 'dismissed';	
	});
	
});

/*  --------------------------------------------------------------------------------
    Version history
    --------------------------------------------------------------------------------
    0.1 - initial version September 2014 Mark Farrall
    --------------------------------------------------------------------------------  */

angular.module('csDumb', [
	'ngRoute',
	'csRepository',
	'ui.bootstrap',
	'ui.bootstrap.modal',
	// remove the tester
	'tester',
	'browse'
]);

// globals
// todo - work out whether these should be moved
angular.module('csDumb').run(function($rootScope) {
	$rootScope.singleSignonPath = '/otcs/cs.exe';
	$rootScope.apiPath = '/otcs/cs.exe/api/v1';
	$rootScope.startNode = 2000;
});

angular.module('csDumb').config(['$routeProvider', function($routeProvider, $rootScope) {

	$routeProvider.
		when('/browse', { templateUrl: 'views/browse/browse.html', controller: 'BrowseController' }).
		when('/browse/:id', { templateUrl: 'views/browse/browse.html', controller: 'BrowseController' }).
		// todo remove the tester
		when('/tester', { templateUrl: 'views/tester/tester.html', controller: 'TesterController' }).
		otherwise({ redirectTo: '/browse' });
}]);

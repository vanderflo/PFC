    /* $("#addProjectForm").live("submit",function( event ){
    		var $form = $(this),
        	serializedData = $form.serialize();
		    $.ajax({
		        url: "http://localhost:8080/PFC/rest/API/create/project/",
		        type: "post",
		        aSync: false,
		        data: serializedData,
		        dataType: "text",
		        success: function(response){
		        	updateProjectView(response);
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		            console.log("The following error occured: "+textStatus, errorThrown);
		        }
		    });
		    event.preventDefault();
   		});//END #addProjectForm submit
   		*/
     

	   $("#addScheduleForm").live("submit",function( event ){
    		var $form = $(this),
        	serializedData = $form.serialize();
     		var prId=$(this).find('[name=projectid]').val();
		    $.ajax({
		        url: "http://localhost:8080/PFC/rest/API/add/schedule/"+prId,
		        type: "post",
		        aSync: false,
		        data: serializedData,
		        dataType: "text",
		        success: function(response){
		        	updateProjectView(prId);
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		            console.log("The following error occured: "+textStatus, errorThrown);
		        }
		    });
		    event.preventDefault();
   		});//END #addProjectForm submit
     
     
	$("#addProjectForm").live("click",function() {
		updateProjectView('1370700742588');
	});
	
	//Aceptar múltiples valores separados por coma 
    $("[id^=addPartnerToWPForm]").live("submit",function( event ){
 		var $form = $(this),
     	serializedData = $form.serialize();
 		var prId=$(this).find('[name=projectid]').val();
 		var wpId=$(this).find('[name=wpid]').val();
 		
		    $.ajax({
		    	url: "http://localhost:8080/PFC/rest/API/project/add/partner/wp/"+prId+"/"+wpId,
		    	type: "post",
		        data: serializedData,
		        success: function(response, textStatus, jqXHR){
		        	console.log("Hooray, it worked!");
		        	updateProjectView(prId);
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		            console.log("The following error occured: "+textStatus, errorThrown);
		        }
		    });
		    event.preventDefault();
		});//END #addPartnerForm submit
    
    $("[id^=addPartnerToTaskForm]").live("submit",function( event ){
 		var $form = $(this),
     	serializedData = $form.serialize();
 		var prId=$(this).find('[name=projectid]').val();
 		var wpId=$(this).find('[name=wpid]').val();
 		var taskId=$(this).find('[name=taskid]').val();
 		
 		var array_values = [];
  		$(this).find('[name=partnerTask]').each( function() {
  		    if( $(this).is(':checked') ) {
  		        array_values.push( $(this).val() );
  		    }
  		});
  		// Now you can store your values in a comma separated list
  		var arrayValues = array_values.join(',');
  		arrayValues='&partnersTask='+arrayValues;
  		serializedData=serializedData+arrayValues;
 		
		    $.ajax({
		    	url: "http://localhost:8080/PFC/rest/API/project/add/partner/task/"+prId+"/"+wpId+"/"+taskId,
		    	type: "post",
		        data: serializedData,
		        success: function(response, textStatus, jqXHR){
		        	console.log("Hooray, it worked!");
		        	updateProjectView(prId);
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		            console.log("The following error occured: "+textStatus, errorThrown);
		        }
		    });
		    event.preventDefault();
		});//END #addWPForm submit
    
    
    
	
     $("[id^=addWPForm]").live("submit",function( event ){
 		var $form = $(this),
     	serializedData = $form.serialize();
 		var prId=$(this).find('[name=projectid]').val();
 		alert($(this).find('[name=titleWP]').val());
		    $.ajax({
		    	url: "http://localhost:8080/PFC/rest/API/add/WP/"+prId,
		    	type: "post",
		        data: serializedData,
		        success: function(response, textStatus, jqXHR){
		        	console.log("Hooray, it worked!");
		        	updateProjectView(prId);
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		            console.log("The following error occured: "+textStatus, errorThrown);
		        }
		    });
		    event.preventDefault();
		});//END #addWPForm submit
     
     $("[id^=addTaskForm]").live("submit",function( event ){
  		var $form = $(this),
      	serializedData = $form.find('[class=input]').serialize();
  		var prId=$(this).find('[name=projectid]').val();
  		var wpId=$(this).find('[name=wpid]').val();
  		var array_values = [];
  		$(this).find('[name=partnerTask]').each( function() {
  		    if( $(this).is(':checked') ) {
  		        array_values.push( $(this).val() );
  		    }
  		});
  		// Now you can store your values in a comma separated list
  		var arrayValues = array_values.join(',');
  		arrayValues='&partnersTask='+arrayValues;
  		serializedData=serializedData+arrayValues;
  			$.ajax({
 		    	url: "http://localhost:8080/PFC/rest/API/add/task/"+prId+"/"+wpId,
 		    	type: "post",
 		        data: serializedData,
 		        success: function(response, textStatus, jqXHR){
 		        	console.log("Hooray, it worked!");
 		        	updateProjectView(prId);
 		        },
 		        error: function(jqXHR, textStatus, errorThrown){
 		            console.log("The following error occured: "+textStatus, errorThrown);
 		        }
 		    });
 		    event.preventDefault();
 		});//END #addTaskForm submit

     		
     		$("#addPartnerToWP").live("click",function() {
     			//Ajax call: add WP
     			//Callback: showProject
    			});
     		
     		$("#createTask").live("click",function() {
     			//Ajax call: add task
     			//Callback: showProject
    			});
     		
     		$("#addPartnerToTask").live("click",function() {
     			//Ajax call: add task
     			//Callback: showProject
    			});
     		
     		$("#addSchedule").live("click",function() {
     			//Ajax call: add schedule
     			//Callback: showProject
    			});
     		
     		$("#showProject").live("click",function() {
    			//Mostrar este proyecto:
     			//Metadata
     			//WP section
     			//Task subsection
     			//Report schedule section
    			});
     		
     	    $( "#addProject" ).live("click", function(e) {
     	    	$( "#addProjectForm" ).slideToggle();
       	      });
     	    
     	    $( "#addSchedule" ).live("click", function(e) {
     	    	$( "#addScheduleForm" ).slideToggle();
       	      });
     	    
     	    $( "#addWP" ).live("click", function(e) {     	    	
     	    	var pId=$(this).attr("projectid");
     	    	$( "#addWPForm_"+pId ).slideToggle();
       	      });
     		
     	    $( "#addTask" ).live("click", function(e) {     	    	
     	    	var wpId=$(this).attr("wpid");
     	    	$( "#addTaskForm_"+wpId ).slideToggle();
       	      });
     	    
     		function updateProjectView(projectId){
     			$("#newProjectSection").empty();
     			$("#newProjectSection").hide();
     			$("#wpSection").empty();
     			$("#metadataSection").empty();
     			
     			
     			$("#newProjectSection").hide();
     			//Get Project: call to retrieve project and parse it
     			getProject(projectId);
     		
     			$(xmlProject).find('metainfo').each(function(){
     				var title = $(this).children('title').text();	
     				var description = $(this).children('projectDescription').text();
     				var dateStart = $(this).children('dateStart').text();
     				var dateFinish = $(this).children('dateFinish').text();
     				$('#metainfoProjectSection').append('<div id="metainfoProject"><h3><span class="icon-info-sign"></span>&nbsp;Basic information</h3></div>');
     				$('#metainfoProject').append('<table id="reportInformation" summary="Report information"><tbody id="metadataProjectBody"></tbody></table>');
	    			
	    			$('#metadataProjectBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Title:</td><td class="tdvalue">'+title+'</td></tr>');
	    			$('#metadataProjectBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Description:</td><td class="tdvalue">'+description+'</td></tr>');
	    			$('#metadataProjectBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Date Start</td><td class="tdvalue">'+dateStart+'</td></tr>');
	    			$('#metadataProjectBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Date Finish</td><td class="tdvalue"> '+dateFinish+'</td></tr>');

     			});     			
     			//WP section
     			$(xmlProject).find('workpackage').each(function(){					
					var wpTitle=$(this).attr("title");
					var wpId=$(this).attr("id");
					var wpDateStart = $(this).children('dateInit').text();
     				var wpDateFinish = $(this).children('dateFinish').text();
     				var wpDescription = $(this).children('description').text();
					
     				$('#projectTree').append('<li id=ptWP_'+wpId+'><a href="#" id=aptWP_'+wpId+' wpid='+wpId+'>'+wpTitle+'</a><ul id="tasksWP_'+wpId+'"/></li>');
					//DisplayItem; crea un div con el contenido de esta tarea y pono hidden, ya se mostrar‡ desde el selector.
     				$('#viewProjectSection').append('<div class="statusContainer" id=showWP_'+wpId+'/>');
     				$('#showWP_'+wpId).append('<a><span class="spanTitle">WP Title:</span><span class="spanValue">'+wpTitle+'</span></a><br>');
     				$('#showWP_'+wpId).append('<a><span class="spanTitle">Description:</span><span class="spanValue">'+wpDescription+'</span></a><br>');
     				$('#showWP_'+wpId).append('<a><span class="spanTitle">Date start:</span><span class="spanValue">'+wpDateStart+'</span></a><br>');
     				$('#showWP_'+wpId).append('<a><span class="spanTitle">Date finish</span><span class="spanValue">'+wpDateFinish+'</span></a><br>');
     				
				
				//Partners section
					$('#wp_'+wpId).append('<form id="addPartnerToWP_'+wpId+'"><div class="field"><label for="partnerWP">Partner:</label><select name="partnerWP" id="selectPartnerWP" /></div><div class="field"><label for="effort">Effort:</label><input type="text" class="input" name="effortWP" id="effortWP" /></div><input type="hidden" name="projectid" value="'+projectId+'"/><input type="hidden" name="wpid" value="'+wpId+'"/><label for="Submit"><a>&nbsp;</a></label><input type="submit" name="Submit" class="button" value="Submit" /><a id="cancelWP">or CANCEL</a></div></form>');
					
					//Recuperar todos los partners de este WP y guardarlos en un array.
					var partnersArray = new Array();
					getPartners();
						$(this).find('partnerWP').each(function(){
							var partnerId=$(this).attr("id");
							var effort=$(this).attr("effort");
							$('#showWP_'+wpId).append('<a><span class="spanTitle">Partner '+partnerId+':</span><span class="spanValue">Effort assigned: '+effort+'</span></a><br>');
							partnersArray.push(partnerId);
						});
					//Recuperar todos los partners del fichero; si no están en el array anterior, anadir al combo box.
						var stringOption="";
						$(xmlPartners).find('partner').each(function(){							
							var partnerID=$(this).attr("id");
							if( jQuery.inArray(partnerID, partnersArray) == -1 ){
								var partnerName= $(this).attr("name");
								stringOption=stringOption+'<option value="'+partnerID+'">'+partnerID+' ('+partnerName+')';
							}
						});//partner
						$('#selectPartnerWP').append(stringOption);
						
						
				//End Partners section
						
					
				//Task section
					$(this).find('task').each(function(){
						var taskTitle=$(this).attr("title");
						var taskId=$(this).attr("id");
						var taskDateInit=$(this).children('dateInit').text();	
						var taskDateFinish=$(this).children('dateFinish').text();
						var taskDescription=$(this).children('description').text();
						$('#tasksWP_'+wpId).append('<li><a href="#" id="aptTask'+taskId+'" taskid='+taskId+'>'+taskTitle+'</li>');
						//Call to displayItem; crea un div con el contenido de esta tarea y pono hidden, ya se mostrar‡ desde el selector.
						$('#viewProjectSection').append('<div class="statusContainer" id=showTask_'+taskId+'/>');
	     				$('#showTask_'+taskId).append('<a><span class="spanTitle">Task:</span><span class="spanValue">'+taskTitle+'</span></a><br>');
	     				$('#showTask_'+taskId).append('<a><span class="spanTitle">Description:</span><span class="spanValue">'+taskDescription+'</span></a><br>');
	     				$('#showTask_'+taskId).append('<a><span class="spanTitle">Date start:</span><span class="spanValue">'+taskDateInit+'</span></a><br>');
	     				$('#showTask_'+taskId).append('<a><span class="spanTitle">Date finish:</span><span class="spanValue">'+taskDateFinish+'</span></a><br>');
	     				
						//show each partner, y añadir a un array
						var taskPartners=new Array();
						$(this).find('partnerTask').each(function(){
							var partnerId=$(this).attr("id");							
							taskPartners.push(partnerId);
							$('#showTask_'+taskId).append('<a><span class="spanTitle">Partner:</span><span class="spanValue">'+partnerId+'</span></a><br>');
						});
						//para cada elemento del array de partners del WP, comparar con el array de task y mostrarlo (checkbox?). 
						//Me vale!!! Pero hayq ue a–adirselo al div de la cajita de edici—n
						$('#wp_'+wpId).append('<form id="addPartnerToTaskForm_'+taskId+'"></form>');
						for (var i=0;i<partnersArray.length;i++){
							if( jQuery.inArray(partnersArray[i], taskPartners) == -1 ){							
							$('#addPartnerToTaskForm_'+taskId).append('<input type="checkbox" name="partnerTask" value="'+partnersArray[i]+'">'+partnersArray[i]+'<br>');
							}else{
							$('#addPartnerToTaskForm_'+taskId).append('<input type="checkbox" checked="checked" name="partnerTask" value="'+partnersArray[i]+'">'+partnersArray[i]+'<br>');
							}
						}
						$('#addPartnerToTaskForm_'+taskId).append('<input type="hidden" name="projectid" value="'+projectId+'"/><input type="hidden" name="wpid" value="'+wpId+'"/><input type="hidden" name="taskid" value="'+taskId+'"/><input type="submit" name="Submit" class="button" value="Submit" /><a id="cancelWP">or CANCEL</a>');

						
					});
					$('#wp_'+wpId).append('<a id="addTask" wpid="'+wpId+'"><span class="icon-plus"></span>&nbsp;Click here to add a new Task</a>');
					$('#wp_'+wpId).append('<form id="addTaskForm_'+wpId+'"><div class="field"><label for="title">Title:</label><input type="text" class="input" name="titleTask" id="titleTask" /></div><div class="field"><label for="description">Description:</label><input type="text" class="input" name="descriptionTask" id="descriptionTask" /></div><div class="field"><label for="dateInitTask">Date Start:</label><input type="text" class="input" name="dateInitTask" id="formDateInitTask"></div><div class="field"><label for="dateFinishTask">Date Finish:</label><input type="text" class="input" name="dateFinishTask" id="formDateFinishTask"></div><div class="field"><input type="hidden" name="projectid" value="'+projectId+'"/><input type="hidden" name="wpid" value="'+wpId+'"/><label for="Submit"><a>&nbsp;</a></label><input type="submit" name="Submit" class="button" value="Submit" /><a id="cancelWP">or CANCEL</a></div></form>');
					$('#addTaskForm'+wpId).append('<div class="field"><label for="partner">&nsbp;</label><input type="checkbox" class="inpu" name="partnerTask" id="partnerTask" value="001"/>001</div>');
					$('#addTaskForm'+wpId).append('<div class="field"><label for="partner">&nsbp;</label><input type="checkbox" class="inpu" name="partnerTask" id="partnerTask" value="002"/>002</div>');
				//End task section
					
				
     			});							
     			
     			$('#wpSection').append('<h5><a id="addWP" projectid="'+projectId+'"><span class="icon-plus"></span>&nbsp;Click here to add a new WP</a></h5>');
				$('#wpSection').append('<form id="addWPForm_'+projectId+'"><div class="field"><label for="title">Title:</label><input type="text" class="input" name="titleWP" id="titleWP" /></div><div class="field"><label for="description">Description:</label><input type="text" class="input" name="descriptionWP" id="descriptionWP" /></div><div class="field"><label for="dateInit">Date Start:</label><input type="text" class="input" name="dateInitWP" id="formDateInitWP"></div><div class="field"><label for="dateFinish">Date Finish:</label><input type="text" class="input" name="dateFinishWP" id="formDateFinishWP"></div><div class="field"><label for="coordinator">Coordinator:</label><input type="text" class="input" name="coordinatorWP" id="coordinatorWP"></div><div class="field"><input type="hidden" name="projectid" value="'+projectId+'"/><label for="Submit"><a>&nbsp;</a></label><input type="submit" name="Submit" class="button" value="Submit" /><a id="cancelWP">or CANCEL</a></div></form>');
     			
     			//Report Schedule section
				$('#wpSection').append('<div id="schedule"><h3><span class="icon-info-sign"></span>&nbsp;Report Schedule</h3></div>');
				$(xmlProject).find('date').each(function(){
				var date=$(this).text();
				$('#schedule').append('<a>'+date+'</a><br>');
				});
				$('#schedule').append('<h5><a id="addSchedule" projectid="'+projectId+'"><span class="icon-plus"></span>&nbsp;Click here to add a new date for report</a></h5>');
				$('#schedule').append('<form id="addScheduleForm"><div class="field"><label for="date">Date:</label><input type="text" class="input" name="dateSchedule" readonly="true" id="formDateSchedule" /></div><input type="hidden" name="projectid" value="'+projectId+'"/><label for="Submit"><a>&nbsp;</a></label><input type="submit" name="Submit" class="button" value="Submit" /><a id="cancelWP">or CANCEL</a></div></form>');
				initTree();
     		}
     		

     		function getProject(projectId){
     			$.ajax({
         		    type: "GET",
         		    url: "http://localhost:8080/PFC/rest/API/project/"+projectId,
     				dataType: "xml",
     				async: false,
         		     success : function(data) {
         		    	xmlProject = data;
         		         }
         		    });
     		}
     		
     		
     		
     		function getPartners(){
     			$.ajax({
         		    type: "GET",
         		    url: "http://localhost:8080/PFC/rest/API/partners/",
     				dataType: "xml",
     				async: false,
         		     success : function(data) {
         		    	xmlPartners = data;
         		         }
         		    });

     		}
     		
     		$("[id^=formDate]").live("focus", function(){
     		    $(this).datepicker({
     		    	showOn: 'both',
     		    	buttonText: "EDIT DATE",
     		    	changeMonth: true,
     		    	changeYear: true,
     		    	dateFormat: 'dd/mm/yy',
     		        inline: true 
     		    });
     		});
     		
      	   $( "[id^=aptWP]" ).live("click", function(e) {
      		  var wpId=$(this).attr("wpid");
      		  $("[id^=showWP]").hide();
       		  $("[id^=showTask]").hide();
      		  $("#showWP_"+wpId).show();
      		  });
      	   
      	   $( "[id^=aptTask]" ).live("click", function(e) {
       		  var taskId=$(this).attr("taskid");
       		  $("[id^=showWP]").hide();
       		  $("[id^=showTask]").hide();
       		  $("#showTask_"+taskId).show();
       		  });
     		
     		
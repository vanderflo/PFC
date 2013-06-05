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
     
	$("#addProjectForm").live("click",function() {
		updateProjectView('1370458944459');
	});
     $("#addWPForm").live("submit",function( event ){
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
     	    $( "#addWP" ).live("click", function(e) {     	    	
     	    	$( "#addWPForm" ).slideToggle();
       	      });
     		
     		function updateProjectView(projectId){
     			$("#newProjectSection").empty();
     			$("#newProjectSection").hide();
     			$("#wpSection").empty();
     			$("#metadataSection").empty();
     			
     			
     			$("#newProjectSection").hide();
     			//Get Project: call to retrieve project and parse it
     			getProject(projectId);
     			$('#metadataSection').append('<h1><span class="icon-flag"></span>&nbsp;New Project</h1>');
     			$(xmlProject).find('metainfo').each(function(){
     				var title = $(this).children('title').text();	
     				var description = $(this).children('projectDescription').text();
     				var dateStart = $(this).children('dateStart').text();
     				var dateFinish = $(this).children('dateFinish').text();
     				$('#metadataSection').append('<h3><span class="icon-info-sign"></span>&nbsp;Basic information</h3>');
     				$('#metadataSection').append('<div class="subsection"><table id="reportInformation" summary="Report information"><tbody id="metadataBody"></tbody></table></div>');
	    			
	    			$('#metadataBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Title:</td><td class="tdvalue">'+title+'</td></tr>');
	    			$('#metadataBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Description:</td><td class="tdvalue">'+description+'</td></tr>');
	    			$('#metadataBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Date Start</td><td class="tdvalue">'+dateStart+'</td></tr>');
	    			$('#metadataBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Date Finish</td><td class="tdvalue"> '+dateFinish+'</td></tr>');

     			});     			
     			//WP section
     			$(xmlProject).find('workpackage').each(function(){					
					var wpTitle=$(this).attr("title");
					var wpId=$(this).attr("id");
					var dateStart = $(this).children('dateInit').text();
     				var dateFinish = $(this).children('dateFinish').text();
					
					$('#wpSection').append('<h3><span class="icon-info-sign"></span>&nbsp;Workpackage '+wpTitle+'</h3>');
					$('#wpSection').append('<h4><span class="icon-edit">&nbsp;</span> From '+dateStart+' to '+dateFinish+'</h4>');
					//Task section
					$(this).find('task').each(function(){
						var taskTitle=$(this).attr("title");
						var taskId=$(this).attr("id");
						var descriptionWP=$(this).children('description').text();	
						$(this).children('dateInit').text();	
						$(this).children('dateFinish').text();	
						$('#wpSection').append('<div class="subsection"><a>'+taskTitle+' '+taskId+'</a></div>');
					});
					$('#wpSection').append('<h5><a id="addTask"><span class="icon-plus"></span>&nbsp;Click here to add a new Task</a></h5>');
				});							
     			$('#wpSection').append('<h5><a id="addWP"><span class="icon-plus"></span>&nbsp;Click here to add a new WP</a></h5>');
				$('#wpSection').append('<form id="addWPForm"><div class="field"><label for="title">Title:</label><input type="text" class="input" name="titleWP" id="titleWP" /></div><div class="field"><label for="description">Description:</label><input type="text" class="input" name="descriptionWP" id="descriptionWP" /></div><div class="field"><label for="dateInit">Date Start:</label><input type="text" class="input" name="dateInitWP" id="dateInitWP"></div><div class="field"><label for="dateFinish">Date Finish:</label><input type="text" class="input" name="dateFinishWP" id="dateFinishWP"></div><div class="field"><label for="coordinator">Coordinator:</label><input type="text" class="input" name="coordinatorWP" id="coordinatorWP"></div><div class="field"><input type="hidden" name="projectid" value="'+projectId+'"/><label for="Submit"><a>&nbsp;</a></label><input type="submit" name="Submit" class="button" value="Submit" /><a id="cancelWP">or CANCEL</a></div></form>');
				$('#addWPForm').append('');
     			
     			//Report Schedule section
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
     		
     		
     		
     $("#addProjectForm").live("submit",function( event ){
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
     
     
     $("#addWPForm").live("submit",function( event ){
 		var $form = $(this),
     	serializedData = $form.serialize();
		    $.ajax({
		    	url: "http://localhost:8080/PFC/rest/API/add/WP/"+prId,
		    	type: "post",
		        data: serializedData,
		        success: function(response, textStatus, jqXHR){
		        	console.log("Hooray, it worked!");
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
     	    	$( "#addWPForm" ).append('<input type="hidden" name="projectid" value="001"/>');
     	    	$( "#addWPForm" ).show();
       	      });
     		
     		function updateProjectView(projectId){
     			$("#newProjectSection").hide();
     		}
$('#editflag').live('click', function(){
	var color = $(this).attr('color');
	
	$.ajax({				
		url: "http://localhost:8080/PFC/rest/API/report/edit/"+currentProject+"/"+currentWP+"/"+currentPartner+"/"+currentReport,
		type: "post",
        data: {
            id: "flag",
            value: color,
        },
        success: function(response, textStatus, jqXHR){
        	updateView();   
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(
                "The following error occured: "+
                textStatus, errorThrown
            );
        }
    });		
    // prevent default posting of form
    event.preventDefault();
	});	
	
$('#editStatus').live('click', function(){
	var value = $(this).attr('value');
	
	$.ajax({				
		url: "http://localhost:8080/PFC/rest/API/report/edit/"+currentProject+"/"+currentWP+"/"+currentPartner+"/"+currentReport,
		type: "post",
        data: {
            id: "status",
            value: value,
        },
        success: function(response, textStatus, jqXHR){
        	updateView();  
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(
                "The following error occured: "+
                textStatus, errorThrown
            );
        }
    });		
    // prevent default posting of form
    event.preventDefault();
	});	
       $('.editTextArea').live('click', function(){
    		var URL="http://localhost:8080/PFC/rest/API/report/edit/"+currentProject+"/"+currentWP+"/"+currentPartner+"/"+currentReport;
    		$(this).editable(URL, { 
    	         type      : 'textarea',
    	         cancel    : 'Cancel',
    	         submit    : 'OK',
    	         indicator : '<img src="img/indicator.gif">',
    	         tooltip   : 'Click to edit...',
    	         callback  : function(value,settings){
    	        	 updateView();
	                }
            });
    		
        });
        $('.settings_form_title_editable').live('click', function(){
    		var URL="http://localhost:8080/PFC/rest/API/report/edit/"+currentProject+"/"+currentWP+"/"+currentPartner+"/"+currentReport;
    		$(this).editable(URL, { 
            	data  	  : " {'Saved':'Saved','Completed':'Completed','Pending':'Pending','Waiting for revision':'Waiting for revision'}",
                type 	  : 'select',
                cancel    : 'Cancel',
                submit    : 'OK',
   	         indicator : '<img src="img/indicator.gif">',
                tooltip   : 'Click to edit...',
                callback  : function(value,settings){
                	updateView();	
                }
            });
        });
        
        $('.editTask').live('click', function(){
    		var taskId=$(this).attr("taskid");
    		var URL="http://localhost:8080/PFC/rest/API/task/edit/"+currentProject+"/"+currentWP+"/"+currentPartner+"/"+currentReport+"/"+taskId;
    		$(this).editable(URL, { 
    	         type      : 'textarea',
    	         cancel    : 'Cancel',
    	         submit    : 'OK',
    	         indicator : '<img src="img/indicator.gif">',
    	         height	   : '100',
    	         tooltip   : 'Click to edit...'
            });
        });
        
        $('#topMenuHelp').live('click', function(){
        	$('#helpArticleContainer').show();
        });
        
        $('#hideMenuHelp').live('click', function(){
        	$('#helpArticleContainer').hide();
        });
        
        $('#topMenuProjects').live('click', function(){
        	initProjectView();
        	$('#topMenuReports').removeClass("headerMenuSelected");
        	$('#topMenuPartners').removeClass("headerMenuSelected");
        	$('#topMenuProjects').addClass("headerMenuSelected");
        });
        
        $('#topMenuReports').live('click', function(){
        	initReportView();
        	$('#topMenuProjects').removeClass("headerMenuSelected");
        	$('#topMenuPartners').removeClass("headerMenuSelected");
        	$('#topMenuReports').addClass("headerMenuSelected");
        });
        
        $('#topMenuPartners').live('click', function(){
        	initPartnersView();
        	$('#topMenuProjects').removeClass("headerMenuSelected");
        	$('#topMenuPartners').addClass("headerMenuSelected");
        	$('#topMenuReports').removeClass("headerMenuSelected");
        });
        
        function initProjectView(){
            $('.listProjectsPending').remove();
            getProjects();
            $('#topmenu').show();
            $('#menu').hide();
            $('#activemenu').hide();
            $('#partnersmenu').hide();
  	        $.getScript("projectview.js");
		}
        
        function initReportView(){
            $('.listProjectsActive').remove();
            getProjects();
            $('#activemenu').show();
            $('#topmenu').hide();
            $('#partnersmenu').hide();
            $.getScript("coordinator.js");
  	   	}
        
        function initPartnersView(){
            $('.listProjectsActive').remove();
            $('#topmenu').hide();
            $('#activemenu').hide();
            $('#partnersmenu').show();
            $.getScript("partners.js");
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
        
 	   $("#addNewPartnerForm").live("submit",function( event ){
   		var $form = $(this),
       	serializedData = $form.serialize();
		    $.ajax({
		        url: "http://localhost:8080/PFC/rest/API/partners/add",
		        type: "post",
		        aSync: false,
		        data: serializedData,
		        dataType: "text",
		        success: function(response){

		        },
		        error: function(jqXHR, textStatus, errorThrown){
		            console.log("The following error occured: "+textStatus, errorThrown);
		        }
		    });
		    event.preventDefault();
  		});//END #addProjectForm submit

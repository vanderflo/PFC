	$('.editFlag').live('click', function(){
		var URL="http://localhost:8080/PFC/rest/API/report/edit/"+currentProject+"/"+currentWP+"/"+currentPartner+"/"+currentReport;
        		$(this).editable(URL, { 
	            	data  	  : " {'green':'GREEN','red':'RED'}",
	                type 	  : 'select',
	                cancel    : 'Cancel',
	                submit    : 'OK',
	    	        indicator : '<img src="img/indicator.gif">',
	                tooltip   : 'Click to edit...',
	                callback  : function(value,settings){
	                	getReport();
	        			showListOfReportsByWP('HARDWARE','1355348593079');
	        			showReport(currentPartner,currentReport,currentWP,currentPartnerName);	
	                }
	            });
        		
            });
	
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
        	getReport();
			showListOfReportsByWP('HARDWARE','1355348593079');
			showReport(currentPartner,currentReport,currentWP,currentPartnerName);   
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
	                	getReport();
	        			showListOfReportsByWP('HARDWARE','1355348593079');
	        			showReport(currentPartner,currentReport,currentWP,currentPartnerName);	
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
                	getReport();
        			showListOfReportsByWP('HARDWARE','1355348593079');
        			showReport(currentPartner,currentReport,currentWP,currentPartnerName);	
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
    	         tooltip   : 'Click to edit...'
            });
        });

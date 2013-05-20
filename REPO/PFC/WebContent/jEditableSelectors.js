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
        $('.editStatus').live('click', function(){
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

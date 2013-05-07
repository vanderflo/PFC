//Llamada AJAX para recuperar la info del proyecto actual

     		$("#selectProject").live("click",function() {
     		$('#coordinatorWP').empty();
     		$('#coordinatorPartners').empty();
     		initProject();
     		});
     		
    		$("#triggerWP").live("click",function() {
    			$('#topArticle').empty();
    			$('#secondArticle').empty();
    			$('#midArticle').hide();
    			$('#secondArticleContainer').show();
    			var wpTitle = $(this).attr('wptitle');
    			var wpID = $(this).attr('wpid');
    			$('#topArticle').append('<h1 class="settings_form_head_titleee">Selected WorkPackage: '+wpTitle+'</h1>');
    			//$('#topArticle').append('<a class="settings_form_titleee">Report Dates:</a>');
    			
    			var reportsArray = new Array();
    			$(xmlReport).find('subreport').each(function(){
					var wpFromSubreport=$(this).attr("WP");
					var wpIdFromSubreport=$(this).attr("WPID");
					var reportDate=$(this).attr("date");
					if( jQuery.inArray(reportDate, reportsArray) == -1 ){
					if(wpID == wpIdFromSubreport){
						$('#topArticle').append('<a href="#" id="triggerPartnerForReport" class="topbutton" reportdate="'+reportDate+'" wptitle="'+wpFromSubreport+'" wpid="'+wpIdFromSubreport+'">'+reportDate+'</a>');

					}
					reportsArray.push(reportDate);
					}
					});//workpackage

    		   });  
     	
    		$("#triggerPartnerForReport").live("click",function() {
    			$('#midArticle').empty();
    			$('#secondArticleContainer').show();
    			var date = $(this).attr('reportdate');
    			var wpID = $(this).attr('wpid');
    			//$('#midArticle').append('<h2 class="settings_form_titleee">Partners reporting on date '+date+'</h2>');

    			$(xmlReport).find('subreport').each(function(){
					var reportWPID=$(this).attr("WPID");
					var reportWP=$(this).attr("WP");
					var partnerID=$(this).attr("partner");
					var partnerName=$(this).attr("partnerName");
					var reportDate=$(this).attr("date");
						if(reportDate == date && reportWPID == wpID){
						//$('#midArticle').append('<h4><a href="#" id="triggerReport" partnerID="'+partnerID+'" partnername="'+partnerName+'" wptitle="'+reportWP+'" wpid="'+reportWPID+'"reportdate="'+reportDate+'">'+partnerName+'</a></h4>');
						$('#midArticle').append('<a href="#" class="topbutton" id="triggerReport" partnerID="'+partnerID+'" partnername="'+partnerName+'" wptitle="'+reportWP+'" wpid="'+reportWPID+'"reportdate="'+reportDate+'">'+partnerName+'</a>');
						}
					});
    			$('#midArticle').show();
    		   });
     		
    		$("#triggerPartner").live("click",function() {
    			$('#topArticle').empty();
    			$('#secondArticle').empty();
    			$('#midArticle').hide();
    			$('#secondArticleContainer').show();
    			var partnerID = $(this).attr('partnerid');
    			var partnerName = $(this).attr('partnername');
    			currentPartner=partnerID;
    			$('#topArticle').append('<h1 class="settings_form_head_titleee">Partner: '+partnerName+'</h1>');
    			//$('#topArticle').append('<a class="settings_form_titleee">Taking part in WPs</a>');
    			$(xmlReport).find('subreport').each(function(){
					var reportWP=$(this).attr("WP");
					var reportWPID=$(this).attr("WPID");
					var partnerWP=$(this).attr("partner");
						if(partnerID == partnerWP){
						$('#topArticle').append('<a href="#" id="triggerWPforPartner" class="topbutton" partnerID="'+partnerID+'" partnername="'+partnerName+'" wptitle="'+reportWP+'" wpid="'+reportWPID+'">'+reportWP+'</a>');
						}
					});//workpackage

    		   });
    		
    		$("#triggerWPforPartner").live("click",function() {
    			$('#midArticle').empty();
    			$('#secondArticleContainer').show();
    			var partnerID = $(this).attr('partnerid');
    			var partnerName = $(this).attr('partnername');
    			var wpID=$(this).attr('wpid');
    			var wpTitle=$(this).attr('wptitle');
    			//$('#midArticle').append('<h2 class="settings_form_titleee">Reports for WP '+wpTitle+'</h2>');
    			$(xmlReport).find('subreport').each(function(){
					var reportWP=$(this).attr("WPID");
					var partnerWP=$(this).attr("partner");
					var reportDate=$(this).attr("date");
						if(partnerID == partnerWP && reportWP == wpID){
						//$('#midArticle').append('<h4><a href="#" id="triggerReport" partnerID="'+partnerID+'" partnername="'+partnerName+'" wpid="'+reportWP+'" reportdate="'+reportDate+'">'+reportDate+'</a></h4>');
						$('#midArticle').append('<a href="#" class="topbutton" id="triggerReport" partnerID="'+partnerID+'" partnername="'+partnerName+'" wpid="'+reportWP+'" reportdate="'+reportDate+'">'+reportDate+'</a>');

						}
					});
    			$('#midArticle').show();
    		   });
     		
    		
    		
    		
    		
    		$("#triggerReport").live("click",function() {
    			$('#secondArticle').empty();
				$('#secondArticle').append('<div class="line-separator"></div>');
    			var partnerID = $(this).attr('partnerid');
    			currentPartner=partnerID;
    			var date = $(this).attr('reportdate');
    			var wpId=$(this).attr('wpid');
    			currentReport=date;
    			currentWP=wpId;
    			var wpTitle=$(this).attr('wptitle');
    			var partnerName = $(this).attr('partnername');
    			$(xmlReport).find('subreport').each(function(){
					var reportWP=$(this).attr("WP");
					var reportWPID=$(this).attr("WPID");
					var partnerWP=$(this).attr("partner");
					var reportDate=$(this).attr("date");
						if(partnerID == partnerWP && reportWPID == wpId && reportDate==date){
						var expenses= $(this).children('expenses').text();	
						var status= $(this).children('status').text();	
						var feedback= $(this).children('feedback').text();	
						var flag= $(this).children('flag').text();
						var explanation= $(this).children('explanation').text();
						//$('#secondArticle').append('<h2 class="settings_form_head_title">Report by Partner '+partnerName+' for WP '+reportWP+' on date '+date+'</h2>');
						$('#secondArticle').append('<h1>Report Information</h1>');
						$('#secondArticle').append('<h5>Partner: '+partnerName+'</h5>');
						$('#secondArticle').append('<h5>Work Package: '+reportWP+'</h5>');
						$('#secondArticle').append('<h5>Date: '+date+'</h5>');

						$('#secondArticle').append('<h6 class="settings_form_title">Expenses</h6>');
						$('#secondArticle').append('<a class="editTextArea" id="expenses">'+expenses+'</a>');
						$('#secondArticle').append('<h2 class="settings_form_title">Status</h2>');
						$('#secondArticle').append('<a class="editStatus" id="status">'+status+'</a>');
						$('#secondArticle').append('<h2 class="settings_form_title">Feedback</h2>');
						$('#secondArticle').append('<a class="editTextArea" id="feedback">'+feedback+'</a>');
						$('#secondArticle').append('<h2 class="settings_form_title">Flag</h2>');
						$('#secondArticle').append('<a class="editFlag" id="flag">'+flag+'</a>');
						$('#secondArticle').append('<h2 class="settings_form_title">Explanation</h2>');
						$('#secondArticle').append('<a class="editTextArea" id="explanation">'+explanation+'</a>');

						$(this).find('task').each(function(){
							var taskTitle = $(this).attr("title");
							var taskId = $(this).attr("id");
							var work= $(this).children('work').text();	
							var result= $(this).children('result').text();	
							var effort= $(this).children('effort').text();
							$('#secondArticle').append('<h6 class="settings_form_head_sub_title">Task '+taskTitle+'</h6>');
							$('#secondArticle').append('<h6 class="settings_form_sub_title">Work</h6>');
							$('#secondArticle').append('<a class="editTask" id="work" taskid="'+taskId+'">'+work+'</a>');
							$('#secondArticle').append('<h6 class="settings_form_sub_title">Result</h6>');
							$('#secondArticle').append('<a class="editTask" id="result" taskid="'+taskId+'">'+result+'</a>');
							$('#secondArticle').append('<h6 class="settings_form_sub_title">Effort</h6>');
							$('#secondArticle').append('<a class="editTask" id="effort" taskid="'+taskId+'">'+effort+'</a>');


						});	
						
						}
					});
    	        $('#secondArticleContainer').show();

    		});
     		
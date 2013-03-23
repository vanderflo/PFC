//Llamada AJAX para recuperar la info del proyecto actual
     		$.ajax({
				type: "GET",
				url: "http://localhost:8080/PFC/rest/API/project/Test1",
				dataType: "xml",
				success: function(xml) {
					$(xml).find('workpackage').each(function(){
					var wpTitle=$(this).attr("title");
					var wpId=$(this).attr("id");
					$('#coordinatorWP').append('<li><a href="#" id="triggerWP" class="triggerWP" wpid="'+wpId+'" wptitle="'+wpTitle+'">'+ wpTitle + '</a><li>');
					});//workpackage
				
					var partnersArray = new Array();
					$(xml).find('partner').each(function(){
					var partnerID=$(this).attr("id");
					if( jQuery.inArray(partnerID, partnersArray) == -1 ){
					var partnerName= $(this).children('name').text();	
					$('#coordinatorPartners').append('<li><a href="#" id="triggerPartner" class="triggerPartner" partnerID="'+partnerID+'" partnername="'+partnerName+'">'+ partnerName + '</a></li>');
					partnersArray.push(partnerID);
					}
					});//partner
					

				}
			});//END Llamada AJAX
     		
     		    var xmlReport;

     		    $.ajax({
     		    type: "GET",
     		    url: "http://localhost:8080/PFC/rest/API/report/get/Test1",
 				dataType: "xml",
     		     success : function(data) {
     		    	xmlReport = data;
     		         }
     		    });

    		$("#triggerWP").live("click",function() {
    			$('#topArticle').empty();
    			$('#midArticle').hide();
    			$('#secondArticleContainer').hide();
    			var wpTitle = $(this).attr('wptitle');
    			var wpID = $(this).attr('wpid');
    			$('#topArticle').append('<h1 class="settings_form_head_title">WP '+wpTitle+'</h1>');
    			$('#topArticle').append('<h1 class="settings_form_title">Report Dates</h1>');
    			var reportsArray = new Array();
    			$(xmlReport).find('subreport').each(function(){
					var wpFromSubreport=$(this).attr("WP");
					var wpIdFromSubreport=$(this).attr("WPID");
					var reportDate=$(this).attr("date");
					if( jQuery.inArray(reportDate, reportsArray) == -1 ){
					if(wpID == wpIdFromSubreport){
						$('#topArticle').append('<a href="#" id="triggerPartnerForReport" reportdate="'+reportDate+'" wptitle="'+wpFromSubreport+'" wpid="'+wpIdFromSubreport+'">'+reportDate+'</a>');
						}
					reportsArray.push(reportDate);
					}
					});//workpackage
    	        $('#topArticleContainer').show();

    		   });  
     	
    		$("#triggerPartnerForReport").live("click",function() {
    			$('#midArticle').empty();
    			$('#secondArticleContainer').hide();
    			var date = $(this).attr('reportdate');
    			var wpID = $(this).attr('wpid');
    			$('#midArticle').append('<h2 class="settings_form_title">Partners reporting on date '+date+'</h2>');
    			$(xmlReport).find('subreport').each(function(){
					var reportWPID=$(this).attr("WPID");
					var reportWP=$(this).attr("WP");
					var partnerID=$(this).attr("partner");
					var reportDate=$(this).attr("date");
						if(reportDate == date && reportWPID == wpID){
						$('#midArticle').append('<h4><a href="#" id="triggerReport" partnerID="'+partnerID+'" partnername="'+partnerID+'" wptitle="'+reportWP+'" wpid="'+reportWPID+'"reportdate="'+reportDate+'">'+partnerID+'</a></h4>');
						}
					});
    			$('#midArticle').show();
    		   });
     		
    		$("#triggerPartner").live("click",function() {
    			$('#topArticle').empty();
    			$('#midArticle').hide();
    			$('#secondArticleContainer').hide();
    			var partnerID = $(this).attr('partnerid');
    			var partnerName = $(this).attr('partnername');
    			$('#topArticle').append('<h1 class="settings_form_head_title">Partner '+partnerName+'</h1>');
    			$('#topArticle').append('<h1 class="settings_form_title">Taking part in WPs</h1>');
    			$(xmlReport).find('subreport').each(function(){
					var reportWP=$(this).attr("WP");
					var reportWPID=$(this).attr("WPID");
					var partnerWP=$(this).attr("partner");
						if(partnerID == partnerWP){
						$('#topArticle').append('<a href="#" id="triggerWPforPartner" partnerID="'+partnerID+'" partnername="'+partnerName+'" wptitle="'+reportWP+'" wpid="'+reportWPID+'">'+reportWP+'</a>');
						}
					});//workpackage
    	        $('#topArticleContainer').show();

    		   });
    		
    		$("#triggerWPforPartner").live("click",function() {
    			$('#midArticle').empty();
    			$('#secondArticleContainer').hide();
    			var partnerID = $(this).attr('partnerid');
    			var partnerName = $(this).attr('partnername');
    			var wpID=$(this).attr('wpid');
    			var wpTitle=$(this).attr('wptitle');
    			$('#midArticle').append('<h2 class="settings_form_title">Reports for WP '+wpTitle+'</h2>');
    			$(xmlReport).find('subreport').each(function(){
					var reportWP=$(this).attr("WPID");
					var partnerWP=$(this).attr("partner");
					var reportDate=$(this).attr("date");
						if(partnerID == partnerWP && reportWP == wpID){
						$('#midArticle').append('<h4><a href="#" id="triggerReport" partnerID="'+partnerID+'" partnername="'+partnerName+'" wpid="'+reportWP+'" reportdate="'+reportDate+'">'+reportDate+'</a></h4>');
						}
					});
    			$('#midArticle').show();
    		   });
     		
    		
    		
    		
    		
    		$("#triggerReport").live("click",function() {
    			$('#secondArticle').empty();
    			var partnerID = $(this).attr('partnerid');
    			var date = $(this).attr('reportdate');
    			var wpId=$(this).attr('wpid');
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
						$('#secondArticle').append('<h2 class="settings_form_head_title">Report by Partner '+partnerName+' for WP '+reportWP+' on date '+date+'</h2>');
						$('#secondArticle').append('<h6 class="settings_form_title">Expenses</h6>');
						$('#secondArticle').append('<a>'+expenses+'</a>');
						$('#secondArticle').append('<h2 class="settings_form_title">Status</h2>');
						$('#secondArticle').append('<a>'+status+'</a>');
						$('#secondArticle').append('<h2 class="settings_form_title">Feedback</h2>');
						$('#secondArticle').append('<a>'+feedback+'</a>');
						$('#secondArticle').append('<h2 class="settings_form_title">Flag</h2>');
						$('#secondArticle').append('<a>'+flag+'</a>');
						$('#secondArticle').append('<h2 class="settings_form_title">Explanation</h2>');
						$('#secondArticle').append('<a>'+explanation+'</a>');

						$(this).find('task').each(function(){
							var taskTitle = $(this).attr("title");
							var work= $(this).children('work').text();	
							var result= $(this).children('result').text();	
							var effort= $(this).children('effort').text();
							$('#secondArticle').append('<h6 class="settings_form_head_sub_title">Task '+taskTitle+'</h6>');
							$('#secondArticle').append('<h6 class="settings_form_sub_title">Work</h6>');
							$('#secondArticle').append('<a>'+work+'</a>');
							$('#secondArticle').append('<h6 class="settings_form_sub_title">Result</h6>');
							$('#secondArticle').append('<a>'+result+'</a>');
							$('#secondArticle').append('<h6 class="settings_form_sub_title">Effort</h6>');
							$('#secondArticle').append('<a>'+effort+'</a>');


						});	
						
						}
					});
    	        $('#secondArticleContainer').show();

    		});
     		
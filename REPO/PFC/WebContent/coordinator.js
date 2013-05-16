//Llamada AJAX para recuperar la info del proyecto actual

     		$("#selectProject").live("click",function() {
     		$('#coordinatorWP').empty();
     		$('#coordinatorPartners').empty();
     		initProject();
     		});
     		
    		$("#triggerWP").live("click",function() {
    			$('#topArticle').empty();
    			$('#secondArticle').empty();
    			$('#secondArticleContainer').hide();
    			$('#topArticleContainer').show();

    			var wpTitle = $(this).attr('wptitle');
    			var wpID = $(this).attr('wpid');
    			//$('#topArticle').append('<h1 class="settings_form_head_titleee"><a>WorkPackage: '+wpTitle+'</a><div class="line-separator"></div></h1>');
    			$('#topArticle').append('<h3> Workpackage: '+wpTitle+'</h3>');
    			$('#topArticle').append('<div class="tableHeader"><div class="table5Header">Status</div><div class="table1Header">Date</div><div class="table7Header">Partner</div><div class="table2Header">Workpackage</div><div class="table3Header">Effort</div><div class="table6Header">Comments</div><div class="table4Header">Flag</div>');
    			var count="1";
    			
    			var reportsArray = new Array();
    			$(xmlReport).find('subreport').each(function(){
    				var wpIdFromSubreport =$(this).attr("WPID");
    				var reportWP=$(this).attr("WP");
					var partnerID=$(this).attr("partner");
					var partnerName=$(this).attr("partnerName");
					var reportDate=$(this).attr("date");
					var status= $(this).children('status').text();	
					var feedback= $(this).children('feedback').text();	
					var flag= $(this).children('flag').text();					
					//if( jQuery.inArray(reportDate, reportsArray) == -1 ){
					if(wpID == wpIdFromSubreport){
						//$('#table').append('<h4><a href="#" id="triggerReport" class="topbuttonNO" partnerid="'+partnerWP+'" partnername="'+partnerName+'" reportdate="'+reportDate+'" wptitle="'+wpFromSubreport+'" wpid="'+wpIdFromSubreport+'">'+reportDate+' by partner '+partnerName+'</a></h4>');
						var even=isEven(count);
						//$('#topArticle').append('<h4><a href="#" id="triggerReport" class="topbuttonNO" partnerID="'+partnerID+'" partnername="'+partnerName+'" wptitle="'+reportWP+'" wpid="'+reportWPID+'" reportdate="'+reportDate+'">'+reportWP+' on '+reportDate+'</a></h4>');
						$('#topArticle').append('<div class="table5'+even+'">'+status+'</div>');
						$('#topArticle').append('<div class="table1'+even+'"><a href="#" id="triggerReport" class="topbuttonNO" partnerID="'+partnerID+'" partnername="'+partnerName+'" wptitle="'+wpTitle+'" wpid="'+wpID+'" reportdate="'+reportDate+'">'+reportDate+'</a></div>');
						$('#topArticle').append('<div class="table7'+even+'">'+partnerName+'</div>');
						$('#topArticle').append('<div class="table2'+even+'">'+reportWP+'</div>');
						$('#topArticle').append('<div class="table3'+even+'">1 month</div>');
						$('#topArticle').append('<div class="table6'+even+'">'+feedback+'</div>');
						if (flag.toLowerCase()=='red'){
						$('#topArticle').append('<div class="table4'+even+'"><img src="http://www.boycottowl.com/images/icon_red_flag.gif"></img></div>');
						}else{
							$('#topArticle').append('<div class="table4'+even+'"><img src="http://www.lajaula.com.py/iconos/844357/original/flag_green.png"></img></div>');
						}
						count++;
					}
					//reportsArray.push(reportDate);
					//}
					});//workpackage
    			$('#topArticle').append('<h3>_</h3>');
    		   });  
     	
    		
     		
    		$("#triggerPartner").live("click",function() {
    			$('#topArticle').empty();
    			$('#secondArticle').empty();
    			$('#secondArticleContainer').hide();
    			$('#topArticleContainer').show();
    			var partnerID = $(this).attr('partnerid');
    			var partnerName = $(this).attr('partnername');
    			currentPartner=partnerID;
    			$('#topArticle').append('<h3> Partner: '+partnerName+'</h3>');
    			$('#topArticle').append('<div class="tableHeader"><div class="table5Header">Status</div><div class="table1Header">Date</div><div class="table7Header">Partner</div><div class="table2Header">Workpackage</div><div class="table3Header">Effort</div><div class="table6Header">Comments</div><div class="table4Header">Flag</div>');
    			var count =1;
    			$(xmlReport).find('subreport').each(function(){
					var reportWP=$(this).attr("WP");
					var reportWPID=$(this).attr("WPID");
					var partnerWP=$(this).attr("partner");
					var reportDate=$(this).attr("date");
					var status= $(this).children('status').text();	
					var feedback= $(this).children('feedback').text();	
					var flag= $(this).children('flag').text();
						if(partnerID == partnerWP){
						var even=isEven(count);
						//$('#topArticle').append('<h4><a href="#" id="triggerReport" class="topbuttonNO" partnerID="'+partnerID+'" partnername="'+partnerName+'" wptitle="'+reportWP+'" wpid="'+reportWPID+'" reportdate="'+reportDate+'">'+reportWP+' on '+reportDate+'</a></h4>');
						$('#topArticle').append('<div class="table5'+even+'">'+status+'</div>');
						$('#topArticle').append('<div class="table1'+even+'"><a href="#" id="triggerReport" class="topbuttonNO" partnerID="'+partnerID+'" partnername="'+partnerName+'" wptitle="'+reportWP+'" wpid="'+reportWPID+'" reportdate="'+reportDate+'">'+reportDate+'</a></div>');
						$('#topArticle').append('<div class="table7'+even+'">'+partnerName+'</div>');
						$('#topArticle').append('<div class="table2'+even+'">'+reportWP+'</div>');
						$('#topArticle').append('<div class="table3'+even+'">1 month</div>');
						$('#topArticle').append('<div class="table6'+even+'">'+feedback+'</div>');
						if (flag.toLowerCase()=='red'){
						$('#topArticle').append('<div class="table4'+even+'"><img src="http://www.boycottowl.com/images/icon_red_flag.gif"></img></div>');
						}else{
							$('#topArticle').append('<div class="table4'+even+'"><img src="http://www.lajaula.com.py/iconos/844357/original/flag_green.png"></img></div>');
						}
						count++;
						}
					});//workpackage
    			$('#topArticle').append('<h3>_</h3>');

    		   });
    		

    		$("#triggerReport").live("click",function() {
    			$('#secondArticle').empty();
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
						$('#secondArticle').append('<h5>By '+partnerName+' on '+date+' for workpackage '+reportWP+'</h5>');
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
     		
//Llamada AJAX para recuperar la info del proyecto actual

     		$("#selectProject").live("click",function() {
     		$('#coordinatorWP').empty();
     		$('#coordinatorPartners').empty();
     		initProject();
     		});
     		
     		$("#triggerWP").live("click",function() {
    			var wpTitle = $(this).attr('wptitle');
    			var wpID = $(this).attr('wpid');
    			showListOfReportsByWP(wpTitle,wpID);
    			});  
     	
    		
     		
    		$("#triggerPartner").live("click",function() {
    			$('#topArticle').empty();
    			$('#secondArticle').empty();
    			$('#secondArticleContainer').hide();
    			$('#topArticleContainer').show();
    			var partnerID = $(this).attr('partnerid');
    			var partnerName = $(this).attr('partnername');
    			currentPartner=partnerID;
    			$('#topArticle').append('<h4 class="settings_form_head_title"> Partner: '+partnerName+'</h4>');
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
    			var partnerID = $(this).attr('partnerid');
    			var date = $(this).attr('reportdate');
    			var wpId=$(this).attr('wpid');
    			var partnerName = $(this).attr('partnername');
    			showReport(partnerID,date,wpId,partnerName);
    		});
    		
    		$("#testUpdate").live("click",function() {
    			getReport();
    			showListOfReportsByWP('HARDWARE','1355348593079');
    			showReport(currentPartner,currentReport,currentWP,currentPartnerName);
    		});
    		
    		
    		function showReport(partnerID,date,wpId,partnerName){
    			$('#projectSection').empty();
    			currentPartner=partnerID;
    			currentReport=date;
    			currentWP=wpId;
    			currentPartnerName=partnerName;
    			$(xmlReport).find('subreport').each(function(){
					var reportWP=$(this).attr("WP");
					var reportWPID=$(this).attr("WPID");
					var partnerWP=$(this).attr("partner");
					var reportDate=$(this).attr("date");
						if(partnerID == partnerWP && reportWPID == wpId && reportDate==date){

						var status= $(this).children('status').text();	
						var feedback= $(this).children('feedback').text();	
						var flag= $(this).children('flag').text().toLowerCase();
						var explanation= $(this).children('explanation').text();
						//$('#secondArticle').append('<h2 class="settings_form_head_title">Report by Partner '+partnerName+' for WP '+reportWP+' on date '+date+'</h2>');
						$('#projectSection').append('<h6 class="settings_form_head_title">Report</h6>');
						$('#projectSection').append('<div class="statusContainer"><a>By: '+partnerName+'<br>Report Date: '+date+'<br>Workpackage '+reportWP+'<br>Total effort: 1 month<br>Current status: '+status+'</a></div>');
						
						
						$('#projectSection').append('<h2 class="settings_form_title">Expenses</h2>');
						$(this).find('expenses').each(function(){
							var eId = $(this).attr("id");
							var concept= $(this).children('concept').text();	
							var description= $(this).children('description').text();	
							var amount= $(this).children('amount').text();
			    			$('#projectSection').append('<div class="tableList"><div class="table6odd">'+concept+'</div><div class="table6odd">'+description+'</div><div class="table6odd">'+amount+'</div><div class="table6odd">DELETE</div></div>');

						});
						$('#projectSection').append('<a><br><img src="css/add.png"/></a>');
						
						
						
						$('#projectSection').append('<h2 class="settings_form_title">Raise a red flag in case any blocking issue came up</h2>');
						if(flag=="red"){
						$('#projectSection').append('<div class="statusContainer"><button class="button" id="editflag" color="green">GREEN FLAG</button><button class="color red button">RED FLAG</button></div>');
						}else{
							$('#projectSection').append('<div class="statusContainer"><button class="color green button">GREEN FLAG</button><button class="button" id="editflag" color="red">RED FLAG</button></div>');
						}
						$('#projectSection').append('<a class="editTextArea" id="explanation">'+explanation+'</a>');

						$('#projectSection').append('<h2 class="settings_form_title">CONFIRM/MODIFY REPORT STATUS</h2>');
						$('#projectSection').append('<div class="statusContainer"><button class="color blue button">Block</button><button class="color blue button">Accept</button><button class="color blue button">Reject</button><button class="color blue button">Open</button><a class="editTextArea">'+feedback+'</a></div>');



						$(this).find('task').each(function(){
							var taskTitle = $(this).attr("title");
							var taskId = $(this).attr("id");
							var work= $(this).children('work').text();	
							var result= $(this).children('result').text();	
							var effort= $(this).children('effort').text();
							$('#secondArticle').append('<h4 class="settings_form_head_title">Task '+taskTitle+'</h4>');
							$('#secondArticle').append('<h2 class="settings_form_title">Work</h2>');
							$('#secondArticle').append('<a class="editTask" id="work" taskid="'+taskId+'">'+work+'</a>');
							$('#secondArticle').append('<h2 class="settings_form_title">Result</h2>');
							$('#secondArticle').append('<a class="editTask" id="result" taskid="'+taskId+'">'+result+'</a>');
							$('#secondArticle').append('<h2 class="settings_form_title">Effort</h2>');
							$('#secondArticle').append('<a class="editTask" id="effort" taskid="'+taskId+'">'+effort+'</a>');


						});	
						
						}
					});
    	        $('#secondArticleContainer').show();    			
    		}
    		
     		function showListOfReportsByWP(wpTitle,wpID){
     			$('#topArticle').empty();
    			$('#secondArticle').empty();
    			$('#secondArticleContainer').hide();
    			$('#topArticleContainer').show();
    			
    			//$('#topArticle').append('<h1 class="settings_form_head_titleee"><a>WorkPackage: '+wpTitle+'</a><div class="line-separator"></div></h1>');
    			$('#topArticle').append('<h4 class="settings_form_head_title"> Workpackage: '+wpTitle+'</h4>');
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
     		}
     		
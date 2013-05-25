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
    			$('#topArticle').append('<h3> Partner: '+partnerName+'</h3>');
    			$('#topArticle').append('<div class="tableHeader"><table id="reportGrid" summary="List of Reports"><thead><tr><th class="thstatus">Status</th><th class="thdate">Date</th><th class="thpartner">Partner</th><th class="thwp">Workpackage</th><th class="theffort">Effort</th><th class="thflag">Flag</th></tr></thead><tbody id="reportGridBody"></tbody></table></div>');
    			$(xmlReport).find('subreport').each(function(){
					var reportWP=$(this).attr("WP");
					var reportWPID=$(this).attr("WPID");
					var partnerWP=$(this).attr("partner");
					var reportDate=$(this).attr("date");
					var status= $(this).children('status').text();	
					var flag= $(this).children('flag').text();
						if(partnerID == partnerWP){
						var flagMarkup;
						if (flag.toLowerCase()=='red'){
							flagMarkup='<img src="http://www.boycottowl.com/images/icon_red_flag.gif"></img>';
						}else{
							flagMarkup='<img src="http://www.lajaula.com.py/iconos/844357/original/flag_green.png"></img>';
							}
						$('#reportGridBody').append('<tr><td>'+status+'</td><td><a href="#" id="triggerReport" class="topbuttonNO" partnerID="'+partnerID+'" partnername="'+partnerName+'" wptitle="'+reportWP+'" wpid="'+reportWPID+'" reportdate="'+reportDate+'">'+reportDate+'</a></td><td>'+partnerName+'</td><td>'+reportWP+'</td><td>1 month</td><td>'+flagMarkup+'</td></tr>');
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
						$('#projectSection').append('<h2>Report</h2>');
						$('#projectSection').append('<h3>Info</h3>');
						//$('#projectSection').append('<div class="Table_Menu_Partner"/>');
						
		    			$('#projectSection').append('<div class="tableHeader"><table id="reportInformation" summary="Report information"><tbody id="reportInformationBody"></tbody></table></div>');
		    			
		    			$('#reportInformationBody').append('<tr><td class="tdfield">Partner:</td><td class="tdvalue">'+partnerName+'</td></tr>');
		    			$('#reportInformationBody').append('<tr><td class="tdfield">Report Date:</td><td class="tdvalue">'+date+'</td></tr>');
		    			$('#reportInformationBody').append('<tr><td class="tdfield">Workpackage</td><td class="tdvalue">'+reportWP+'</td></tr>');
		    			$('#reportInformationBody').append('<tr><td class="tdfield">Total Effort</td><td class="tdvalue">1 month</td></tr>');
		    			$('#reportInformationBody').append('<tr><td class="tdfield">Status</td><td class="tdvalue"> '+status+'</td></tr>');


						$('#projectSection').append('<h3>Expenses</h3>');
		    			$('#projectSection').append('<div class="tableHeader"><table id="expensesGrid" summary="List of Expenses"><thead><tr><th class="thconcept">Concept</th><th class="thdescription">Description</th><th class="thamount">Amount</th></thead><tbody id="expensesGridBody"></tbody></table></div>');

						$(this).find('expenses').each(function(){
							var eId = $(this).attr("id");
							var concept= $(this).children('concept').text();							
							var description= $(this).children('description').text();	
							var amount= $(this).children('amount').text();
							var st='<tr><td>'+concept+'</td><td>'+description+'</td><td>'+amount+'</td></tr>';
			    			$('#expensesGridBody').append(st);

						});
						$('#expensesGridBody').append('<tr><td></td><td></td><td><a href="#" class="addExpenses">add+</a></td></tr>');
						
						
						
						$('#projectSection').append('<h3>Flag</h3>');
						$('#projectSection').append('<p>Raise a red flag in case any blocking issue came up duerint this reporting period</p>');
						if(flag=="red"){
						$('#projectSection').append('<div class="statusContainer"><button class="button" id="editflag" color="green">GREEN FLAG</button><button class="color red button">RED FLAG</button></div>');
						}else{
							$('#projectSection').append('<div class="statusContainer"><button class="color green button">GREEN FLAG</button><button class="button" id="editflag" color="red">RED FLAG</button></div>');
						}
						$('#projectSection').append('<label>Explanation/Comments:</label><br><textarea class="editTextArea" id="explanation">'+explanation+'</textarea>');

						$('#projectSection').append('<h3>Confirm/Modify Report status</h3>');
						$('#projectSection').append('<div class="statusContainer"><button class="color blue button" id="editStatus" value="blocked">Block</button><button id="editStatus" class="color blue button" value="accepted">Accept</button><button id="editStatus" value="rejected" class="color blue button">Reject</button><button id="editStatus" class="color blue button" value="open">Open</button><a class="editTextArea" id="feedback">'+feedback+'</a></div>');


						$('#secondArticle').append('<h2>Tasks</h2>');
						$(this).find('task').each(function(){
							var taskTitle = $(this).attr("title");
							var taskId = $(this).attr("id");
							var work= $(this).children('work').text();	
							var result= $(this).children('result').text();	
							var effort= $(this).children('effort').text();
							$('#secondArticle').append('<h3>Task '+taskTitle+'</h3>');
							$('#secondArticle').append('<h4>Work</h4>');
							$('#secondArticle').append('<a class="editTask" id="work" taskid="'+taskId+'">'+work+'</a>');
							$('#secondArticle').append('<h4>Result</h4>');
							$('#secondArticle').append('<a class="editTask" id="result" taskid="'+taskId+'">'+result+'</a>');
							$('#secondArticle').append('<h4>Effort</h4>');
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
    			$('#topArticle').append('<h3> Workpackage: '+wpTitle+'</h3>');
    			$('#topArticle').append('<div class="tableHeader"><table id="reportGrid" summary="List of Reports"><thead><tr><th class="thstatus">Status</th><th class="thdate">Date</th><th class="thpartner">Partner</th><th class="thwp">Workpackage</th><th class="theffort">Effort</th><th class="thflag">Flag</th></tr></thead><tbody id="reportGridBody"></tbody></table></div>');
    			$(xmlReport).find('subreport').each(function(){
    				var wpIdFromSubreport =$(this).attr("WPID");
    				var reportWP=$(this).attr("WP");
					var partnerID=$(this).attr("partner");
					var partnerName=$(this).attr("partnerName");
					var reportDate=$(this).attr("date");
					var status= $(this).children('status').text();	
					var flag= $(this).children('flag').text();					
					if(wpID == wpIdFromSubreport){
						var flagMarkup;
						if (flag.toLowerCase()=='red'){
							flagMarkup='<img src="http://www.boycottowl.com/images/icon_red_flag.gif"></img>';
						}else{
							flagMarkup='<img src="http://www.lajaula.com.py/iconos/844357/original/flag_green.png"></img>';
							}
						$('#reportGridBody').append('<tr><td>'+status+'</td><td><a href="#" id="triggerReport" class="topbuttonNO" partnerID="'+partnerID+'" partnername="'+partnerName+'" wptitle="'+reportWP+'" wpid="'+wpIdFromSubreport+'" reportdate="'+reportDate+'">'+reportDate+'</a></td><td>'+partnerName+'</td><td>'+reportWP+'</td><td>1 month</td><td>'+flagMarkup+'</td></tr>');
						
						}					
					});
     		}
     		
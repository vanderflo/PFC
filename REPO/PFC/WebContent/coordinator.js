//Llamada AJAX para recuperar la info del proyecto actual

     		$("#selectProject").live("click",function() {
     		$('#coordinatorWP').empty();
     		$('#coordinatorPartners').empty();
     		initProject();
     		});
     		
     		$("#triggerWP").live("click",function() {
    			currentview="w";
     			var wpTitle = $(this).attr('wptitle');
    			var wpID = $(this).attr('wpid');
    			currentWP=wpID;
    			showListOfReports(wpTitle,wpID,currentview);
    			});  
     	
    		
     		
    		$("#triggerPartner").live("click",function() {
    			currentview="p";
    			var partnerID = $(this).attr('partnerid');
    			var partnerName = $(this).attr('partnername');
    			currentPartner=partnerID;
    			showListOfReports(partnerName,partnerID,currentview);
    			});
    		

    		$("#triggerReport").live("click",function() {
    			var partnerID = $(this).attr('partnerid');
    			var date = $(this).attr('reportdate');
    			var wpId=$(this).attr('wpid');
    			var partnerName = $(this).attr('partnername');
    			showReport(partnerID,date,wpId,partnerName);
    		});
    		
    		$("#testUpdate").live("click",function() {
    			updateView();
    		});
    		
    		
    		function showReport(partnerID,date,wpId,partnerName){
    			$('#projectSection').empty();
    			$('#taskSection').empty();
    			$('#addExpensesForm').hide();
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
						var lastupdate= $(this).children('lastupdate').text();
						var feedback= $(this).children('feedback').text();	
						var flag= $(this).children('flag').text().toLowerCase();
						var explanation= $(this).children('explanation').text();
						
		    			$('#reportInformationBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Partner:</td><td class="tdvalue">'+partnerName+'</td></tr>');
		    			$('#reportInformationBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Report Date:</td><td class="tdvalue">'+date+'</td></tr>');
		    			$('#reportInformationBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Workpackage</td><td class="tdvalue">'+reportWP+'</td></tr>');
		    			$('#reportInformationBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Total Effort</td><td class="tdvalue">1 month</td></tr>');
		    			$('#reportInformationBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Status</td><td class="tdvalue"> '+status+'</td></tr>');
		    			$('#reportInformationBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Last Update</td><td class="tdvalue"> '+lastupdate+'</td></tr>');


						$(this).find('expenses').each(function(){
							var eId = $(this).attr("id");
							var concept= $(this).children('concept').text();							
							var description= $(this).children('description').text();	
							var amount= $(this).children('amount').text();
							var st='<tr><td>'+concept+'</td><td>'+description+'</td><td>'+amount+'</td></tr>';
			    			$('#expensesGridBody').append(st);

						});
						$('.expensesSection').append('<h5><a id="addExpenses"><span class="icon-plus"></span>&nbsp;Click here to add more expenses</a></h5>');
						$('.expensesSection').append('<form id="addExpensesForm"><div class="field"><label for="name">Concept:</label><input type="radio" name="concept" id="concept" value="travel">Travel<br><input type="radio" name="concept" id="concept" value="equipment">Equipment<br><p class="hint">Choose expenses type</p></div><div class="field"><label for="email">Amount:</label><input type="text" class="input" name="amount" id="amount" /><p class="hint">Specify amount</p></div><div class="field"><label for="message">Description:</label><input type="text" class="input" name="description" id="description"><p class="hint">Describe expenses</p></div><div class="field"><label for="Submit"><a>&nbsp;</a></label><input type="submit" name="Submit" class="button" value="Submit" /><a id="cancelExpenses">or CANCEL</a></div></form>');
						
						$('#projectSection').append('<h3><span class="icon-flag"></span>&nbsp;Flag</h3>');
						$('#projectSection').append('<div id="flagContainer" class="subsection"><p><span class="icon-hand-right"></span>&nbsp;Raise a red flag in case any blocking issue came up duerint this reporting period</p></div>');
						if(flag=="red"){
						$('#flagContainer').append('<div class="statusContainer"><button class="button" id="editflag" color="green">GREEN FLAG</button><button class="color red button">RED FLAG</button></div>');
						}else{
							$('#flagContainer').append('<div class="statusContainer"><button class="color green button">GREEN FLAG</button><button class="button" id="editflag" color="red">RED FLAG</button></div>');
						}
						$('#flagContainer').append('<h4><span class="icon-edit">&nbsp;</span> Explanation/Comments</h4><h5 class="editTextArea" id="explanation">'+explanation+'</h5>');

						$('#projectSection').append('<h3><span class="icon-comments"></span>&nbsp;Status and Feedback</h3>');
						$('#projectSection').append('<div id="statusContainer" class="subsection"><p><span class="icon-hand-right"></span>&nbsp;Explanation of the statuses</p></div>');
						$('#statusContainer').append('<div class="statusContainer"><button class="color blue button" id="editStatus" value="blocked">Block</button><button id="editStatus" class="color blue button" value="accepted">Accept</button><button id="editStatus" value="rejected" class="color blue button">Reject</button><button id="editStatus" class="color blue button" value="open">Open</button></div>');
						$('#statusContainer').append('<h4><span class="icon-edit">&nbsp;</span>Leave Feedback</label></h4><h5 class="editTextArea" id="feedback">'+feedback+'</h5>')

						$('#taskSection').append('<h2><span class="icon-tasks"></span>&nbsp;Tasks</h2>');
						var taskCount=1;
						$(this).find('task').each(function(){
							var taskTitle = $(this).attr("title");
							var taskId = $(this).attr("id");
							var work= $(this).children('work').text();	
							var result= $(this).children('result').text();	
							$('#taskSection').append('<h3><span class="icon-chevron-right"></span>&nbsp;Task '+taskTitle+'</h3>');
							$('#taskSection').append('<div class="subsection"><h4><span class="icon-edit">&nbsp;</span>Work</h4><h6 class="editTask" id="work" taskid="'+taskId+'">'+work+'</h6></div>');
							$('#taskSection').append('<div class="subsection"><h4><span class="icon-edit">&nbsp;</span>Result</h4><h6 class="editTask" id="result" taskid="'+taskId+'">'+result+'</h6></div>');
							
			    			$('#taskSection').append('<div class="subsection effortSection_'+taskCount+'"><h4><span class="icon-user">&nbsp;</span>Effort</h4><table id="effortGrid" summary="List of Effort"><thead><tr><th class="thperson">Team member</th><th class="theeffort">Effort</th></thead><tbody id="effortGridBody_'+taskCount+'"></tbody></table></div>');

							$(this).children('effort').each(function(){
								var effort= $(this).children('effortperperson').text();							
								var person= $(this).children('person').text();	
								var st='<tr><td>'+person+'</td><td>'+effort+'</td></tr>';
				    			$('#effortGridBody_'+taskCount).append(st);
							});
							
							$('.effortSection_'+taskCount).append('<h5><a id="addEffort" taskid="'+taskId+'"><span class="icon-plus"></span>&nbsp;Click here to add a new effort entry</a></h5>');
							$('.effortSection_'+taskCount).append('<form id="addEffortForm_'+taskId+'"><div class="field"><label for="member">Team Member:</label><input type="text" class="input" name="id" id="member" /><p class="hint">Effort</p></div><div class="field"><label for="effortpp">Effort:</label><input type="text" class="input" name="value" id="effortpp"><p class="hint">Effort</p></div><div class="field"><label for="Submit"><a>&nbsp;</a></label><input type="hidden" name="taskid" value="'+taskId+'"><input type="submit" name="Submit" class="button" value="Submit" /><a id="cancelEffort" taskid="'+taskId+'">or CANCEL</a></div></form>');
							taskCount++;
						});	
						
						}
					});
    	        $('#reportArticle').show();    			
    		}
    		
     		function showListOfReports(displayName,id,currentview){
     			$('#topArticle').empty();
    			$('#taskSection').empty();
    			$('#reportContainer').hide();
    			$('#topArticleContainer').show();
    			if (currentview=="w"){
    			$('#topArticle').append('<h2><span class="icon-list-ul"></span>&nbsp;List of Reports for Workpackage: '+displayName+'</h2>');
    			}else if (currentview=="p"){
        		$('#topArticle').append('<h2><i class="icon-list-ul"></i>&nbsp;List of Reports for Partner: '+displayName+'</h2>');
    			}
    			$('#topArticle').append('<div class="tableHeader"><table id="reportGrid" summary="List of Reports"><thead><tr><th class="thstatus">Status</th><th class="thdate">Date</th><th class="thpartner">Partner</th><th class="thwp">Workpackage</th><th class="theffort">Effort</th><th class="thlastupdate">Last Update</th><th class="thflag">Flag</th></tr></thead><tbody id="reportGridBody"></tbody></table></div>');
    			$(xmlReport).find('subreport').each(function(){
    				var wpIdFromSubreport =$(this).attr("WPID");
    				var reportWP=$(this).attr("WP");
					var partnerID=$(this).attr("partner");
					var partnerName=$(this).attr("partnerName");
					var reportDate=$(this).attr("date");
					var status= $(this).children('status').text();	
					var lastupdate= $(this).children('lastupdate').text();	
					var flag= $(this).children('flag').text().toLowerCase();
					var row='<tr><td>'+status+'</td><td><a href="#" id="triggerReport" class="topbuttonNO" partnerID="'+partnerID+'" partnername="'+partnerName+'" wptitle="'+reportWP+'" wpid="'+wpIdFromSubreport+'" reportdate="'+reportDate+'">'+reportDate+'</a></td><td>'+partnerName+'</td><td>'+reportWP+'</td><td>1 month</td><td>'+lastupdate.substring(0,10)+'</td><td><span class="icon-flag-'+flag+'"></span></td></tr>';
						if(currentview=="w" && id == wpIdFromSubreport){
						currentWPtitle=reportWP;
						$('#reportGridBody').append(row);
						}
						else if(currentview=="p" && id == partnerID){
						$('#reportGridBody').append(row);
						}
					});
     		}
     		
     	    $( "#addExpenses" ).live("click", function(e) {
     	      $( "#addExpensesForm" ).slideToggle();
     	      });
     	    
     	    $( "#cancelExpenses" ).live("click", function(e) {
      	      $( "#addExpensesForm" ).slideToggle();
      	      });
     		
     	    
     	    $( "#addEffort" ).live("click", function(e) {
     	    	var tId=$(this).attr("taskid");
       	      $( "#addEffortForm_"+tId ).slideToggle();
       	      });
       	    
       	    $( "#cancelEffort" ).live("click", function(e) {
       	    		var tId=$(this).attr("taskid");
        	      $( "#addEffortForm_"+tId ).slideToggle();
        	      });
     	    
     	   $("#addExpensesForm").live(
     			  "submit",
     		function( event ){
     		var $form = $(this),
       		$inputs = $form.find("concept, description, amount"),
           	serializedData = $form.serialize();
       		var concept = $("[name='concept']").val();
       		var description = $("[name='description']").val();
       		var amount = $("[name='amount']").val();
   		    // let's disable the inputs for the duration of the ajax request
   		    $inputs.attr("disabled", "disabled");
   		    $.ajax({
   		        url: "http://localhost:8080/PFC/rest/API/report/addexpenses/"+currentProject+"/"+currentWP+"/"+currentPartner+"/"+currentReport,
   		        type: "post",
   		        data: serializedData,
   		        // callback handler that will be called on success
   		        success: function(response, textStatus, jqXHR){
   		            // log a message to the console
   		        console.log("Expenses added");	        
   		      
   		        },
   		        // callback handler that will be called on error
   		        error: function(jqXHR, textStatus, errorThrown){
   		            // log the error to the console
   		            console.log(
   		                "The following error occured: "+
   		                textStatus, errorThrown
   		            );
   		        },
   		        complete: function(){
   		        	updateView();
   		        }
   		    });
   		
   		    // prevent default posting of form
   		    event.preventDefault();
   		});//END send Info
     	   
     	 
     	  $("[id^=addEffortForm]").live(
     			  "submit",
     		function( event ){
     		var $form = $(this),
       		$inputs = $form.find("id, value"),
           	serializedData = $form.serialize();
     		
     		var taskId=$(this).find('[name=taskid]').val();
     		
 

       		
   		    $inputs.attr("disabled", "disabled");
   		    $.ajax({
   		        url: "http://localhost:8080/PFC/rest/API/task/edit/"+currentProject+"/"+currentWP+"/"+currentPartner+"/"+currentReport+"/"+taskId,
   		        type: "post",
   		        data: serializedData,
   		        // callback handler that will be called on success
   		        success: function(response, textStatus, jqXHR){
   		            // log a message to the console
   		        console.log("Expenses added");	        
   		      
   		        },
   		        // callback handler that will be called on error
   		        error: function(jqXHR, textStatus, errorThrown){
   		            // log the error to the console
   		            console.log(
   		                "The following error occured: "+
   		                textStatus, errorThrown
   		            );
   		        },
   		        complete: function(){
   		        	updateView();
   		        }
   		    });
   		
   		    // prevent default posting of form
   		    event.preventDefault();
   		});//END send Info
     	  
     	  
     	  function updateView(){
     		getReport();
     		if(currentview="w"){
     		showListOfReports(currentWPtitle,currentWP,currentview);
     		}else if(currentview="p"){
         	showListOfReports(currentPartnerName,currentPartner,currentview);	
     		}
 			showReport(currentPartner,currentReport,currentWP,currentPartnerName);
     	  }
     	    
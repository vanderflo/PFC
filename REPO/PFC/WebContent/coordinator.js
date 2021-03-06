//Llamada AJAX para recuperar la info del proyecto actual

     		$("#selectProject").live("click",function() {
	     		$('#coordinatorWP').empty();
	     		$('#coordinatorPartners').empty();
	     		$('#projectArticle').hide();
    			var projectId = $(this).attr('projectid');
    			currentProjectTitle=$(this).attr('projecttitle');
    			currentProject=projectId;
	     		initProject(projectId);
     		});
     		
     		
     		
     		$("#triggerWP").live("click",function() {
     	        $('#projectArticle').hide();
     			currentview="w";
     			var wpTitle = $(this).attr('wptitle');
    			var wpID = $(this).attr('wpid');
    			currentWP=wpID;
    			showListOfReports(wpTitle,wpID,currentview);
    			});  
     	
    		
     		
    		$("#triggerPartner").live("click",function() {
     	        $('#projectArticle').hide();
    			currentview="p";
    			var partnerID = $(this).attr('partnerid');
    			var partnerName = $(this).attr('partnername');
    			currentPartner=partnerID;
    			showListOfReports(partnerName,partnerID,currentview);
    			});
    		

    		$("#triggerReport").live("click",function() {
    			var partnerID = $(this).attr('partnerid');
    			var coordID = $(this).attr('leader');
    			var date = $(this).attr('reportdate');
    			var wpId=$(this).attr('wpid');
    			var partnerName = $(this).attr('partnername');
    			if(currentId==coordID){
    				wpLeader=true;
    			}else{
    				wpLeader=false;
    			}
    			if((currentId==partnerID)||(wpLeader)){
    	        showReport(partnerID,date,wpId,partnerName,true);
    			}else{
    				showReport(partnerID,date,wpId,partnerName,false);
    			}
    			return;
    		});
    		
    		$("#testUpdate").live("click",function() {
    			updateView();
    		});
    		
    		
    		function showReport(partnerID,date,wpId,partnerName,editable){
    			$('#reportInformationBody').empty();
    			$('#expensesGridBody').empty();
    			$('#addExpensesForm').hide();
    			currentPartner=partnerID;
    			currentReport=date;
    			currentWP=wpId;
    			currentPartnerName=partnerName;
    			
    			var currentEffort;
    			var wpEffort;
    			var otherReportsEffort=0.0;
    			
    			$(xmlReport).find('subreport').each(function(){
					var reportWP=$(this).attr("WP");
					var reportWPID=$(this).attr("WPID");
					var partnerWP=$(this).attr("partner");
					var reportDate=$(this).attr("date");
					if(partnerID == partnerWP && reportWPID == wpId){
						var eff=$(this).children('currentEffort').text();
						otherReportsEffort=otherReportsEffort+parseFloat(eff);
					}
						if(partnerID == partnerWP && reportWPID == wpId && reportDate==date){

						var status= $(this).children('status').text();	
						var lastupdate= $(this).children('lastupdate').text();
						var flag= $(this).children('flag').text().toLowerCase();
						var explanation= $(this).children('explanation').text();
						currentEffort=$(this).children('currentEffort').text();
						wpEffort=$(this).children('wpEffort').text();
						
						$('#flagTitle').removeClass();
						$('#flagTitle').addClass('icon-flag-'+flag);
						
		    			$('#reportInformationBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Partner:</td><td class="tdvalue">'+partnerName+'</td></tr>');
		    			$('#reportInformationBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Report Date:</td><td class="tdvalue">'+date+'</td></tr>');
		    			$('#reportInformationBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Workpackage:</td><td class="tdvalue">'+reportWP+'</td></tr>');
		    			$('#reportInformationBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Current Effort:</td><td class="tdvalue">'+currentEffort+' p/m</td></tr>');
		    			$('#reportInformationBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Status:</td><td class="tdvalue"> '+status.toUpperCase()+'</td></tr>');
		    			$('#reportInformationBody').append('<tr><td class="tdfield"><span class="icon-caret-right"></span>&nbsp;Last Update:</td><td class="tdvalue"> '+lastupdate+'</td></tr>');


						$(this).find('expenses').each(function(){
							var eId = $(this).attr("id");
							var concept= $(this).children('concept').text();							
							var description= $(this).children('description').text();	
							var amount= $(this).children('amount').text();
							var st='<tr><td>'+concept+'</td><td>'+description+'</td><td>'+amount+'</td></tr>';
			    			$('#expensesGridBody').append(st);
						});
						
						$('#commentsGridBody').empty();
						$(this).find('comment').each(function(){
							var type = $(this).attr("type");
							var time = $(this).attr("time");
							var text= $(this).text();								
							var st='<tr><td>'+type+'</td><td>'+text+'</td><td>'+time+'</td></tr>';
			    			$('#commentsGridBody').append(st);
						});
						
						
						$('#addFlagForm').empty();
						$('#addFlagForm').append('<div class="formHeader">Raise a Red flag in case you find a blocking issue on this report period</div>');
						if(flag=="red"){
						$('#addFlagForm').append('<div class="statusContainer"><button class="button" id="editflag" color="green">GREEN FLAG</button><button class="color red button">RED FLAG</button></div>');
						$('#addFlagForm').append('<div class="formHeader">Explain the reason(s) for this Red Flag</div>');
						$('#addFlagForm').append('<form id="addFeedbackExplanation"><div class="field"><input type="text" class="input" name="value" id="value" /><p class="hint">Explain the reasons for raising a red flag</p></div><input type="hidden" name="id" value="explanation"><div class="field"><input type="submit" name="Submit" class="button" value="Submit" /></div></form>');
						}else{
							$('#addFlagForm').append('<div class="statusContainer"><button class="color green button">GREEN FLAG</button><button class="button" id="editflag" color="red">RED FLAG</button></div>');
						}

						

						var listOfTasks="<option>Select Task</option>";
						var tasksDivs="";
						$('#taskSelector').empty();
						$('#effortTaskList').empty();
						$('#infoTaskList').empty();
						$('#tasks .contentDiv').remove();
						$(this).find('task').each(function(){
							var taskTitle = $(this).attr("title");
							var taskId = $(this).attr("id");
							var work= $(this).children('work').text();	
							var result= $(this).children('result').text();
							
							tasksDivs=tasksDivs+('<div class="contentDiv taskReport" id="tId_'+taskId+'"><h5>Work</h5><a id="taskWork">'+work+'</a><br><h5>Result</h5><a id="taskResult">'+result+'</a><br><h5>Effort breakdown</h5><table id="effortGrid" summary="List of Effort"><thead><tr><th class="thperson">Team member</th><th class="theeffort">Effort</th></tr></thead><tbody id="effortGridBody_'+taskId+'">');
							listOfTasks=listOfTasks+('<option  value="'+taskId+'">'+taskTitle+'</option>');							
						
							$(this).children('effort').each(function(){
								var effort= $(this).children('effortperperson').text();							
								var person= $(this).children('person').text();	
								var st='<tr><td>'+person+'</td><td>'+effort+'</td></tr>';
								tasksDivs=tasksDivs+(st);
								$('#effortGridBody_'+taskId).append(st);
							});
							tasksDivs=tasksDivs+('</tbody></table></div>');							
						});	
						$('#taskSelector').append(listOfTasks);
						$('#effortTaskList').append(listOfTasks);
						$('#infoTaskList').append(listOfTasks);
						$('#tasks').append(tasksDivs);
					
						
						}
					});
    			plot1.series[0].data=[[wpEffort,1]];
				plot1.series[1].data=[[currentEffort,1]];
				plot1.series[2].data=[[otherReportsEffort.toString(),1]];
    	        $('#reportArticle').show();
    	        plot1.replot();
    	        $("#forleader").hide();
    	        if(wpLeader){
	       	    	  $("#forpartner").show();
	       	    	  $("#forleader").show();
	       	      }
    	        
    	        if (editable){
    	        	$("#editionReport").show();
    	        	$("#editionReportNotAllowed").hide();
    	        }else{
    	        	$("#editionReport").hide();
    	        	$("#editionReportNotAllowed").show();
    	        }
    		}
    		
    		
     		function showListOfReports(displayName,id,currentview){
     			$('#topArticle').empty();
    			$('#taskSection').empty();
    			$('#reportContainer').hide();
    			$('#topArticleContainer').show();
    			if (currentview=="w"){
    			$('#topArticle').append('<h1>Reports for Workpackage: '+displayName+'</h1>');
    			}else if (currentview=="p"){
        		$('#topArticle').append('<h1>Reports for Partner: '+displayName+'</h1>');
    			}else if (currentview=="all"){
        		$('#topArticle').append('<h1>Reports for Project: '+displayName+'</h1>');
    			}
    			$('#topArticle').append('<div class="tableHeader"><table id="reportGrid" summary="List of Reports"><thead><tr><th class="thstatus">Status</th><th class="thdate">Date</th><th class="thpartner">Partner</th><th class="thwp">Workpackage</th><th class="thleader">Leader</th><th class="theffort">Effort (p/m)</th><th class="thlastupdate">Last Update</th><th class="thflag">Flag</th></tr></thead><tbody id="reportGridBody"></tbody></table></div>');
    			$(xmlReport).find('subreport').each(function(){
    				var wpIdFromSubreport =$(this).attr("WPID");
    				var reportWP=$(this).attr("WP");
					var partnerID=$(this).attr("partner");
					var partnerName=$(this).attr("partnerName");
					var leader=$(this).attr("leader");
					var reportDate=$(this).attr("date");
					var status= $(this).children('status').text();	
					var lastupdate= $(this).children('lastupdate').text();	
					var flag= $(this).children('flag').text().toLowerCase();
					var currentReportEffort= $(this).children('currentEffort').text();
					var row='<tr><td class="status '+status.toLowerCase()+'">'+status.toUpperCase()+'</td><td><a href="#" id="triggerReport" class="topbuttonNO" leader="'+leader+'"  partnerID="'+partnerID+'" partnername="'+partnerName.toUpperCase()+'" wptitle="'+reportWP+'" wpid="'+wpIdFromSubreport+'" reportdate="'+reportDate+'">'+reportDate+'</a></td><td>'+partnerName.toUpperCase()+'</td><td>'+reportWP+'</td><td>'+leader.toUpperCase()+'</td><td>'+currentReportEffort+'</td><td>'+lastupdate.substring(0,9)+'</td><td><span class="icon-flag-'+flag+'"></span></td></tr>';
						if(currentview=="w" && id == wpIdFromSubreport){
						currentWPtitle=reportWP;
						$('#reportGridBody').append(row);
						}
						else if(currentview=="p" && id == partnerID){
						$('#reportGridBody').append(row);
						}else if(currentview=="all"){
							$('#reportGridBody').append(row);	
						}
					});
     		}
     		
     		
     		
     		
     	    $( "#showExpensesForm" ).live("click", function(e) {
     	      $( "#statusReport" ).hide();
     	      $( "#addFeedbackCommentForm" ).hide();
     	      $( "#addFlagForm" ).hide();
     	      $( "#addTaskReportEffortForm" ).hide();
     	      $( "#addTaskReportInfoForm" ).hide();
     	      $( "#addExpensesForm" ).show();
     	    });
     	    
     	    
     	    
     	    $( "#showFlagForm" ).live("click", function(e) {
       	      $( "#statusReport" ).hide();
     	      $( "#addFeedbackCommentForm" ).hide();
     	      $( "#addExpensesForm" ).hide();
     	      $( "#addTaskReportEffortForm" ).hide();
     	      $( "#addTaskReportInfoForm" ).hide();
     	      $( "#addFlagForm" ).show();     	      
       	    });
     	    
     	    $( "#showStatusReport" ).live("click", function(e) {         	  
       	      $( "#addFeedbackCommentForm" ).hide();
       	      $( "#addFlagForm" ).hide();
       	      $( "#addExpensesForm" ).hide();
       	      $( "#addTaskReportEffortForm" ).hide();
       	      $( "#addTaskReportInfoForm" ).hide();
       	      $( "#statusReport" ).show();
       	      $("#forleader").hide();
       	      if(wpLeader){
       	    	  $("#forpartner").show();
       	    	  $("#forleader").show();
       	      }
         	    });
     	    
     	    $( "#showFeedbackForm" ).live("click", function(e) {
         	  $( "#statusReport" ).hide();
       	      $( "#addFlagForm" ).hide();
       	      $( "#addExpensesForm" ).hide();
       	      $( "#addTaskReportEffortForm" ).hide();
       	      $( "#addTaskReportInfoForm" ).hide();
       	      $( "#addFeedbackCommentForm" ).show();
         	    });
     	    
     	    $( "#showEffortForm" ).live("click", function(e) {
           	  $( "#statusReport" ).hide();
     	      $( "#addFlagForm" ).hide();
     	      $( "#addExpensesForm" ).hide();
     	      $( "#addFeedbackCommentForm" ).hide();
     	      $( "#addTaskReportInfoForm" ).hide();
     	      $( "#addTaskReportEffortForm" ).show();
       	    });
     	    
     	   $( "#showTaskInfoForm" ).live("click", function(e) {
     		  $( "#statusReport" ).hide();
      	      $( "#addFlagForm" ).hide();
      	      $( "#addExpensesForm" ).hide();
      	      $( "#addFeedbackCommentForm" ).hide();
      	      $( "#addTaskReportEffortForm" ).hide();
      	      $( "#addTaskReportInfoForm" ).show();
        	    });
     	    
     	   $( "#taskSelector" ).live("change", function(e) {
     		  var tId=$(this).attr("value");
     		  $("[id^=tId]").hide();
     		  $("#tId_"+tId).show();
     		  });
     	    
     	    $( "#cancelExpenses" ).live("click", function(e) {
      	      $( "#addExpensesForm" ).slideToggle();
      	      });
     		
     	    
     	    $( "#addEffort" ).live("click", function(e) {
     	    	var tId=$(this).attr("taskid");
       	      $( "#addTaskReportEffortForm_"+tId ).slideToggle();
       	      });
       	    
       	    $( "#cancelEffort" ).live("click", function(e) {
       	    		var tId=$(this).attr("taskid");
        	      $( "#addTaskReportEffortForm_"+tId ).slideToggle();
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
   		        url: "rest/API/report/addexpenses/"+currentProject+"/"+currentWP+"/"+currentPartner+"/"+currentReport,
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
   		        	$("#addExpensesForm")[0].reset();
   		        	updateView();
   		        }
   		    });   		
   		    // prevent default posting of form
   		    event.preventDefault();
   		});//END send Info
     	   
     	  $("[id^=addFeedback]").live(
      			  "submit",
      		function( event ){
      		var $form = $(this),
        		$inputs = $form.find("id,value"),
            	serializedData = $form.serialize();
    		    // let's disable the inputs for the duration of the ajax request
    		    $inputs.attr("disabled", "disabled");
    		    $.ajax({
    		        url: "rest/API/report/edit/"+currentProject+"/"+currentWP+"/"+currentPartner+"/"+currentReport,
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
    		    event.preventDefault();
    		});//END send Info   
     	   
     	 
     	  $("[id^=addTaskReport]").live(
     			  "submit",
     		function( event ){
     		var $form = $(this),
       		$inputs = $form.find("id, value"),
           	serializedData = $form.serialize();
     		var taskId=$(this).find('[name=taskid]').val();
     		 $inputs.attr("disabled", "disabled");
   		    $.ajax({
   		        url: "rest/API/report/task/edit/"+currentProject+"/"+currentWP+"/"+currentPartner+"/"+currentReport+"/"+taskId,
   		        type: "post",
   		        data: serializedData,
   		        // callback handler that will be called on success
   		        success: function(response, textStatus, jqXHR){
   		            // log a message to the console
   		        console.log("Expenses added");
   		     $('form').each(function() {
   	            this.reset();
   	        });
   		      
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
   		        	alert("Task report updated successfully");
   		        }
   		    });   		
   		    event.preventDefault();
   		});//END send Info
     	  
    	   $("#addReportEmailForm").live(
      			  "submit",
      		function( event ){
      		var $form = $(this),
        		$inputs = $form.find("email,emailcomment"),
            	serializedData = $form.serialize();
    		    // let's disable the inputs for the duration of the ajax request
    		    $inputs.attr("disabled", "disabled");
    		    $.ajax({
    		        url: "rest/API/report/sendemail/"+currentProject+"/"+currentWP+"/"+currentPartner+"/"+currentReport,
    		        type: "post",
    		        data: serializedData,
    		        beforeSend: function(){
    		        	$('#loading').html("<p>Sending report via email...</p>");
    		            $("#loading").show();
    		            $('#addReportEmailForm').hide();
    		         },
    		        // callback handler that will be called on success
    		        success: function(response, textStatus, jqXHR){
    		            // log a message to the console
    		        	$("#addReportEmailForm")[0].reset();
    		            $('#loading').html("<p>Report Sent!</p><div id='closeDialog' style='display:none;'><a class='button close' href='#'>CONTINUE<span></span></a></div>");
    		            $('#addReportEmailForm').show();
    		      
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
    		        	alert("Report sent");
    		        	updateView();
    		        	$("#emailreport").hide();
    		        	
    		        }
    		    });   		
    		    // prevent default posting of form
    		    event.preventDefault();
    		});//END send Info  
     	  
    	 
    	   
    	
     	  
     	  
     	  function updateView(){
     		getReport(currentProject);
     		console.log(currentview);
     		if(currentview=="w"){
     		showListOfReports(currentWPtitle,currentWP,currentview);
     		}else if(currentview=="p"){
         	showListOfReports(currentPartnerName,currentPartner,currentview);	
     		}else if(currentview="all"){
         	showListOfReports(currentProjectTitle,"",currentview);	
     		}
 			showReport(currentPartner,currentReport,currentWP,currentPartnerName,true);
     	  }
     	    
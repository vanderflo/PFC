        function initMenu() {
          $('#menu ul').hide(); // Hide the submenu
          if ($('#menu li').has('ul')) $('#menu ul').prev().addClass('expandable'); // Expand/collapse a submenu when it exists  
          $('.expandable').click(
            function() {
                $(this).next().slideToggle();
                $(this).toggleClass('expanded');
              }
            );
          }
        function initTopMenu() {
            $('#topmenu ul').hide(); // Hide the submenu
            if ($('#topmenu li').has('ul')) $('#topmenu ul').prev().addClass('topexpandable'); // Expand/collapse a submenu when it exists  
            $('.topexpandable').click(
              function() {
                  $(this).next().slideToggle();
                  $(this).toggleClass('topexpanded');
                }
              );
            }
        function initActiveMenu() {
            $('#activemenu ul').hide(); // Hide the submenu
            if ($('#activemenu li').has('ul')) $('#activemenu ul').prev().addClass('activeexpandable'); // Expand/collapse a submenu when it exists  
            $('.activeexpandable').click(
              function() {
                  $(this).next().slideToggle();
                  $(this).toggleClass('activeexpanded');
                }
              );
            }
 		function initProject(projectid) {
			$.ajax({
				type: "GET",
				url: "http://localhost:8080/PFC/rest/API/project/"+projectid,
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
     		getReport(projectid);
			showListOfReports(currentProjectTitle,"","all");
     		$('#menu').show();
     		}
 		
 		function getProjects(){
 			$.ajax({
				type: "GET",
				url: "http://localhost:8080/PFC/rest/API/projects",
				dataType: "xml",
				success: function(xml) {
					
					$(xml).find('project').each(function(){		
						
						var title;
						var id;						
						$(this).find('title').each(function(){
						title = $(this).text();
						});						
						id=$(this).attr("id");						
						$(this).find('status').each(function(){
						status = $(this).text();
						});
						if (status.toLowerCase()=="pending"){
							$('#pendingProjects').append('<li class="listProjectsPending"><a href="#"  class="editProject" projectid="'+id+'" projecttitle="'+title+'">'+ title + '</a><li>');
						}
						if (status.toLowerCase()=="active"){
							$('#coordinatorProjects').append('<li class="listProjectsActive"><a href="#" id="selectProject" class="selectProject" projectid="'+id+'" projecttitle="'+title+'">'+ title + '</a><li>');
						}
					});
					$('#pendingProjects').append('<li><a href="#"  class="listProjectsPending" id="addProject"><span class="icon-plus-sign"></span>&nbsp;CREATE NEW PROJECT</a><li>');


				}
			});//END Llamada AJAX
 		}
 		
 		function isEven(someNumber){
 		    if (someNumber%2 == 0){
 		    	return "";
 		    }else{
 		    	return "odd";
 		    }
 		};
 		
 		function getReport(projectid){
 			$.ajax({
     		    type: "GET",
     		    url: "http://localhost:8080/PFC/rest/API/report/get/"+projectid,
 				dataType: "xml",
 				async: false,
     		     success : function(data) {
     		    	xmlReport = data;
     		         }
     		    });
 			
 		}
 		
 		function initSearchBox(){
 			$.expr[':'].containsIgnoreCase = function(n,i,m){
                return jQuery(n).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
            };
        
            $("#searchInput").keyup(function(){

                $("#reportGridBody").find("tr").hide();
                var data = this.value.split(" ");
                var jo = $("#reportGridBody").find("tr");
                if (data!=""){
                $.each(data, function(i, v){

                     //Use the new containsIgnoreCase function instead
                     jo = jo.filter("*:containsIgnoreCase('"+v+"')");
                });
                }
                jo.show();

            }).focus(function(){
                this.value="";
                $(this).css({"color":"black"});
                $(this).unbind('focus');
            }).css({"color":"#C0C0C0"});
 			
 		}
 		
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
 		            $('#menu').hide();
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
 				        alert("Partner added to the system");

 				        },
 				        error: function(jqXHR, textStatus, errorThrown){
 				            console.log("The following error occured: "+textStatus, errorThrown);
 				        },
 				       complete: function(){
	    		        $("#addNewPartnerForm")[0].reset();

 		   		        }
 				    });
 				   event.preventDefault();
 		  		});//END #addProjectForm submit
 		 	   
 		 		$("#showemail").live('click', function(){
 		 		$("#emailreport").toggle();
 		 		});
 		 		 
 		 		$("#closeDialog").live('click', function(){
 		 	 		$("#loading").dialog( "close" );
 		 	 	});
 		 		
 		 		
 		 		  $("#loading").dialog({
 		  		    hide: 'slide',
 		  			show: 'slide',
 		  			autoOpen: false,
 		  			 position: { 
 		  				    my: 'top',
 		  				    at: 'top',
 		  				    of: $('#addReportEmailForm')
 		  				  }
 		  		});
 		 		  
 		 		  
 		 		$("#loginForm").live("submit",function( event ){
 		 			var login=$(this).find('[name=loginid]').val();
 		 			var password=$(this).find('[name=loginpassword]').val();
 		 			var d = new Date();
 		 			var n = d.getTime();
 		 			var serializedData="loginid="+login+"&loginpassword="+login+"&token="+code(password)+"&n="+n.toString();
 	 				    $.ajax({
 	 				        url: "http://localhost:8080/PFC/rest/API/partners/login",
 	 				        type: "post",
 	 				        aSync: false,
 	 				        data: serializedData,
 	 				        dataType: "text",
 	 				        success: function(response){
 	 				    	$('#helpArticleContainer').show();
 	 				        $('#headerMenu').show();
 	 				        $('#loginArticleContainer').hide();
 	 				        currentId=login;
 	 				        $('#welcomemessage').html("<span class='icon-user'></span>&nbsp;You are logged in as: "+currentId);
 	 				        },
 	 				        error: function(jqXHR, textStatus, errorThrown){
 	 				         console.log("The following error occured: "+textStatus, errorThrown);
 	 				         alert("Login incorrect");
 	 				        },
 	 				       complete: function(){
 		    		        $("#loginForm")[0].reset();

 	 		   		        }
 	 				    });
 	 				   event.preventDefault();
 	 		  		});//END #addProjectForm submit 
 		 	
 		 		$("#forgotForm").live("submit",function( event ){
 		 			var $form = $(this),
 	 		       	serializedData = $form.serialize();
 	 				    $.ajax({
 	 				        url: "http://localhost:8080/PFC/rest/API/partners/forgot",
 	 				        type: "post",
 	 				        aSync: false,
 	 				        data: serializedData,
 	 				        dataType: "text",
 	 				        success: function(response){
 	 				    	$('#loginForm').show();
 	 				        $('#forgotForm').hide();
 	 				        },
 	 				        error: function(jqXHR, textStatus, errorThrown){
 	 				         console.log("The following error occured: "+textStatus, errorThrown);
 	 				         alert("Username-Email combination not found on the system.");
  	 				    	$('#loginForm').show();
 	 				        $('#forgotForm').hide();
 	 				        },
 	 				       complete: function(){
 		    		        $("#forgotForm")[0].reset();

 	 		   		        }
 	 				    });
 	 				   event.preventDefault();
 	 		  		});//END #addProjectForm submit 
 		 		
 		 		$("#forgotpassword").live('click', function(){
 		 			$("#loginForm").hide();
 		 			$("#forgotForm").toggle();
 	 		 		});

 		
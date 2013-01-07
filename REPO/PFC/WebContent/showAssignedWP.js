     		//Mostrar proyecto
			  $("#projectButton").live("click",function() {
		     	$('#projectForm').hide();
		     	$('#wp').hide();
		     	$('#task').hide();
		     	$('#project').empty();
				$('#project').show();
				  var id = $(this).attr('projectid');
				  //var partnerID = $(this).attr('partnerID');
				  var partnerID = "001";
				  $.ajax({
						type: "GET",
						url: "http://localhost:8080/PFC/rest/API/project/"+id,
						dataType: "xml",
						success: function(xml) {
							var projectTitle;
							var formHtml="";
							$(xml).find('metainfo').each(function(){
								projectTitle= $(this).children('title').text();
								formHtml='<ul id="nav"><li><a href="#">PROJECT: '+ projectTitle + '</a></li>';
								$(this).find('partner').each(function(){
								var coordId=$(this).attr("id");
								var coordName= $(this).children('name').text();								
								formHtml=formHtml+'<li><a href="#">COORDINATOR: '+ coordName + '</a></li>';
								});
							});
							$(xml).find('workpackage').each(function(){
								
								var wpTitle=$(this).attr("title");
								var wpId=$(this).attr("id");
								var wpInfo;
								wpInfo='<li><a href="#">'+ wpTitle + '</a><ul>';
								var addWP=false;								
								$(this).find('task').each(function(){
									var taskTitle=$(this).attr("title");
									var taskInfo;
									taskInfo='<li><a href="#">Task: '+ taskTitle + '</a></li>';
										
										$(this).find('description').each(function(){
										var taskDesc=$(this).text();
										taskInfo=taskInfo+'<li><a href="#">'+ taskDesc + '</a></li>';
										});
										
										$(this).find('partner').each(function(){
										var id=$(this).attr("id");
										if(id==partnerID){
										addWP=true;
										wpInfo=wpInfo+taskInfo;											
										}										
									});
								});
								if(addWP){
								wpInfo=wpInfo+'<li><a id="seeReport" projectId='+id+' wpId='+wpId+' href="#">MANAGE REPORT</a></li>';
								formHtml=formHtml+wpInfo+'</ul>';								
								}
							});//workpackage							
							$('#project').append(formHtml);

						}		
							
						
					});//end Ajax
				  
			      return false;
			   });
     		
     		//END Mostrar proyecto
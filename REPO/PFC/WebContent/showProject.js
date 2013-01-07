     		//Mostrar proyecto
			  $("#projectButton").live("click",function() {
		     	$('#projectForm').hide();
		     	$('#wp').hide();
		     	$('#task').hide();
		     	$('#project').empty();
				$('#project').show();
				  var id = $(this).attr('projectid');				 
				  $.ajax({
						type: "GET",
						url: "http://localhost:8080/PFC/rest/API/project/"+id,
						dataType: "xml",
						success: function(xml) {
							var projectTitle;
							var formHtml="";
							$(xml).find('metainfo').each(function(){
								projectTitle= $(this).children('title').text();
								formHtml='<ul id="nav"><li><a href="#">'+ projectTitle + '</a></li>';
								$(this).find('partner').each(function(){
								var coordId=$(this).attr("id");
								var coordName= $(this).children('name').text();								
								formHtml=formHtml+'<li><a href="#">'+ coordName + '</a></li>';
								});
							});
							$(xml).find('workpackage').each(function(){
								
								var wpTitle=$(this).attr("title");
								var wpId=$(this).attr("id");
								formHtml=formHtml+'<li><a href="#">'+ wpTitle + '</a><ul>';
								
								
								
								$(this).find('task').each(function(){
									var taskTitle=$(this).attr("title");
									formHtml=formHtml+'<li><a href="#">'+ taskTitle + '</a></li>';
										
										$(this).find('description').each(function(){
										var taskDesc=$(this).text();
										formHtml=formHtml+'<li><a href="#">'+ taskDesc + '</a></li>';
										});
										// $(this).find('partner').each(function(){
										//$(this).find('member').each(function(){
											//var member = $(this).text();
											//$('#project').append('<h6>Member name: ' + member + '</h6>');
											//});										
										//$(this).find('email').each(function(){
											//var email = $(this).text();
											//$('#project').append('<h6>Email: ' + email + '</h6>');
											//});
									//});
								});
								formHtml=formHtml+'<li><a id="createTask" projectId='+id+' wpId='+wpId+' href="#">ADD NEW TASK</a></li>';
								formHtml=formHtml+'</ul>';
							});//workpackage							
							formHtml=formHtml+'<li><a id="createWp" projectId='+id+' href="#">ADD NEW WP TO PROJECT</a></li>';
							$('#project').append(formHtml);

						}		
							
						
					});//end Ajax
				  
			      return false;
			   });
     		
     		//END Mostrar proyecto
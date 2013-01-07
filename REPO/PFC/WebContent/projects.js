     		$('#projectForm').hide();
     		$('#wp').hide();
     		$('#task').hide();
     		//Llamada AJAX para recuperar los proyectos actuales.
     		$.ajax({
				type: "GET",
				url: "http://localhost:8080/PFC/rest/API/projects",
				dataType: "xml",
				success: function(xml) {
					
					$(xml).find('project').each(function(){		
						
						var status;
						var title;
						var id;						
						$(this).find('title').each(function(){
						title = $(this).text();
						});						
						id=$(this).attr("id");						
						$(this).find('status').each(function(){
						status = $(this).text();
						});						
						$('#projects').append('<h3><a id="projectButton" class="projectButton" projectid="'+id+'" href="#">' + title + '- Status '+status+'</a></h3>');	
						
					});
					$('#projects').append('<h3><a id="createProyect" class="projectButton" href="#">NEW PROJECT</a></h3>');

				}
			});//END Llamada AJAX
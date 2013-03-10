//Llamada AJAX para recuperar la info del proyecto actual
     		$.ajax({
				type: "GET",
				url: "http://localhost:8080/PFC/rest/API/project/Test1",
				dataType: "xml",
				success: function(xml) {
					$(xml).find('workpackage').each(function(){
						
						var wpTitle=$(this).attr("title");
						var wpId=$(this).attr("id");
						var wpInfo;
						$('#coordinatorWP').append('<li><a href="#">'+ wpTitle + '</a><li>');
						});//workpackage
					
						var partnersArray = new Array();
						$(xml).find('partner').each(function(){
						var partnerID=$(this).attr("id");
						if( jQuery.inArray(partnerID, partnersArray) == -1 ){
						var partnerName= $(this).children('name').text();	
						$('#coordinatorPartners').append('<li><a href="#" id="triggerPartner" class="triggerPartner" partnerID="'+partnerID+'">'+ partnerName + '</a></li>');
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

     		  
     	
     		
     		
    		$("#triggerPartner").live("click",function() {
    			$(xmlReport).find('subreport').each(function(){
					
					var reportDate=$(this).attr("date");
					var reportWP=$(this).attr("WP");
					var reportPartner=$(this).attr("WP");
					$('#wpArticle').append('<h2><a href="#">'+ reportDate + '|'+reportWP+'|'+reportPartner+'</a></h2>');
					});//workpackage
    		   });
     		
     		

     		
     		
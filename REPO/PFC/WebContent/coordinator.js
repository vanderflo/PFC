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
						$('#coordinatorPartners').append('<li><a href="#" id="triggerPartner" class="triggerPartner" partnerID="'+partnerID+'" partnername="'+partnerName+'">'+ partnerName + '</a></li>');
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
    			$('#topArticle').empty();
    			var partnerID = $(this).attr('partnerid');
    			var partnerName = $(this).attr('partnername');
    			$('#topArticle').append('<h2><a>Partner '+partnerName+' taking part in WPs:</a></h2>');
    			$(xmlReport).find('subreport').each(function(){
					var reportWP=$(this).attr("WP");
					var partnerWP=$(this).attr("partner");
						if(partnerID == partnerWP){
						$('#topArticle').append('<h4><a href="#" id="triggerWP" partnerID="'+partnerID+'" partnername="'+partnerName+'" wp="'+reportWP+'">'+reportWP+'</a></h4>');
						}
					});//workpackage
    	        $('#topArticleContainer').show();

    		   });
    		
    		$("#triggerWP").live("click",function() {
    			$('#midArticle').empty();
    			$('#secondArticleContainer').hide();
    			var partnerID = $(this).attr('partnerid');
    			var partnerName = $(this).attr('partnername');
    			var wp=$(this).attr('wp');
    			$('#midArticle').append('<h2><a>Reports by Partner '+partnerName+' for WP '+wp+'</a></h2>');
    			$(xmlReport).find('subreport').each(function(){
					var reportWP=$(this).attr("WP");
					var partnerWP=$(this).attr("partner");
					var reportDate=$(this).attr("date");
						if(partnerID == partnerWP && reportWP == wp){
						$('#midArticle').append('<h4><a href="#" id="triggerReport" partnerID="'+partnerID+'" partnername="'+partnerName+'" wp="'+reportWP+'" reportdate="'+reportDate+'">'+reportDate+'</a></h4>');
						}
					});
    		   });
     		
    		$("#triggerReport").live("click",function() {
    			$('#secondArticle').empty();
    			var partnerID = $(this).attr('partnerid');
    			var date = $(this).attr('reportdate');
    			var wp=$(this).attr('wp');
    			var partnerName = $(this).attr('partnername');
    			$(xmlReport).find('subreport').each(function(){
					var reportWP=$(this).attr("WP");
					var partnerWP=$(this).attr("partner");
					var reportDate=$(this).attr("date");
						if(partnerID == partnerWP && reportWP == wp && reportDate==date){
						var expenses= $(this).children('expenses').text();	
						var status= $(this).children('status').text();	
						var feedback= $(this).children('feedback').text();	
						var flag= $(this).children('flag').text();
						var explanation= $(this).children('explanation').text();
						$('#secondArticle').append('<h2><a>Report by Partner '+partnerName+' for WP '+wp+' on date '+date+'</a></h2>');
						$('#secondArticle').append('<h4><a>Expenses:'+expenses+'</a></h4>');
						$('#secondArticle').append('<h4><a>Status:'+status+'</a></h4>');
						$('#secondArticle').append('<h4><a>Feedback:'+feedback+'</a></h4>');
						$('#secondArticle').append('<h4><a>Flag:'+flag+'</a></h4>');
						$('#secondArticle').append('<h4><a>Explanation:'+explanation+'</a></h4>');


						}
					});
    	        $('#secondArticleContainer').show();

    		});
     		
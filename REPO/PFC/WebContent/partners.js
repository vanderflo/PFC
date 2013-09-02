$("#showpartners").live("click",function() {
 		$('#coordinatorWP').empty();
 		$('#coordinatorPartners').empty();
 		$('#projectArticle').hide();
 		$('#topArticleContainer').hide();
 		$('#partnerArticleContainer').show();
 		$('#partnersArticleForm').hide();
 		getPartners();
 		$('#partnersArticleList').empty();
 		$(xmlPartners).find('partner').each(function(){							
			var partnerID=$(this).attr("id");			
			var partnerName= $(this).attr("name");
			$('#partnersArticleList').append('<li>'+partnerID+' ('+partnerName+')'+'</li>');			
		});//partner 		
	});

$("#addpartner").live("click",function() {
		$('#partnerArticleContainer').show();
		$('#partnersArticleForm').show();
		$('#addNewPartnerForm').show();
		
		});



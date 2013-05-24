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
 		function initProject() {
			$.ajax({
				type: "GET",
				url: "http://localhost:8080/PFC/rest/API/project/Test1",
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
     		
     		    
				getReport();
     		    
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
						$('#coordinatorProjects').append('<li><a href="#" id="selectProject" class="selectProject" projectid="'+id+'" projecttile="'+title+'">'+ title + '</a><li>');

					});

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
 		
 		function getReport(){
 			$.ajax({
     		    type: "GET",
     		    url: "http://localhost:8080/PFC/rest/API/report/get/Test1",
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
 		
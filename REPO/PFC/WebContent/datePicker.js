$( "#dateStart, #dateFinish" ).datepicker({
           changeMonth: true,
           changeYear: true,
           showButtonPanel: true,
           dateFormat: 'mm/yy',
           onClose: function(dateText, inst) {
               var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
               var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
               $(this).datepicker('setDate', new Date(year, month, 1));
           },
           beforeShow : function(input, inst) {
               if ((datestr = $(this).val()).length > 0) {
                   year = datestr.substring(datestr.length-4, datestr.length);
                   month = jQuery.inArray(datestr.substring(0, datestr.length-5), $(this).datepicker('option', 'monthNames'));
                   $(this).datepicker('option', 'defaultDate', new Date(year, month, 1));
                   $(this).datepicker('setDate', new Date(year, month, 1));
               }
               var other = this.id == "dateStart" ? "#dateFinish" : "#dateStart";
               var option = this.id == "dateStart" ? "maxDate" : "minDate";
               if ((selectedDate = $(other).val()).length > 0) {
                   year = selectedDate.substring(selectedDate.length-4, selectedDate.length);
                   month = jQuery.inArray(selectedDate.substring(0, selectedDate.length-5), $(this).datepicker('option', 'monthNames'));
                   $(this).datepicker( "option", option, new Date(year, month, 1));
               }
           }
       });
       $("#btnShow").click(function(){
       if ($("#dateStart").val().length == 0 || $("#dateFinish").val().length == 0){
           alert('All fields are required');
       }
       else{
           alert('Selected Month Range :'+ $("#dateStart").val() + ' to ' + $("#dateFinish").val());
           }
       });
       
$(document).ready(function(){
		// initial value of the start year for the dynamic binding of the picker.
		var startRange = 2000;
		
		// given the previous sixteen years from the current start year.
		$(".btnPrev").click(function(){
			endRange = startRange;
			startRange = startRange - 16;
			$("#yearBetween").text('');
			// finding the current div
			var container = event.currentTarget.nextElementSibling.parentElement.nextElementSibling.nextElementSibling;
			// find the values between the years from the textbox in year picker.
			createButtons(container);
			//bind the click function for the dynamically created buttons.
			bindButtons();
			var rangeValues = startRange+ " - "+(endRange-1) ;
			$("#yearBetween").val(rangeValues);
		});
		
		// given the next sixteen years from the current end year.
		$(".btnNext").click(function(){
			startRange = endRange;
			endRange = endRange + 16;
			//clearing the cuurent values of the picker 
			$("#yearBetween").text('');
			// finding the current div
			var container = event.currentTarget.parentElement.nextElementSibling.nextElementSibling;
			createButtons(container);
			//bind the click function for the dynamically created buttons.
			bindButtons();
			// find the values between the years from the textbox in year picker.
			var rangeValues = startRange+ " - "+(endRange-1) ;
			// writes the value in textbox shows above the button div.
			$("#yearBetween").val(rangeValues);
		});
		
		$("#txtYear1,#yearImage").click(function(){
			debugger;
			$("#divYear1").toggle();
			endRange = startRange + 16;
			//clearing the cuurent values of the picker 
			$("#yearBetween").text('');
			var container = "#yearContainer";
			// Creating the button for the years in yearpicker.
			createButtons(container);
			//bind the click function for the dynamically created buttons.
			bindButtons();
			// find the values between the years from the textbox in year picker.
			var rangeValues = startRange+ " - "+(endRange-1) ;
			// writes the value in textbox shows above the button div.
			$("#yearBetween").val(rangeValues);	
		});
		
		// binding the button for the each dynamically created buttons.
		function bindButtons(){
			$(".button").bind('click', function(evt)
			{
				debugger;
				$(this).css("background","#ccc");
				$("#txtYear1").val($(this).val());
				$('#divYear1').hide();
			});
		}
		
		// created the button for the each dynamically created buttons.
		function createButtons(container){
			var count=0;
			$(container).empty();
			for(var i= startRange; i< endRange; i++)
			{
				var btn = "<input type='button' style='margin:3px;' class='button btn btn-default' value=" + i + "></input>";
				count = count + 1;
				$(container).append(btn);
				if(count==4)
				{
					$(container).append("<br/>");
					count = 0;
				}
			}
		}
		
		$("#yearBetween").focusout(function(){	
			var yearValue = $("#yearBetween").val().split("-");
			startRange = parseInt(yearValue[0].trim());
			if(startRange>999 && startRange < 9985){
				endRange = startRange + 16;
				$("#yearBetween").text('');
				var container = "#yearContainer";
				createButtons(container);
				bindButtons();
				var rangeValues = startRange+ " - "+(endRange-1) ;
				$("#yearBetween").val(rangeValues);
			}
			else
			{
				$("#yearBetween").focus();
			}
		});
		
		 $("#yearBetween, #txtYear1").keydown(function (e) {
			// Allow: backspace, delete, tab, escape, enter and .
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				 // Allow: Ctrl+A, Command+A
				(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
				 // Allow: home, end, left, right, down, up
				(e.keyCode >= 35 && e.keyCode <= 40)) {
					 // let it happen, don't do anything
					 return;
			}
			// Ensure that it is a number and stop the keypress
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				e.preventDefault();
			}
		});
	});
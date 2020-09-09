/*** AUTHOR: Fabien H. Dimitrov  ***************************************************************/
/*** CONTEXT: Rocket Elevators (Codeboxx) ******************************************************/
/*** DESCRIPTION: Validates the quote request form @ quote.html on the client-side, 
                  and then calculates estimated cost of client's elevator project **************/



// Prevents code from running before the HTML page is finished loading (ready)
$(document).ready(function(){
    

    var totalElevators = 0;   // Estimated number of elevator shafts
    var buildingType = ""; 


    /* Do this after client has clicked on the Confirm button ***/
    var confirmBtn = $("#building-confirm-btn");
    confirmBtn.click(function(){

        // Get building type
        var building = $("#building-type").val();
        buildingType = building;

        // Declare empty array: stores the input divs 
        var inputDivs = [];
        
        // Get six input divs and put them in the inputDivs array
        var q1 = $("#q1");
        var q2 = $("#q2");
        var q3 = $("#q3");
        var q4 = $("#q4");
        var q5 = $("#q5");
        var q6 = $("#q6");

        inputDivs.push(q1, q2, q3, q4, q5, q6);

        // Reset all input fields when button is pressed, just in case it is pressed more than once
        $("#question-1").val(0);
        $("#question-2").val(0);
        $("#question-3").val(0);
        $("#question-4").val(0);
        $("#question-5").val(0);
        $("#question-6").val(0);
        $("#num-shafts").val(0);

        // Get labels for the six input divs and put them in the divLabels array
        var q1Label = $("#q1-label");
        var q2Label = $("#q2-label");
        var q3Label = $("#q3-label");
        var q4Label = $("#q4-label");
        var q5Label = $("#q5-label");
        var q6Label = $("#q6-label");
        
        var numDivsToShow = 0; // Change label values based on building type

        if (building === "Residential")
        {
            numDivsToShow = 3;

            q1Label.text("The number of apartments in the building");
            q2Label.text("The number of floors contained in the building");
            q3Label.text("The number of basements contained in the building");
        }
         
        else if (building === "Commercial")
        {
            numDivsToShow = 5;
            q1Label.text("The number of distinct businesses");
            q2Label.text("The number of floors contained in the building");
            q3Label.text("The number of basements contained in the building");
            q4Label.text("The number of parking space available");
            q5Label.text("The number of elevators cages to be deployed");
        }

        else if (building === "Corporate")
        {
            numDivsToShow = 5;
            q1Label.text("The number of separate tenant companies");
            q2Label.text("The number of floors contained in the building");
            q3Label.text("The number of basements contained in the building");
            q4Label.text("The number of parking space available");
            q5Label.text("The maximum number of occupants per floor");
        }

        else {
            numDivsToShow = 6;
            q1Label.text("The number of distinct businesses");
            q2Label.text("The number of floors contained in the building");
            q3Label.text("The number of basements contained in the building");
            q4Label.text("The number of parking space available");
            q5Label.text("The maximum number of occupants per floor");
            q6Label.text("The number of hours of activity of the building per day");
        
        }

        // Show/hide input divs based on building type
        for (let i = 0; i < numDivsToShow; i++)
        {
            inputDivs[i].show();
        }
        for (let i = numDivsToShow; i < inputDivs.length; i++)
        {
            inputDivs[i].hide();
        }

    })

    window.setInterval (function () {
        if (buildingType === "Residential")
        {
            /* 
            If the type of building is Residential, divide the number of apartments 
            by the number of floors (excluding the number of basements) to obtain 
            an average of apartments per floor. There is 1 elevator for every 6 apartments per floor.
            If the apartment has more than 20 stories, it is necessary to provide an additional
            column of elevators and thus double the number of elevator shafts. 
            A new column is therefore added to each new group of 20 stories.
            */

            console.log("residential is here")
            var numApartments = $("#question-1").val();
            var numFloors = $("#question-2").val() - $("#question-3").val();
            var avgApartmentsPerFloor = Math.ceil(numApartments / numFloors);
            var numElevatorsPerFloor = Math.ceil(avgApartmentsPerFloor / 6);
            var numColumns = Math.ceil(numFloors / 20);

            totalElevators = numElevatorsPerFloor * numColumns; 
        }
        else if (buildingType === "Commercial")
        {
            console.log("commercial is here")
            /*
            If the type of building is Commercial, the number of elevator shafts 
            to be deployed is specified and the estimated number of cages is equal to 
            the number required.
            */
            totalElevators = $("#question-5").val();
        }
        else 
        {
            console.log("corporate/hybrid is here");
            /* 
            If the type of building is Corporate or Hybrid, multiply the number of occupants per floor 
            by the number of floors (including the number of basements) to obtain the total number 
            of occupants. The number of elevators required is determined by the number of occupants 
            divided by 1000. The number of stories (including the number of basements) is 
            divided by 20 to obtain the number of elevator columns required. 
            Then divide the number of elevators by the number of columns to get the 
            number of elevators per column. The total number of elevators is determined by 
            the number of elevators per column multiplied by the number of columns.
            */
            var numOccupantsPerFloor = $("#question-5").val(); // 240
            console.log("Num occupants per floor: " + numOccupantsPerFloor);
            var numFloors = $("#question-2").val(); // 95
            console.log("Num floors: " + numFloors);
            var totalOccupants = numOccupantsPerFloor * numFloors; // 240 x 95 = 22800
            console.log("Total occupants: " + totalOccupants);
            var numElevators = Math.ceil(totalOccupants / 1000); // 22800 / 1000 = 22.8 = 23
            console.log("Num elevators: " + numElevators);
            var numColumns = Math.ceil(numFloors / 20); // 95/20 = 4.75 = 5
            console.log("Num columns:" + numColumns);
            
            totalElevators = Math.ceil(numElevators / numColumns) * numColumns; // 23/5 * 5 = 5 * 5 = 25 
            console.log("Total elevators" + totalElevators);
        }
        console.log(totalElevators);
        
        
        if (!isNaN(totalElevators))
            $("#num-shafts").val(totalElevators);
        
        
        $("input").keyup(function() {
            if ($("input").val() < 0)
            {
                $("input").val(0);
            }
        })
    }, 1000);
    

    

    /*
    $('form[id="quote-form"]').validate({
        rules: {
          fname: 'required',
          lname: 'required',
          user_email: {
            required: true,
            email: true,
          },
          psword: {
            required: true,
            minlength: 8,
          }
        },
        messages: {
          fname: 'This field is required',
          lname: 'This field is required',
          user_email: 'Enter a valid email',
          psword: {
            minlength: 'Password must be at least 8 characters long'
          }
        },
        submitHandler: function(form) {
          form.submit();
        }
      });
    */


  });
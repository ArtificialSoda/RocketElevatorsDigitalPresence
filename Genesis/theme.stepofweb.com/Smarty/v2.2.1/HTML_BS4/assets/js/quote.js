/*** AUTHOR: Fabien H. Dimitrov  ***************************************************************/
/*** CONTEXT: Rocket Elevators (Codeboxx) ******************************************************/
/*** DESCRIPTION: Validates the quote request form @ quote.html on the client-side, 
                  and then calculates estimated cost of client's elevator project **************/



// Prevents code from running before the HTML page is finished loading (ready)
$(document).ready(function(){
    

    /* 1. SHOW THE QUESTIONS BASED ON BUILDING TYPE ***/
    /* Do this after client has clicked on the Confirm button ***/

    var calculateCostBtn = $("#calculate-cost-btn");
    
    var confirmBtn = $("#building-confirm-btn");
    confirmBtn.click(function(){

        // Get building type
        var buildingType = $("#building-type").val();

        // Show "Calculate cost" button
        calculateCostBtn.show();

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

        // Get labels for the six input divs and put them in the divLabels array
        var q1Label = $("#q1-label");
        var q2Label = $("#q2-label");
        var q3Label = $("#q3-label");
        var q4Label = $("#q4-label");
        var q5Label = $("#q5-label");
        var q6Label = $("#q6-label");

        // Change label values based on building type
        var numDivsToShow = 0; 

        if (buildingType === "Residential")
        {
            numDivsToShow = 3;

            q1Label.text("The number of apartments in the building");
            q2Label.text("The number of floors contained in the building");
            q3Label.text("The number of basements contained in the building");

        }
         
        else if (buildingType === "Commercial")
        {
            numDivsToShow = 5;
            q1Label.text("The number of distinct businesses");
            q2Label.text("The number of floors containend in the building");
            q3Label.text("The number of basements contained in the building");
            q4Label.text("The number of parking space available");
            q5Label.text("The number of elevators cages to be deployed");
        }

        else if (buildingType === "Corporate")
        {
            numDivsToShow = 5;
            q1Label.text("The number of separate tenant companies");
            q2Label.text("The number of floors contained in the building");
            q3Label.text("The number of basements contained in the building");
            q4Label.text("The number of parking space available");
            q5Label.text("The maximum number of occupants per floor");
        }

        else if (buildingType === "Hybrid") {
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
/*** AUTHOR: Fabien H. Dimitrov  ***************************************************************/
/*** CONTEXT: Rocket Elevators (Codeboxx) ******************************************************/
/*** DESCRIPTION: Validates the quote request form @ 'quote.html' on the client-side, 
                  and then calculates estimated cost of client's elevator project **************/



// Prevents code from running before the HTML page is finished loading (ready)
$(document).ready(function(){
    

    var buildingType = "";      // Building type
      
    var totalElevators = 0;     // Estimated number of elevator shafts
    var elevatorsCost = 0;      // Elevators cost, based on product line (Stnd, Premium, Excelium) without install fee
    var installationCost = 0;   // Installation cost, based on product line
    var totalCost = 0;          // Total estimate cost

    /* Do this after client has clicked on the Confirm button ***/
    var confirmBtn = $("#building-confirm-btn");
    confirmBtn.click(function(){

        // Show results section
        var resultsDiv = $("#results");
        resultsDiv.show();

        // Get building type
        var building = $("#building-type").val();
        buildingType = building;

        var inputDivs = []; // Stores the input divs 
        var inputs = []; // Stores the inputs
        
        // Get six input divs and put them in the inputDivs array
        var q1 = $("#q1");
        var q2 = $("#q2");
        var q3 = $("#q3");
        var q4 = $("#q4");
        var q5 = $("#q5");
        var q6 = $("#q6");

        inputDivs.push(q1, q2, q3, q4, q5, q6);

        // Get six inputs from the 6 input fields and put them in the inputs array
        var input1 = $("#question-1");
        var input2 = $("#question-2");
        var input3 = $("#question-3");
        var input4 = $("#question-4");
        var input5 = $("#question-5");
        var input6 = $("#question-6");

        inputs.push(input1, input2, input3, input4, input5, input6);

        // Reset all input fields when button is pressed, just in case it is pressed more than once
        for (var i = 0; i < inputs.length; i++)
        {
            inputs[i].val(NaN);
        }

        // Get labels for the six input divs and put them in the divLabels array
        var q1Label = $("#q1-label");
        var q2Label = $("#q2-label");
        var q3Label = $("#q3-label");
        var q4Label = $("#q4-label");
        var q5Label = $("#q5-label");
        var q6Label = $("#q6-label");
        
        var numDivsToShow = 0; // Change label values based on building type

        switch(building)
        {
            case "Residential":
                numDivsToShow = 3;
                q1Label.text("The number of apartments in the building");
                q2Label.text("The number of floors contained in the building");
                q3Label.text("The number of basements contained in the building");
                break;
            
            case "Commercial":
                numDivsToShow = 5;
                q1Label.text("The number of distinct businesses");
                q2Label.text("The number of floors contained in the building");
                q3Label.text("The number of basements contained in the building");
                q4Label.text("The number of parking space available");
                q5Label.text("The number of elevators cages to be deployed");
                break;

            case "Corporate":
                numDivsToShow = 5;
                q1Label.text("The number of separate tenant companies");
                q2Label.text("The number of floors contained in the building");
                q3Label.text("The number of basements contained in the building");
                q4Label.text("The number of parking space available");
                q5Label.text("The maximum number of occupants per floor");
                break;

            case "Hybrid":
                numDivsToShow = 6;
                q1Label.text("The number of distinct businesses");
                q2Label.text("The number of floors contained in the building");
                q3Label.text("The number of basements contained in the building");
                q4Label.text("The number of parking space available");
                q5Label.text("The maximum number of occupants per floor");
                q6Label.text("The number of hours of activity of the building per day");
                break;
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

        // Resets results if 'Confirm' button is pressed again
        $("#num-shafts").val(0);
        $("#total-estimate").val(0);

    })

    // Execute when an input field is changed 
    $("input").on("change keyup", () => {

        var unitBasePrice = 0;
        var installFee = 0;

        // Get product line choice and assign elevator prices based on it
        var productLine = $("input[name='product-line']:checked").val();
        switch(productLine) 
        {
            case "standard":
                unitBasePrice = 7565;
                installFee = 0.1;
                break;

            case "premium":
                unitBasePrice = 12345;
                installFee = 0.13;
                break;
            
            case "excelium":
                unitBasePrice = 15400;
                installFee = 0.16;
                break;
        }
        
        if (buildingType === "Residential")
        {
            // Make HTTP POST request to server with client input
            $.post("/residential",
                {   
                    numApartments: parseInt($("#question-1").val()),
                    numFloors: parseInt($("#question-2").val()),
                    numBasements: parseInt($("#question-3").val()),
                    unitBasePrice: unitBasePrice,
                    installFee: installFee
                },
                
                // Update quote readonly fields if POST request succeeds
                function(data)
                {
                    $("#num-shafts").val(data.totalElevators);
                    $("#elevator-price").val("$" + data.elevatorPrice.toFixed(2));
                    $("#installation-price").val("$" + data.installationPrice.toFixed(2));
                    $("#total-estimate").val("$" + data.totalEstimate.toFixed(2));
                } 
            );
        }
        else if (buildingType === "Commercial")
        {
            // Make HTTP POST request to server with client input
            $.post("/commercial",
            {   
                numCages: parseInt($("#question-5").val()),
                unitBasePrice: unitBasePrice,
                installFee: installFee
            },
            
            // Update quote readonly fields if POST request succeeds
            function(data)
            {
                $("#num-shafts").val(data.totalElevators);
                $("#elevator-price").val("$" + data.elevatorPrice.toFixed(2));
                $("#installation-price").val("$" + data.installationPrice.toFixed(2));
                $("#total-estimate").val("$" + data.totalEstimate.toFixed(2));
            } 
        );
        }
        else 
        {
            // Make HTTP POST request to server with client input
            $.post("/corporate-hybrid",
                {   
                    numOccupantsPerFloor: parseInt($("#question-5").val()),
                    numFloors: parseInt($("#question-2").val()),
                    unitBasePrice: unitBasePrice,
                    installFee: installFee
                },
                
                // Update quote readonly fields if POST request succeeds
                function(data)
                {
                    $("#num-shafts").val(data.totalElevators);
                    $("#elevator-price").val("$" + data.elevatorPrice.toFixed(2));
                    $("#installation-price").val("$" + data.installationPrice.toFixed(2));
                    $("#total-estimate").val("$" + data.totalEstimate.toFixed(2));
                } 
            );
        }
    });
  });
window.onload = function(){//wait for the page to load 
    console.log("page loaded");//if page has loaded print page loaded 
    
    //get the payment form using its id name and store it in the variable 'form'
    const form= document.getElementById("payment-form");

    //listen for event- 'when submit button is clided'
    form.addEventListener("submit", function(event){
        event.preventDefault();//prevents page from refreshing
        console.log("form submitted");//debug message

        //get the user input for card-number
        const cardNumber= document.getElementById("card-number").value;//find the card number by id store in the variable
        //name  'cardNumber' and get what the user typed
        console.log(cardNumber);//display user input on console

         // Check if card-number is empty
         if (cardNumber === ""){
            console.log("card number is empty")// print this debug message if empty
         }
          
        
        //get user input for security code
        const securityCode = document.getElementById("security-code").value;
        console.log(securityCode);//display security code on console


        //get user input for the month and year
        const month= document.getElementById("expiration-month").value;
        const year= document.getElementById("expiration-year").value;

        //display inputs on console
        console.log(month);
        console.log(year);
    });


   

    };





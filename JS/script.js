window.onload = function(){//wait for the page to load 
    console.log("page loaded");//if page has loaded print page loaded 
    
    //get the payment form using its id name and store it in the variable 'form'
    const form= document.getElementById("payment-form");


    //using DOM Level 2 - addEventListener
    if(form){// if windows is on form then 
    //listen for event- 'when submit button is clided'
    form.addEventListener("submit", function(event){
        event.preventDefault();//prevents page from refreshing
        console.log("form submitted");//debug message

        //get the user input for card-number
        const cardNumber= document.getElementById("card-number").value;//find the card number by id store in the variable
        //name  'cardNumber' and get what the user typed
        console.log(cardNumber);//display user input on console
          
        //get user input for security code
        const securityCode = document.getElementById("security-code").value;
        console.log(securityCode);//display security code on console


        //get user input for the month and year
        const month= document.getElementById("expiration-month").value;
        const year= document.getElementById("expiration-year").value;

        //display inputs on console
        console.log(month);
        console.log(year);

    

 


//-------------------VALIDATION CHECK -----------------------------

       
        //------card nunmber validation check ------//

        // Check 1- if card-number is empty
        if (cardNumber === ""){
            alert("fill in card number");// send an alert message
            return;// stops the submit function from running 
         }

        // check 2- if card number has only digit
        if(isNaN(cardNumber)){
            alert("only digits required");
            return;// stops the submit function from running 

        }
           
        // Check 3- for if card number is exactly 16 digit
        if(cardNumber.length !==16){//if the card number is does not = 16
            alert("card number must be exactly 16 digits"); //then send an alert message 
            return;// stops the submit function from running 
        }

        //check 5- set condition for card number to begin with either of (51-55)
        if(//if card number does not start with these numbers 
            !cardNumber.startsWith("51")&&
            !cardNumber.startsWith("52")&&
            !cardNumber.startsWith("53")&&
            !cardNumber.startsWith("54")&&
            !cardNumber.startsWith("55")
        ){
            alert(" card number must begin with numbers from 51-55");//then display an alert message 
            return;// stops the submit function from running 
        }








    //----------------Expiration Date Validation ------------------//
         //check 1- if month and year is selected
    if(month ==="" || year==="" ){// if no month or year is selected 
        alert("fill both month and year");// trigger an alert message 
        return;//stop submit function from running
    }
    //-------------------Get Todays Real date------------------//
    const currentDate = new Date();//creates a Date object and store it in the variable "CurrentDate"
    const currentMonth = currentDate.getMonth()+1;//get the current month add one too give the normal current month 
    const currentYear = currentDate.getFullYear();//get the current year

    //Expiry Date validation
    if(year < currentYear || ( year == currentYear && month<currentMonth)){// if the year is less than current year or year = current year and month is < current month 
        alert("The Card is Expired");// display the alert message 
        return;//and stop submit function 
    }
        

       



     //-------------CVC Validation Check ------------------//

        // Check 1- if security code is empty
        if(securityCode === ""){// if there is no input for security code 
            alert("fill in security code");//them trigger this alert message 
            return;//stop submit function 
        }

        //check 2 - if securityCode contains only digit
        if(isNaN(securityCode)){//if the security code is not a number 
            alert("only digits required");//then trigger this alert message 
            return;//stop submit function from running 
        }

        
        //check 3-  if securityCode is 3 or 4 digit 
        if (securityCode.length <3 || securityCode.length > 4){ // if securityCode is less than 3 or greater than 4 
            alert("security code must be either 3 or 4 digit");// then display this alert message 
            return;// stops the submit function from running 
        }



        

        
//--------------------Get last 4 Digit - Only Run If Everything Passed  --------------------//
        const lastFourDigits = cardNumber.slice(-4);//get the last four digit from the cardNumber and store in the variable "lastFourDigit"
        console.log (lastFourDigits);//print out the digit that has been store in the variable in the console

        sessionStorage.setItem("lastFourDigits",lastFourDigits);//create a tenporary Storage and store the number in the label 
        console.log("saved:", lastFourDigits);//print message in console



//--------------------SEND POST REQUEST TO API ENDPOINT--------------------//
        //send a POST request to the API end point using Fetch and pass card details in JASON format
        fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", { 
            method:"POST",//use POST method to send data 
            headers:{
                "Content-Type":"application/json"//set data type in Json format
            },

            //convert javaScript Object into Json string before sending to the sever 
            body:JSON.stringify(
                {
                    //store the javascript variables to the API required field 
                    master_card: Number(cardNumber),
                    exp_year: Number(year),
                    exp_month: Number(month),
                    cvv_code: securityCode
                }
            )

        
    })


    //after fetch request complete store the result in the variable "response "
    .then(function(response){
        return response.json();//convert the response from server into JSON 
      
   }
      
   )

   //open the real data returned from the server 
       .then(function(data){
           console.log(data);//display the server response data on console 
           const lastFourDigits = cardNumber.slice(-4); // get the last 4 digits
           sessionStorage.setItem("lastFourDigits", lastFourDigits); // save them for success page
             window.location.href = "success.html";//Redirect users to the success page if all validation is sucessfull

         } )


         //----------------ERROR HANDLING----------------//
                .catch(function(error){
                    console.error(error);
                    alert("Payment Failed. Please Try Again");//alert message 
                })

});//end of .addeventlistener 
}//End Of if (form )


 //------------Successs Page Logic ----------------//
            //find the element by id called display-card-number and store it in the variable "displayCardNumber"
            const displayCardNumber = document.getElementById("display-card-number");

            if(displayCardNumber){//if display-card-number exist then - run next code when on success page where display-card-number exist 
           const savedLastFourDigits = sessionStorage.getItem("lastFourDigits");//get the saved digit and store in a new variable - "savedLastFourDigits"
           displayCardNumber.textContent= "**** **** **** " + savedLastFourDigits; // Display masked card number then add/ plus the last for digits 
                }



    };





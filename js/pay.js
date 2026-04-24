window.onload = function () {
  //wait for the page to load
  console.log("page loaded"); //if page has loaded print page loaded

  //get the payment form using its id name and store it in the variable 'form'
  const form = document.getElementById("payment-form");

  //----------using DOM Level 2 - addEventListener--------//
  if (form) {
    // if windows is on form then
    //listen for event- 'when submit button is clided'
    form.addEventListener("submit", function (event) {
      event.preventDefault(); //prevents page from refreshing
      console.log("form submitted"); //debug message

      //get the user input for card-number
      const cardNumber = document.getElementById("card-number").value.trim(); //find the card number by id store in the variable
      //name  'cardNumber' and get what the user typed
      console.log(cardNumber);

      //get user input for security code
      const securityCode = document
        .getElementById("security-code")
        .value.trim();
      console.log(securityCode);

      //get user input for the month and year
      const month = document.getElementById("expiration-month").value;
      const year = document.getElementById("expiration-year").value;

      //display inputs on console
      console.log(month);
      console.log(year);

      //-------------------VALIDATION CHECK -----------------------------

      //------CARD NUMBER VALIDATION  ------//

      //CHECK 1---- For if card number is empty
      if (cardNumber === "") {
        //if the card number is empty
        alert("input your card number"); //display this message if card number is empty
        return; //stop form submission
      }

      //CHECK 2----- // Validate that the card number contains only digits
      const onlyDigits = /^[0-9]+$/;
      if (!onlyDigits.test(cardNumber)) {
        //if test returns fales (not only digit)
        alert("Card Number must contain only digits"); //then display this alert message
        return; //stop form submission
      }

      //CHECK 3------ is the card number up to 16 digits
      if (cardNumber.length !== 16) {
        //if the length of the card number does not equal 16
        alert("Card Number must be 16 digits"); //then display this alert message
        return; //stop form from submitting
      }

      const cardNumberStart = /^5[1-5]/; //first digit must start with 5 and the second digit must be between 1-5- store in the variable "cardNumberStart"
      if (!cardNumberStart.test(cardNumber)) {
        //if the card number does not follow the pattern
        alert("Card Number must follow this pattern 51-55"); //then display this alert message
        return; //stop form submission
      }

      //----------------Expiration Date Validation ------------------//
      //check 1- if month and year is selected
      if (month === "" || year === "") {
        // if no month or year is selected
        alert("fill both month and year"); // trigger an alert message
        return; //stop submit function from running
      }
      //-------------------Get Todays Real date------------------//
      const currentDate = new Date(); //creates a Date object and store it in the variable "CurrentDate"
      const currentMonth = currentDate.getMonth() + 1; //get the current month add one too give the normal current month
      const currentYear = currentDate.getFullYear(); //get the current year

      //Expiry Date validation
      if (year < currentYear || (year == currentYear && month < currentMonth)) {
        // if the year is less than current year or year = current year and month is < current month
        alert("The Card is Expired"); // display the alert message
        return; //and stop submit function
      }

      //-------------CVC CARD VALIDATION  ------------------//

      //CHECK 1---- if the security code text area is empty
      if (securityCode === "") {
        //if there is no input(space is empty)
        alert("input security code"); //then display this alert message
        return;
      }

      const securityCodeDigitOnly = /^[0-9]{3,4}$/;
      if (!securityCodeDigitOnly.test(securityCode)) {
        //after checking input if test return false (does not follow regex pattern)
        alert("security code must be digit only with 3 or 4 digits"); //then display this alert message to the users
        return; // stop form from submitting
      }

      //--------------------SEND POST REQUEST TO API ENDPOINT--------------------//
      //send a POST request to the API end point using Fetch and pass card details in JSON format
      fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", {
        method: "POST", //use POST method to send data
        headers: {
          "Content-Type": "application/json", //set data type in Json format
        },

        //convert javaScript Object into Json string before sending to the server
        body: JSON.stringify({
          //store the javascript variables to the API required field
          master_card: Number(cardNumber),
          exp_year: Number(year),
          exp_month: Number(month),
          cvv_code: securityCode,
        }),
      })
        //after fetch request complete store the result in the variable "response "
        .then(function (response) {
          //get response from server

          if (response.status === 200) {
            //if the response is  ok
            return response.json(); //provide the server response in json
          } else {
            throw "Payment failed. Bad data was sent to the server."; //else show this error message
          }
        })

        //open the real data returned from the server
        .then(function (data) {
          //convert the server response into data
          console.log(data); //display the server response data on console

          //check if payment was successful
          if (data.message) {
            const lastFourDigits = cardNumber.slice(-4); // get the last 4 digits
            sessionStorage.setItem("lastFourDigits", lastFourDigits); // save them for success page
            window.location.href = "success.html"; //Redirect users to the success page if all validation is successful
          }
        })

        //----------------ERROR HANDLING----------------//
        .catch(function (error) {
          console.error(error);
          alert("Payment Failed. Please Try Again"); //alert message
        });
    }); //end of .addeventlistener
  } //End Of if (form )
};

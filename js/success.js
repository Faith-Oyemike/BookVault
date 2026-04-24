window.onload=function (){
 //-----------------Successs Page Logic ----------------//
    //find the element by id called display-card-number and store it in the variable "displayCardNumber"
    const displayCardNumber = document.getElementById("display-card-number");

     if(displayCardNumber){//if display-card-number exist then - run next code when on success page where display-card-number exist 
           const savedLastFourDigits = sessionStorage.getItem("lastFourDigits");//get the saved digit and store in a new variable - "savedLastFourDigits"
           displayCardNumber.textContent= "**** **** **** " + savedLastFourDigits; // Display masked card number then add/ plus the last for digits 
                }
};
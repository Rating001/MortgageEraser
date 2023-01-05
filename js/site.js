function getInput() {
    //Set the display table to not render (CSS Class hide-me).
    document.getElementById('displayTable').classList.add("hide-me");

    //Create the mortgage object.
    let mortgage = {};

    //Initialize the data values with inputs from the web page.
    mortgage.originalLoan = document.getElementById('originalLoan').value;
    mortgage.originalLoan = Math.round(mortgage.originalLoan * 100) / 100;
    mortgage.loanTerm = document.getElementById('loanTerm').value;
    mortgage.interestRate = document.getElementById('loanInterest').value;
    mortgage.extraPayments = Math.round(document.getElementById('extraPayment').value * 100) / 100;

    mortgage.payInterest = document.getElementById('interestOption').checked;
    
    //Insert the checks for specific values here.


    //Call the correct mortgage calculator ()
    mortgage = calculateBasicLoan(mortgage);
    mortgage = calculateWithExtraPayments(mortgage);
    print(mortgage);
}

function calculateBasicLoan(mortgage) {
    mortgage.basicInterestPayments = [];
    mortgage.basicPrincipalPayments = [];
    mortgage.basicBalance = [];
    mortgage.basicInterestSum = 0;
    mortgage.basicTotalInterest = [];
    mortgage.basicTotalCost = [];
    mortgage.basicAllPayments = [];
    mortgage.basicCurrentBalance = mortgage.originalLoan;
    mortgage.basicMonth = [1];
    let basicCount = 0;

    //Calculate the monthly payment first.
    mortgage.basicMonthlyPayment = mortgage.originalLoan * (((mortgage.interestRate / 1200) * ((1 + (mortgage.interestRate / 1200)) ** mortgage.loanTerm)) / (((1 + (mortgage.interestRate / 1200)) ** mortgage.loanTerm) - 1));

    //Run a While loop until the mortgage balance is zero.
    while (mortgage.basicCurrentBalance > 0) {

        //Log the month counter.
        mortgage.basicMonth.push(mortgage.basicMonth[basicCount] + 1);
        //Calculate the Interest Payment and log it into the array.
        mortgage.basicInterestPayments.push(mortgage.basicCurrentBalance * (mortgage.interestRate / 1200));
        //Log the Monthly Payment into the current month counter in the array.
        mortgage.basicAllPayments.push(mortgage.basicMonthlyPayment);
        //Calculate the month's Principal Payment and log it into the array.
        mortgage.basicPrincipalPayments.push(mortgage.basicMonthlyPayment - mortgage.basicInterestPayments[basicCount]);
        //Subtract the Principal Payment from the Loan Balance and log it to the array.
        mortgage.basicBalance.push(mortgage.basicCurrentBalance - (mortgage.basicPrincipalPayments[basicCount]));
        //Subtract the Principal Payment from the Loan Balance.
        mortgage.basicCurrentBalance = mortgage.basicCurrentBalance - (mortgage.basicPrincipalPayments[basicCount]);
        //Add 1 to the monthly counter.
        basicCount++;
    }


    //Create an array of the summed interest payments and total interest paid.
    for (i = 0 ; i <= mortgage.basicInterestPayments.length - 1 ; i++) {
        mortgage.basicTotalInterest.push(mortgage.basicInterestSum + mortgage.basicInterestPayments[i]);
        mortgage.basicInterestSum = mortgage.basicTotalInterest[i];
    }

    //Sum the loan amount and total interest paid.
    mortgage.basicTotalCost = mortgage.originalLoan + mortgage.basicInterestSum;

    return mortgage;
    
}

function calculateWithExtraPayments(mortgage) {
    mortgage.interestPayments = [];
    mortgage.principalPayments = [];
    mortgage.balance = [];
    mortgage.interestSum = 0;
    mortgage.totalInterest = [];
    mortgage.totalCost = [];
    mortgage.allPayments = [];
    mortgage.currentBalance = mortgage.originalLoan;
    mortgage.month = [1];
    mortgage.savings = 0;
    mortgage.paymentsAvoided = 0;
    let count = 0;

    //Calculate the monthly payment first.
    mortgage.monthlyPayment = mortgage.originalLoan * (((mortgage.interestRate / 1200) * ((1 + (mortgage.interestRate / 1200)) ** mortgage.loanTerm)) / (((1 + (mortgage.interestRate / 1200)) ** mortgage.loanTerm) - 1));

    //Run a While loop until the mortgage balance is zero.
    while (mortgage.currentBalance > 0) {


        //Log the month counter.
        mortgage.month.push(mortgage.month[count] + 1);

        if (mortgage.currentBalance < (mortgage.monthlyPayment + mortgage.extraPayments)){
            //Calculate the Interest Payment and log it into the array.
            mortgage.interestPayments.push(mortgage.currentBalance * (mortgage.interestRate / 1200));
            //Log the Monthly Payment into the current month counter in the array.
            mortgage.allPayments.push(mortgage.currentBalance + mortgage.interestPayments[count]);
            //Calculate the month's Principal Payment and log it into the array.
            mortgage.principalPayments.push(mortgage.currentBalance);
            //Subtract the Principal Payment from the Loan Balance and log it to the array.
            mortgage.balance.push(mortgage.currentBalance - mortgage.principalPayments[count]);
            //Subtract the Principal Payment from the Loan Balance.
            mortgage.currentBalance = mortgage.currentBalance - (mortgage.principalPayments[count]);
        } else {
        //Calculate the Interest Payment and log it into the array.
        mortgage.interestPayments.push(mortgage.currentBalance * (mortgage.interestRate / 1200));

        if (mortgage.payInterest === true) {
            //Log the Monthly Payment into the current month counter in the array.
            mortgage.allPayments.push(mortgage.monthlyPayment + mortgage.extraPayments + mortgage.interestPayments[count]);
            //Calculate the month's Principal Payment and log it into the array.
            mortgage.principalPayments.push((mortgage.monthlyPayment + mortgage.extraPayments + mortgage.interestPayments[count]) - mortgage.interestPayments[count]);

        } else {
            //Log the Monthly Payment into the current month counter in the array.
            mortgage.allPayments.push(mortgage.monthlyPayment + mortgage.extraPayments);
            //Calculate the month's Principal Payment and log it into the array.
            mortgage.principalPayments.push((mortgage.monthlyPayment + mortgage.extraPayments) - mortgage.interestPayments[count]);

        }
        //Subtract the Principal Payment from the Loan Balance and log it to the array.
        mortgage.balance.push(mortgage.currentBalance - (mortgage.principalPayments[count]));
        //Subtract the Principal Payment from the Loan Balance.
        mortgage.currentBalance = mortgage.currentBalance - (mortgage.principalPayments[count]);
        //Add 1 to the monthly counter.
        count = count + 1;
        }
    }


    //Create an array of the summed interest payments and total interest paid.
    for (i = 0 ; i <= mortgage.interestPayments.length - 1 ; i++) {
        mortgage.totalInterest.push(mortgage.interestSum + mortgage.interestPayments[i]);
        mortgage.interestSum = mortgage.totalInterest[i];
    }

    //Sum the loan amount and total interest paid.
    mortgage.totalCost = mortgage.originalLoan + mortgage.interestSum;

    //Calculate the savings between normal loan and loan with extra payments/interest paid
    mortgage.savings = mortgage.basicTotalCost - mortgage.totalCost;

    //Calculate how many payments were avoided
    mortgage.paymentsAvoided = mortgage.basicAllPayments.length - mortgage.allPayments.length;

    return mortgage;
    

    return mortgage;
}

function print(mortgage) {

    //Set the HTML text fields to variables.
    let monthlyPaymentHTML = document.getElementById('monthlyPayment');
    let totalPrincipalHTML = document.getElementById('totalPrincipal');
    let totalInterestHTML = document.getElementById('totalInterest');
    let totalCostHTML = document.getElementById('totalCost');
    let savingsHTML = document.getElementById('totalSavings');
    let paymentsAvoidedHTML = document.getElementById('paymentsAvoided');

    //Clear the HTML text fields.
    monthlyPaymentHTML.innerHTML = [];
    totalPrincipalHTML.innerHTML = [];
    totalInterestHTML.innerHTML = [];
    totalCostHTML.innerHTML = [];
    savingsHTML.innerHTML = [];
    paymentsAvoidedHTML.innerHTML = [];
    
    //Print the amounts to the web page.
    monthlyPaymentHTML.innerHTML = "$" + mortgage.monthlyPayment.toFixed(2);
    totalPrincipalHTML.innerHTML = "$" + mortgage.originalLoan.toFixed(2);
    totalInterestHTML.innerHTML = "$" + mortgage.interestSum.toFixed(2);
    totalCostHTML.innerHTML = "$" + mortgage.totalCost.toFixed(2);
    savingsHTML.innerHTML = "$" + mortgage.savings.toFixed(2);
    paymentsAvoidedHTML.innerHTML = mortgage.paymentsAvoided;

    //Sets the HTML element to a variable, sets a pre-created template to the TemplateRow variable, clears the inner HTML, and un-hides the table.
    let tableBody = document.getElementById('breakdown-table');
    let templateRow = document.getElementById('mcTemplate');
    tableBody.innerHTML = "";
    document.getElementById('displayTable').classList.remove('hide-me');

    //Loop the calculaator results into the table in the previously pulled template format.
    for (let i = 0 ; i <= (mortgage.allPayments.length) ; i++) {
        let tableRow = document.importNode(templateRow.content, true);
        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].textContent = mortgage.month[i];
        rowCols[1].textContent = "$" + mortgage.allPayments[i].toFixed(2);
        rowCols[2].textContent = "$" + mortgage.principalPayments[i].toFixed(2);
        rowCols[3].textContent = "$" + mortgage.interestPayments[i].toFixed(2);
        rowCols[4].textContent = "$" + mortgage.totalInterest[i].toFixed(2);
        if (mortgage.balance[i] >= 0) {
            rowCols[5].textContent = "$" + mortgage.balance[i].toFixed(2);
        }   else {
            mortgage.balance[i] = (mortgage.balance[i] * -1);
            rowCols[5].textContent = "$" + mortgage.balance[i].toFixed(2);
        }
        

        tableBody.appendChild(tableRow);
    }


}
function getInput() {
    document.getElementById('displayTable').classList.add("hide-me");

    let mortgage = {};

    mortgage.loanAmount = document.getElementById('loanAmount').value;
    mortgage.loanAmount = Math.round(mortgage.loanAmount * 100) / 100;
    mortgage.loanTerm = document.getElementById('loanTerm').value;
    mortgage.loanInterest = document.getElementById('loanInterest').value;

    //Insert the checks for specific values here.



    mortgage = calculate(mortgage);
    mortgage = interestPrincipalPayment(mortgage);
    print(mortgage);
}

function calculate(mortgage) {
    mortgage.monthlyPayment = (mortgage.loanAmount * (mortgage.loanInterest/1200)) / (1 - ((1 + mortgage.loanInterest/1200) ** ((-1) * mortgage.loanTerm)));

    return mortgage;
}

function interestPrincipalPayment(mortgage) {
    mortgage.interestPayments = [];
    mortgage.principalPayments = [];
    mortgage.balance = [];
    mortgage.interestSum = 0;
    mortgage.totalInterest = [];
    mortgage.totalCost = [];
    mortgage.allPayments = [];
    mortgage.currentBalance = mortgage.loanAmount;
    mortgage.month = [1];
    let count = 0;

    while (mortgage.currentBalance > 0) {
        
        if (mortgage.currentBalance >= mortgage.monthlyPayment) {
            mortgage.month.push(mortgage.month[count] + 1);
            mortgage.interestPayments.push(mortgage.currentBalance * (mortgage.loanInterest / 1200));
            mortgage.allPayments.push(mortgage.monthlyPayment);
            mortgage.principalPayments.push(mortgage.monthlyPayment - mortgage.interestPayments[count]);
            mortgage.balance.push(mortgage.currentBalance - (mortgage.interestPayments[count] + mortgage.principalPayments[count]));
            mortgage.currentBalance = mortgage.currentBalance - (mortgage.interestPayments[count] + mortgage.principalPayments[count]);
        } else {
            mortgage.month.push(mortgage.month[count] + 1);
            mortgage.interestPayments.push(mortgage.currentBalance * (mortgage.loanInterest / 1200));
            mortgage.allPayments.push(mortgage.currentBalance + mortgage.interestPayments[count]);
            mortgage.principalPayments.push(mortgage.currentBalance);
            mortgage.balance.push(mortgage.currentBalance - (mortgage.interestPayments[count] + mortgage.principalPayments[count]));
            mortgage.currentBalance = mortgage.currentBalance - (mortgage.interestPayments[count] + mortgage.principalPayments[count]);
        }

        count = count + 1;
    }



    for (i = 0 ; i <= mortgage.interestPayments.length - 1 ; i++) {
        mortgage.totalInterest.push(mortgage.interestSum + mortgage.interestPayments[i]);
        mortgage.interestSum = mortgage.totalInterest[i];
    }

    mortgage.totalCost = mortgage.loanAmount + mortgage.interestSum;

    return mortgage;
}
function print(mortgage) {

    let monthlyPaymentHTML = document.getElementById('monthlyPayment');
    let totalPrincipalHTML = document.getElementById('totalPrincipal');
    let totalInterestHTML = document.getElementById('totalInterest');
    let totalCostHTML = document.getElementById('totalCost');

    monthlyPaymentHTML.innerHTML = [];
    totalPrincipalHTML.innerHTML = [];
    totalInterestHTML.innerHTML = [];
    totalCostHTML.innerHTML = [];
    
    monthlyPaymentHTML.innerHTML = "$" + mortgage.monthlyPayment.toFixed(2);
    totalPrincipalHTML.innerHTML = "$" + mortgage.loanAmount.toFixed(2);
    totalInterestHTML.innerHTML = "$" + mortgage.interestSum.toFixed(2);
    totalCostHTML.innerHTML = "$" + mortgage.totalCost.toFixed(2);

    let tableBody = document.getElementById('breakdown-table');
    let templateRow = document.getElementById('mcTemplate');
    tableBody.innerHTML = "";
    document.getElementById('displayTable').classList.remove('hide-me');

    for (let i = 0 ; i <= (mortgage.allPayments.length) ; i++) {
        let tableRow = document.importNode(templateRow.content, true);
        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].textContent = mortgage.month[i];
        rowCols[1].textContent = "$" + mortgage.allPayments[i].toFixed(2);
        rowCols[2].textContent = "$" + mortgage.principalPayments[i].toFixed(2);
        rowCols[3].textContent = "$" + mortgage.interestPayments[i].toFixed(2);
        rowCols[4].textContent = "$" + mortgage.totalInterest[i].toFixed(2);
        rowCols[5].textContent = "$" + mortgage.balance[i].toFixed(2);

        tableBody.appendChild(tableRow);
    }


}
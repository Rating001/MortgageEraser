function getInput() {
    document.getElementById('breakdown-table').classList.add("hide-me");

    let mortgage = {};

    mortgage.loanAmount = document.getElementById('loanAmount').value;
    mortgage.loanTerm = document.getElementById('loanTerm').value;
    mortgage.loanInterest = document.getElementById('loanInterest').value;

    //Insert the checks for specific values here.



    mortgage = calculate(mortgage);
    print(mortgage);
}

function calculate(mortgage) {


    mortgage.monthlyPayment = (mortgage.loanAmount * (mortgage.loanInterest/1200)) / (1 - ((1 + mortgage.loanInterest/1200) ** ((-1) * mortgage.loanTerm)));

    return mortgage;
}

function print(mortgage) {

    let monthlyPayment = document.getElementById('monthlyPayment');

    monthlyPayment.innerHTML = [];

    monthlyPayment.innerHTML = "$" + mortgage.monthlyPayment.toFixed(2);
}
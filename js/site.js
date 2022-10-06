function getInput() {
    document.getElementById('breakdown-table').classList.add("hide-me");

    let loanAmount = document.getElementById('loanAmount').value;
    let loanTerm = document.getElementById('loanTerm').value;
    let loanInterest = document.getElementById('loanAmount').value;

    calculate(loanAmount,loanTerm, loanInterest);
}

function calculate(amount,term,interest) {

}
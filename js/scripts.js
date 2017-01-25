// Business logic
function BankAccount(name, deposit) {
  this.customerName = name;
  this.balance = deposit;
}

BankAccount.prototype.deposit = function(amount) {
  this.balance += amount;
};

BankAccount.prototype.withdraw = function(amount) {
  if (this.balance < ammount)
    throw new Error("You cannot overdraw your account.");
  this.balance -= amount;
};


// Interface logic
var displayAccount = function(account) {
  $("#show-name").text(account.customerName);
  $("#show-balance").text('$' + account.balance.toFixed(2));
};

$(document).ready(function() {
  $("form#new-bank-account").submit(function(event) {
    event.preventDefault();

    var inputtedName = $("#new-name").val();
    var inputtedDeposit = parseFloat($("#new-deposit").val());

    var newBankAccount = new BankAccount(inputtedName, inputtedDeposit);

    displayAccount(newBankAccount);
  });
});

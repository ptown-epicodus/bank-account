// Business logic
function BankAccount(name, deposit) {
  this.customerName = name;
  this.balance = deposit;
}

BankAccount.prototype.deposit = function(amount) {
  this.balance += amount;
};

BankAccount.prototype.withdraw = function(amount) {
  if (this.balance < amount)
    throw new Error("You cannot overdraw your account.");
  this.balance -= amount;
};


// Interface logic
var currentAccount = undefined; // BankAccount instance being edited/displayed
var displayAccount = function(account) {
  if (account === undefined || account === null) {
    $("#show-account").hide();
  } else {
    $("#show-name").text(account.customerName);
    $("#show-balance").text('$' + account.balance.toFixed(2));
  }
};

// Reset all input fields within selector's context
var resetFields = function(selector) {
  $(selector + ' input').val("");
}

$(document).ready(function() {
  $("form#new-bank-account").submit(function(event) {
    event.preventDefault();

    var inputtedName = $("#new-name").val();
    var inputtedDeposit = parseFloat($("#new-deposit").val());

    currentAccount = new BankAccount(inputtedName, inputtedDeposit);

    resetFields("form#new-bank-account");
    displayAccount(currentAccount);
  });

  $("form#edit-bank-account").submit(function(event) {
    event.preventDefault();

    var inputtedDeposit = parseFloat($("#deposit").val());
    var inputtedWithdrawal = parseFloat($("#withdrawal").val());

    currentAccount.deposit(inputtedDeposit);
    currentAccount.withdraw(inputtedWithdrawal);
    resetFields("form#edit-bank-account");
    displayAccount(currentAccount);
  });
});

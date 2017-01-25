// Business logic
var accounts = [];

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
    $("#show-account").show();
  }
};

// Reset all input fields within selector's context
var resetFields = function(selector) {
  $(selector + ' input').val("");
};

var validateNumber = function(value) {
  if ((undefined === value) || (null === value))
    return false;
  if (typeof value == 'number')
    return !isNaN(value);
  return false;
};

var i = 0;
$(document).ready(function() {
  $("form#new-bank-account").submit(function(event) {
    event.preventDefault();

    var inputtedName = $("#new-name").val();
    var inputtedDeposit = parseFloat($("#new-deposit").val());

    currentAccount = new BankAccount(inputtedName, inputtedDeposit);
    accounts.push(currentAccount);

    resetFields("form#new-bank-account");
    displayAccount(currentAccount);

    var addedAccount = currentAccount;
    $("#show-accounts ul").append("<li id='account" + i + "'><span class='account'>" + currentAccount.customerName + "</span></li>");
    i++;
    $("#show-accounts li").last().click(function() {
      var index = parseInt(this.id.match(/[0-9]+/)[0]);

      resetFields("form#new-bank-account");
      resetFields("form#edit-bank-account");
      currentAccount = accounts[index];
      displayAccount(currentAccount);
    });
    $("#show-accounts").show();
  });

  $("form#edit-bank-account").submit(function(event) {
    event.preventDefault();

    var inputtedDeposit = parseFloat($("#deposit").val());
    var inputtedWithdrawal = parseFloat($("#withdrawal").val());

    if (validateNumber(inputtedDeposit))
      currentAccount.deposit(inputtedDeposit);
    if (validateNumber(inputtedWithdrawal))
      currentAccount.withdraw(inputtedWithdrawal);
    resetFields("form#edit-bank-account");
    displayAccount(currentAccount);
  });
});

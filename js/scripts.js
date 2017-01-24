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

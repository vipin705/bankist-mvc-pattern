import * as modal from './modal.js';
import accountView from './Views/accountView.js';
import loginView from './Views/loginView.js';
import 'regenerator-runtime';

// Elements

const labelDate = document.querySelector('.date');

const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');

const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let userAccount;

const addLoanAmount = function (amount) {
  userAccount.movements.push(amount);
  accountView.displaymovements(userAccount);
};

const getUserAccount = function (userName) {
  try {
    userAccount = modal.accounts.find(account => account.userName === userName);
    if(!userAccount) throw new Error(`Account Not Found`)
    accountView.displaymovements(userAccount);
  } catch (err) {
    console.log(err.message);
  }
};

const transfer = function(userName, amount){
  const toAccount = modal.accounts.find( account => account.userName === userName)?.movements
  if(!toAccount) return;
  toAccount.push(amount);
  userAccount.movements.push(-amount);
  accountView.displaymovements(userAccount);
}

const init = function () {
  loginView.loginUser(getUserAccount);
  accountView.requestLoan(addLoanAmount);
  accountView.transferFunds(transfer);
};

init();

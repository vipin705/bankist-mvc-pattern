import { CURRENCY_TYPE } from '../config.js';
import 'regenerator-runtime';

class AccountView {
  _parentElement = document.querySelector('.movements');
  _labelSumIn = document.querySelector('.summary__value--in');
  _labelSumOut = document.querySelector('.summary__value--out');
  _labelSumInterest = document.querySelector('.summary__value--interest');
  _labelBalance = document.querySelector('.balance__value');
  _btnLoan = document.querySelector('.form__btn--loan');
  _inputLoanAmount = document.querySelector('.form__input--loan-amount');
  _containerApp = document.querySelector('.app');
  _btnTransfer = document.querySelector('.form__btn--transfer');
  _inputTransferTo = document.querySelector('.form__input--to');
  _inputTransferAmount = document.querySelector('.form__input--amount');
  _labelWelcome = document.querySelector('.welcome');

  displaymovements(account) {
    const movements = account.movements;
    if (!movements) return;
    this._containerApp.style.opacity = 100;
    this._labelWelcome.textContent = `Welcome back, ${
      account.owner.split(' ')[0]
    }`;
    const markup = movements.map(this._generateMarkUp).join('');
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    this._labelSumIn.innerHTML = this._getIncome(movements);
    this._labelSumOut.innerHTML = this._getExenses(movements);
    this._labelBalance.innerHTML = this._getBalance(movements);
    this._labelSumInterest.innerHTML = this._getIntrest(account);
  }

  requestLoan(handler) {
    this._btnLoan.addEventListener('click', e => {
      e.preventDefault();
      const loanAmount = +this._inputLoanAmount.value;
      handler(loanAmount);
      this._inputLoanAmount.value = '';
    });
  }

  transferFunds(handler) {
    this._btnTransfer.addEventListener('click', e => {
      e.preventDefault();
      const transferToAcc = this._inputTransferTo.value.toLowerCase();
      const transferAmount = +this._inputTransferAmount.value;
      console.log(transferAmount, transferToAcc);
      handler(transferToAcc, transferAmount);
      this._inputTransferTo.value = '';
      this._inputTransferAmount.value = '';
    });
  }

  _generateMarkUp(movement, index) {
    const movType = movement > 0 ? 'deposit' : 'withdrawal';
    return `
   <div class="movements__row">
    <div class="movements__type movements__type--${movType}">${
      index + 1
    } ${movType}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${new Intl.NumberFormat(CURRENCY_TYPE, {
      style: 'currency',
      currency: 'USD',
    }).format(movement)}</div>
   </div>`;
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _getIncome(movements) {
    const deposits = movements.filter(movement => movement > 0);
    const deposit = deposits.reduce(
      (accum, movement) => (accum += movement),
      0
    );
    return new Intl.NumberFormat(CURRENCY_TYPE, {
      style: 'currency',
      currency: 'USD',
    }).format(deposit);
  }

  _getExenses(movements) {
    const expenses = movements.filter(movement => movement < 0);
    const expense = expenses.reduce(
      (accum, movement) => (accum += movement),
      0
    );
    return new Intl.NumberFormat(CURRENCY_TYPE, {
      style: 'currency',
      currency: 'USD',
    }).format(expense);
  }

  _getBalance(movements) {
    const balance = movements.reduce(
      (accum, movement) => (accum += movement),
      0
    );
    return new Intl.NumberFormat(CURRENCY_TYPE, {
      style: 'currency',
      currency: 'USD',
    }).format(balance);
  }

  _getIntrest(account) {
    const balance = account.movements.reduce(
      (accum, movement) => (accum += movement),
      0
    );
    const intrest = balance + (balance * account.interestRate) / 100;

    return new Intl.NumberFormat(CURRENCY_TYPE, {
      style: 'currency',
      currency: 'USD',
    }).format(intrest);
  }
}

export default new AccountView();

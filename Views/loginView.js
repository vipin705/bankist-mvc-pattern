class LoginView {
  _inputLoginUsername = document.querySelector('.login__input--user');
  _inputLoginPin = document.querySelector('.login__input--pin');
  _btnLogin = document.querySelector('.login__btn');


  loginUser(handler) {
      this._btnLogin.addEventListener('click', e =>{
          e.preventDefault();
          const userName = this._inputLoginUsername.value;
          const pin = +this._inputLoginPin.value;
          if(!userName || !pin) return;
          handler(userName);
          this._inputLoginUsername.value  = '';
          this._inputLoginPin.value = '';
      });
  }
}

export default new LoginView();

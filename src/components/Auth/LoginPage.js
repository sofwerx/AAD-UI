import React from 'react';

import '../../assets/css/login.css';
import LoginForm from '../Forms/LoginForm';

class LoginPage extends React.Component {

  render() {
    return (
      <main>
        <h4 className="signup-login-header login-header">Login</h4>
        <LoginForm/>
      </main>
    );
  }
}

export default LoginPage;

import React, { useState } from 'react'
import { Card, CardContent, TextField, Button } from '@material-ui/core';
import strings from '../../assets/locales/strings';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function doLogin(e) {
    e.preventDefault();
    console.log(username, password);
  }

  return (
    <Card className="login" variant="outlined">
      <CardContent>
        <form className="login-form" onSubmit={doLogin}>
          <TextField
            className="login-form-input"
            label={strings.adminLogin.username}
            variant="outlined"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            className="login-form-input"
            label={strings.adminLogin.password}
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            className="login-button"
            type="submit"
          >
            {strings.adminLogin.signIn}
          </Button>
      </form>
      </CardContent>
    </Card>
  );
}

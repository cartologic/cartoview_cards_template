import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog';
import classNames from 'classnames';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import { default as Logout } from './userAvatar.jsx'
import Typography from 'material-ui/Typography';


const styles = {
  loginButton: {
    marginRight: '20px'
  },
  avatar: {
    marginRight: '20px'
  }
}

class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username: '',
      password: ''
    };
  }

  handleClickOpen() {
    this.setState({open: true});
  };

  handleRequestClose() {
    // this.setState({ open: false });
    let form = new FormData();
    form.append("username", this.state.username);
    form.append("password", this.state.password);
    let url = "/account/ajax_login"
    let Init = {
      method: 'POST',
      headers: new Headers({"X-CSRFToken": CSRF_TOKEN}),
      body: form,
      credentials: 'same-origin',
      dataType: 'json'
    };
    fetch(url, Init).then((response) => {
      if (response.status == 200) {
        window
          .location
          .reload()
      }
      else {
        this.setState({response_error: true})
      }
    }).catch((error) => {
      console.log(error)
    })
  };

  handleCancel() {
    this.setState({open: false, username: '', password: '', response_error: false});
  };

  render() {
    const {classes} = this.props;
    const avatar = <Logout />
    const LoginDialog = (
      <div>
        <Button
          onClick={() => {
          this.handleClickOpen()
        }}
          color='contrast'
          className={classes.loginButton}>Login</Button>
        <Dialog
          open={this.state.open}
          onRequestClose={() => {
          this.handleRequestClose()
        }}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <DialogContentText ></DialogContentText>
            {this.state.response_error && <Typography type={'subheading'} color='accent'>
              {'Please make sure of username & password'}
            </Typography>}
            <TextField
              error = {this.state.response_error ? true : false}
              autoFocus
              margin="dense"
              id="username"
              label="User Name"
              type="text"
              onChange={(e) => {
              this.setState({username: e.target.value})
              }}
              onKeyPress={(e)=>{if(e.key == 'Enter'){this.handleRequestClose()}}}
              value={this.state.username}
              fullWidth/>
            <TextField
              error = {this.state.response_error ? true : false}  
              margin="dense"
              id="password"
              label="Password"
              type="password"
              onChange={(e) => {
              this.setState({password: e.target.value})
              }}
              onKeyPress={(e)=>{if(e.key == 'Enter'){this.handleRequestClose()}}}
              value={this.state.password}
              fullWidth/>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
              this.handleCancel()
            }}
              color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
              this.handleRequestClose()
            }}
              color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )

    if (user_logged_in) 
      return (avatar);
    else 
      return (LoginDialog);
    }
  }

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginDialog);
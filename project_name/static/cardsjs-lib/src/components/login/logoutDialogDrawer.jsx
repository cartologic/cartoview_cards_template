import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog';
import classNames from 'classnames';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import PowerSettingsNew from 'material-ui-icons/PowerSettingsNew';
import { withStyles } from 'material-ui/styles';


const styles = {
  loginButton: {
    width: '100px',
    color: 'black'
  },
  logoutButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  }
}

class LogoutDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username: '',
      password: ''
    };
  }

  handleClickOpen() {
    console.log('Clicked !!!!!!')
    this.setState({ open: true });
  };

  handleRequestClose() {    
    let form = new FormData();
    let url = "/account/logout/"
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
    }).catch((error) => {
      console.log(error)
    })
  };

  handleCancel() {
    this.setState({open: false});
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <List className={classes.logoutButton}>
          <ListItem onClick={() => { this.handleClickOpen();}} button>
            <ListItemIcon>
              <PowerSettingsNew/>
            </ListItemIcon>
            <ListItemText primary={"Log out"}/>
          </ListItem>
        </List>
        <Dialog
          open={this.state.open}
          onRequestClose={() => {
          this.handleRequestClose()
          }}>        
          <DialogTitle>Logout</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to logout cartoview?</DialogContentText>
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
              color="accent">
              Yes! I am sure
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
    return (LoginDialog);
    }
  }

LogoutDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LogoutDialog);
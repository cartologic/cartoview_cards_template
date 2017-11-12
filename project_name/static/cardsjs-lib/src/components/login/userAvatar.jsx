import React from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {FormControl, FormLabel, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import Avatar from 'material-ui/Avatar';

import {default as LogoutDialog} from './logoutDialog.jsx'

const styles = theme => ({
  avatar: {
    marginRight: '20px'
  },
  typography: {
    margin: theme.spacing.unit * 2,
    width: '100px'
  },
});

class AnchorPlayground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
    };
  }

  handleClickButton() {
    this.setState({
      open: true,
      anchorEl: findDOMNode(this.button)
    });
    this.button = null;
  }

  handleRequestClose() {
    this.setState({open: false});
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Avatar aria-label="logout" className={classes.avatar + ' user_avatar'} ref={node => {this.button = node;}} onClick={()=>{this.handleClickButton()}}>
          {user_name[0].toUpperCase()}
        </Avatar>
        <Popover
          open={this.state.open}
            anchorEl={this.state.anchorEl}
            onRequestClose={()=>{this.handleRequestClose()}}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
          }}
        ><LogoutDialog handleRequestClose={()=>{this.handleRequestClose()}}/></Popover>
      </div>  
    )
  }
}

AnchorPlayground.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnchorPlayground);
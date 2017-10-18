/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import ShareIcon from 'material-ui-icons/Share';
import copy from 'copy-to-clipboard'

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class SimpleSnackbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: null,
    };
  }

  handleClick() {  
    this.setState({ open: true });
  };

  handleRequestClose (event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <IconButton aria-label="Share" onClick={() => { copy(String(window.location.origin+this.props.detail_url));this.handleClick()}}>
            <ShareIcon />
        </IconButton>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onRequestClose={this.handleRequestClose.bind(this)}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">URL copied to clip board</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleRequestClose.bind(this)}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSnackbar);
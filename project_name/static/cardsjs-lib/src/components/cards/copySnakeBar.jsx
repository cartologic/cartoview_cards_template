import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import ShareIcon from 'material-ui-icons/Share';
import copy from 'copy-to-clipboard'
import { default as CopyIcon } from 'material-ui-icons/ContentCopy';
import Typography from 'material-ui/Typography';


const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  iconButton: {
    display: 'inline-flex',
  },
  copyButton: {
    width: 'unset'
  },
  actionsTyping: {
    fontSize:'13px !important'
  },
});

class SimpleSnackbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      message: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({open: nextProps.open})
    }
  }

  handleRequestClose (event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
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
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SimpleSnackbar);
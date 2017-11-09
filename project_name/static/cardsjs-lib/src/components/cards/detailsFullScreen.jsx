import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';

import Button from 'material-ui/Button';
import Dialog, {DialogContent} from 'material-ui/Dialog';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MoreHoriz from 'material-ui-icons/MoreHoriz'
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

const styles = theme => {
  return ({
    detailsButton: {
      flex: '1 0 10%',
      margin: 'auto 0',
    },
    appBar: {
      position: 'relative',
      overFlow: 'overlay'
    },
    Dialog: {
      overflow:'scroll'
    },
    flex: {
      flex: 1
    },
    title: {
      display: 'inline-flex'
    },
    
  })
};

class FullScreenDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleClickOpen() {
    this.setState({open: true});
  };

  handleRequestClose() {
    this.setState({open: false});
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.detailsButton}>
        <IconButton
          onClick={()=>{this.handleClickOpen()}}
          color="contrast"
          >
          <MoreHoriz/>
        </IconButton>

        <Dialog
          fullScreen
          className={classes.Dialog}
          open={this.state.open}
          onRequestClose={() => {
          this.handleRequestClose()
          }}
          transition={<Slide direction="down"/>}>
          
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography type="title" color="inherit" className={classes.flex}>
                details
              </Typography>
              
              <Button
                color="contrast"
                onClick={() => {this.handleRequestClose()}}>
                Done
              </Button>
            </Toolbar>
          </AppBar>
          
          <DialogContent>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In optio quod dignissimos consequatur explicabo quis ipsam. Cumque id deleniti consectetur nam eligendi provident ad aliquid aut, fuga hic a dolore.</p>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullScreenDialog);
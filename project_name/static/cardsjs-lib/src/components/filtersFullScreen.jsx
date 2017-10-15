import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

import ChipsArray from './filterChipsArray.jsx'

const styles = {
  appBar: {
    position: 'relative',
    overFlow: 'overlay'
  },
  flex: {
    flex: 1,
  },
  chipsArray: {
    display:'inline-flex'
  },
};

class FullScreenDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClickOpen () {
    this.setState({ open: true });
  };

  handleRequestClose () {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={()=>{this.handleClickOpen()}}>Open Filters</Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onRequestClose={()=>{this.handleRequestClose()}}
          transition={<Slide direction="right" />}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="contrast" onClick={()=>{this.handleRequestClose()}} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography type="title" color="inherit" className={classes.flex}>
                Filters
              </Typography>
              <Button color="contrast" onClick={()=>{this.handleRequestClose()}}>
                save
              </Button>
            </Toolbar>
          </AppBar>


          <div style={{ textAlign: 'Center', margin: '0px auto', width: '80%' }}><h3>Applied Filters</h3></div>
          <div style={{ textAlign: 'Center', margin: '0px auto', width: '80%' }}>
            <p style={{display:'inline-flex', marginRight:'10px'}}>Search Text: </p>
            <p style={{display:'inline-flex'}}>lorem ipsum</p>
          </div>
          <div style={{ textAlign: 'Center', margin: '0px auto', width: '80%' }}>
            <p style={{display:'inline-flex'}}>Keywords</p>
            <ChipsArray style={{display:'inline-flex'}}/>
          </div>
          <div style={{ textAlign: 'Center', margin: '0px auto', width: '80%' }}>
            <p style={{display:'inline-flex'}}>Categories</p>
            <ChipsArray style={{display:'inline-flex'}}/>
          </div>

      

        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
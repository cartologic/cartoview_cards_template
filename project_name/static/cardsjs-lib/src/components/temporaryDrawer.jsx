import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';


const styles = {
  list: {
    width: 250,
  },
  listFull: {
    width: 'auto',
  },
};

class TemporaryDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false,
    };
  }

  toggleDrawer(side, open) {
    this.setState({
      [side]: open,
    });
  }

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>'Lala land'</List>
        <Divider />
        <List>'other Lala land'</List>
      </div>
    );

    const fullList = (
      <div className={classes.listFull}>
        <List>'mailFolderListItems'</List>
        <Divider />
        <List>'other Lala land'</List>
      </div>
    );

    return (
      <div>
        <Button onClick={()=>{this.toggleDrawer('top', true)}}>Open Top</Button>
        <Drawer anchor="top" open={this.state.top} onRequestClose={()=>{this.toggleDrawer('top', false)}}>
          <div
            tabIndex={0}
            role="button"
            onClick={()=>{this.toggleDrawer('top', false)}}
            onKeyDown={()=>{this.toggleDrawer('top', false)}}
          >
          <div style={{textAlign:'center'}}><h1>Filters</h1></div>
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
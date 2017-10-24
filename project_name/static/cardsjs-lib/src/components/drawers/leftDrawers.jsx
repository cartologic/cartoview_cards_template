import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';

import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MapIcon from 'material-ui-icons/Map'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import GridIcon from 'material-ui-icons/GridOn'
import Hidden from 'material-ui/Hidden';

import {default as LogoutDrawerButton} from '../login/logoutDialogDrawer.jsx'

const drawerWidth = 240;
const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px'
  }
})

class MainViewDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.drawerOpen,
    };
  }

  componentWillReceiveProps(NextProps) {
    if (this.props != NextProps) {
      this.setState({
        open: NextProps.drawerOpen
      })
    }
  }

  render() {
    const {classes} = this.props;
    const drawer = (
      <div className={classes.drawerInner}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => {
            this.props.handleDrawerClose()
          }}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider/>
        <List>
          <ListItem onClick={() => window.location.href = urls.MAPS_URL} button>
            <ListItemIcon>
              <MapIcon/>
            </ListItemIcon>
            <ListItemText primary={"Maps"}/>
          </ListItem>
          <ListItem onClick={() => window.location.href = urls.LAYERS_URL} button>
            <ListItemIcon>
              <MapIcon/>
            </ListItemIcon>
            <ListItemText primary={"Layers"}/>
          </ListItem>
          <Divider/>
          <ListItem onClick={() => window.location.href = urls.APPS_URL} button>
            <ListItemIcon>
              <GridIcon/>
            </ListItemIcon>
            <ListItemText primary={"Apps"}/>
          </ListItem>
        </List>
        {user_logged_in && <LogoutDrawerButton/>}
      </div>
    );

    return (
      <div>
        <Hidden mdDown>
          <Drawer
            type="persistent"
            classes={{
            paper: classes.drawerPaper
          }}
            open={this.state.open}>
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden lgUp>
          <Drawer
            className='myClass'
            type="temperory"
            classes={{
            paper: classes.drawerPaper
            }}
            open={this.state.open}>
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

MainViewDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(MainViewDrawer);

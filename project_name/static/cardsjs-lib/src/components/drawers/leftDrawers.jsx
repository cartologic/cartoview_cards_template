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
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';

import {default as LogoutDrawerButton} from '../login/logoutDialogDrawer.jsx'

const drawerWidth = 240;
const styles = theme => ({
  drawerPaper: {
    height: 'calc(100% - 45px)',
    position: 'fixed',
    width: drawerWidth,
    paddingTop: '55px',
    left: 0,
    zIndex: 0,
  },
  drawerPaperSmall: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    top: 0,
    left: 0,
    borderRight: 'none !important'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  Toolbar:{
    padding: '0 !important',
    minHeight: '55 !important'
  },
  countAvatar: {
    width: 'max-content',
    minWidth: 20,
    height: 15,
    padding: 3,
    fontSize: 'small'
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
    const NavigationList = (
        <List>
          <ListItem onClick={() => window.location.href = urls.MAPS_URL} button>
            <ListItemIcon>
              <MapIcon/>
            </ListItemIcon>
            <ListItemText primary={"Maps"} />
            <Avatar className={classes.countAvatar}>{this.props.count.mapsCount}</Avatar>
          </ListItem>
          <ListItem onClick={() => window.location.href = urls.LAYERS_URL} button>
            <ListItemIcon>
              <MapIcon/>
            </ListItemIcon>
            <ListItemText primary={"Layers"}/>
            <Avatar className={classes.countAvatar}>{this.props.count.layersCount}</Avatar>
          </ListItem>
          <Divider/>
          <ListItem onClick={() => window.location.href = urls.APPS_URL} button>
            <ListItemIcon>
              <GridIcon/>
            </ListItemIcon>
            <ListItemText primary={"Apps"}/>
            <Avatar className={classes.countAvatar}>{this.props.count.appsCount}</Avatar>
          </ListItem>
        </List>

    );
    const drawer = (
      <div className={classes.drawerInner}>
        {NavigationList}
        {user_logged_in && <LogoutDrawerButton />}
      </div>
    );

    const drawerSmallDevices = (
      <div className={classes.drawerInner}>
        <div className={classes.drawerHeader}>
          <AppBar position="static">
            <Toolbar className={classes.Toolbar}>
              <IconButton
                color="contrast"
                aria-label="Select Resource"
                onClick={() => {
                this.props.handleDrawerOpen()
                }}
                className={classNames(classes.menuButton)}>
                <MenuIcon/>
              </IconButton>
              {this.props.title}
            </Toolbar>
          </AppBar>
        </div>
        {NavigationList}
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
            paper: classes.drawerPaperSmall
            }}
            open={this.state.open}>
            {drawerSmallDevices}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

MainViewDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  title: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainViewDrawer);

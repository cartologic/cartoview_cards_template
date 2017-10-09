import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MapIcon from 'material-ui-icons/Map'
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import GridIcon from 'material-ui-icons/GridOn'
import Hidden from 'material-ui/Hidden';

import ResourceCard from './resourceCard.jsx'

import Grid from 'material-ui/Grid';

import '../css/style.css'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    // height: 'auto', marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    // overflow: 'overlay'
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    // height: '100%'
  },
  rootGrid: {
    flexGrow: 1
  },
  appBar: {
    position: 'absolute',
    transition: theme
      .transitions
      .create([
        'margin', 'width'
      ], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme
      .transitions
      .create([
        'margin', 'width'
      ], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  },
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
  },
  content: {
    width: '100%',
    marginLeft: `-${drawerWidth + 1}px`,
    [
      theme
        .breakpoints
        .down('lg')
    ]: {
      marginLeft: `0px`
    },
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme
      .transitions
      .create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [
      theme
        .breakpoints
        .up('sm')
    ]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64
      }
    }
  },
  contentShift: {
    marginLeft: 0,
    transition: theme
      .transitions
      .create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
  }
});

class CardsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  getResources() {
    fetch(this.props.resources_url, {credentials: 'include'}).then((response) => response.json()).then((data) => {
      this.setState({resources: data.objects})
    })
  }

  componentWillMount() {
    this.getResources()
  }

  handleDrawerOpen() {
    this.setState({open: true});
  };

  handleDrawerClose() {
    this.setState({open: false});
  };

  render() {
    const {classes} = this.props;
    const drawer = (
      <div className={classes.drawerInner}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => {
            this.handleDrawerClose()
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
      </div>
    );
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={() => {
                this.handleDrawerOpen()
              }}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}>
                <MenuIcon/>
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                {this.props.title}
              </Typography>
            </Toolbar>
          </AppBar>
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
          <main
            className={classNames(classes.content, this.state.open && classes.contentShift)}>
            <Grid container direction={"row"} className={classes.rootGrid} spacing={16}>
              {this.state.resources && this
                .state
                .resources
                .map((resource, i) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      lg={3}
                      key={i}
                      >
                      <ResourceCard
                        id={resource.id}
                        owner={resource.owner__username || resource.owner}
                        title={resource.title}
                        thumbnail_url={resource.thumbnail_url}
                        date={resource.date}
                        abstract={resource.abstract}
                        detail_url={resource.detail_url}/>
                    </Grid>
                  )
                })}
            </Grid>
          </main>
        </div>
      </div>
    );
  }
}

CardsView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardsView);
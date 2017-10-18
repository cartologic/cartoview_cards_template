import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';

import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import {default as FiltersDialog} from '../filters/filtersFullScreen.jsx'
import {default as LoginDialog} from '../login/loginDialog.jsx'
import {default as SearchBar} from './searchBar.jsx'

const drawerWidth = 240;
const styles = theme => {
  return ({
    title: {
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
  });
}

class MainViewAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appBarShift: this.props.appBarShift,
      keywords: this.props.keywords,
      categories: this.props.categories,
      owners: this.props.owners,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.setState({
        appBarShift: nextProps.appBarShift,
        keywords: nextProps.keywords,
        categories: nextProps.categories,
        owners: nextProps.owners,
      })
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <AppBar
        className={classNames(classes.appBar, this.state.appBarShift && classes.appBarShift)}>
        <Toolbar disableGutters={!this.state.appBarShift}>
          <IconButton
            color="contrast"
            aria-label="Select Resource"
            onClick={() => {
            this.props.handleDrawerOpen()
            }}
            className={classNames(classes.menuButton, this.state.appBarShift && classes.hide)}>
            <MenuIcon/>
          </IconButton>
          <Typography type="headline" color="inherit" className={classes.title} noWrap>
            {this.props.title}
          </Typography>

          {
            this.state.keywords
            && this.state.categories
            && this.state.owners
            && <FiltersDialog
                keywords={this.state.keywords}
                categories={this.state.categories}
                owners={this.state.owners}
                applyFilters={(paramsString) => {
                this.props.applyFilters(paramsString)
                }}/>
          }

          {
            this.props.resourcesReady &&
            <SearchBar
            searchResources={(searchValue) => {
            this.props.searchResources(searchValue)
            }}/>
          }
          <LoginDialog/>
        </Toolbar>
      </AppBar>
    )
  }
}

MainViewAppBar.propTypes = {
  classes: PropTypes.object.isRequired,

  // when drawer open
  appBarShift: PropTypes.bool.isRequired,

  // func sets the drawer open or close
  handleDrawerOpen: PropTypes.func.isRequired,

  // title of the view
  title: PropTypes.string.isRequired,

  // when all filters fetched
  // filtersReady: PropTypes.bool.isRequired,

  // when resources fetched
  resourcesReady: PropTypes.bool.isRequired,

  // func applies filters
  applyFilters: PropTypes.func.isRequired,

  // func applies search resources
  searchResources: PropTypes.func.isRequired,

  // list of keywords
  keywords: PropTypes.array,

  // list of categories
  categories: PropTypes.array,

  // list of owner
  owners: PropTypes.array,
};

export default withStyles(styles)(MainViewAppBar);

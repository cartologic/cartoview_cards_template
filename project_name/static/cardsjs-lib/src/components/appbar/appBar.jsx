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
    appBar: {
      position: 'fixed',
      transition: theme
        .transitions
        .create([
          'margin', 'width'
        ], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
    },
    Toolbar: {
      padding: 0,
      minHeight: '55 !important',
    },
  });
}

class MainViewAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: this.props.keywords,
      categories: this.props.categories,
      owners: this.props.owners,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.setState({
        keywords: nextProps.keywords,
        categories: nextProps.categories,
        owners: nextProps.owners,
        title: nextProps.title,
      })
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <AppBar
        className={classNames(classes.appBar)}>
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

  // func sets the drawer open or close
  handleDrawerOpen: PropTypes.func.isRequired,

  // title of the view
  title: PropTypes.object.isRequired,

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

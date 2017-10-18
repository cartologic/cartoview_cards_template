import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import {default as ResourceCard} from './cards/resourceCard.jsx'
import {default as MainAppBar} from './appbar/appBar.jsx'
import {default as LeftDrawer} from './drawers/leftDrawers.jsx'
import {default as CardsGrid} from './cards/cardsGrid.jsx'

import '../css/style.css'

const drawerWidth = 240;
const styles = theme => {
  return ({
    root: {
      width: '100%',
      zIndex: 1,
      // height: 'auto', marginTop: theme.spacing.unit * 3, overflow: 'overlay'
    },
    appFrame: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      // height: '100%'
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
      // height: 'calc(100% - 56px)',
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
}

class CardsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftDrawerOpen: false
    };
  }

  getSuggestions() {
    let suggestions = this
      .state
      .resources
      .map((r, i) => {
        return {label: r.title}
      })
    return suggestions
  }

  getResources() {
    fetch(this.props.resources_url, {credentials: 'include'}).then((response) => response.json()).then((data) => {
      this.setState({resources: data.objects})
    })

    let categories = []
    fetch(urls.CATEGORIES_API_URL, {credentials: 'include'}).then((response) => response.json()).then((data) => {
      categories = data
        .objects
        .map((o, i) => {
          return {value: o.gn_description_en, apiValue: o.identifier}
        })
    }).then(() => {
      this.setState({categories})
    })

    let keywords = []
    fetch(urls.KEYWORDS_API_URL, {credentials: 'include'}).then((response) => response.json()).then((data) => {
      keywords = data
        .objects
        .map((o, i) => {
          return {value: o.name, apiValue: o.slug}
        })
    }).then(() => {
      this.setState({keywords})
    })

    let owners = []
    fetch(urls.OWNERS_API_URL, {credentials: 'include'}).then((response) => response.json()).then((data) => {
      owners = data
        .objects
        .map((o, i) => {
          return {value: o.username, apiValue: o.username}
        })
    }).then(() => {
      this.setState({owners})
    })

  }

  searchResources(value) {
    if (value == '') 
      this.applyFilters()
    else {
      let url = `${this.props.resources_url}?&title__icontains=${value}`
      fetch(url, {credentials: 'include'}).then((response) => response.json()).then((data) => {
        this.setState({resources: data.objects})
      })
    }
  }

  setParamsString(paramsString) {
    this.setState({
      paramsString
    }, () => {
      this.applyFilters()
    })
  }

  applyFilters() {
    let url = this.state.paramsString
      ? `${this.props.resources_url}?${this.state.paramsString}`
      : `${this.props.resources_url}`
    fetch(url, {credentials: 'include'}).then((response) => response.json()).then((data) => {
      this.setState({resources: data.objects})
    })
  }

  componentWillMount() {
    this.getResources()
  }

  handleDrawerOpen() {
    this.setState({leftDrawerOpen: true});
  };

  handleDrawerClose() {
    this.setState({leftDrawerOpen: false});
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <MainAppBar
            appBarShift={this.state.leftDrawerOpen}
            handleDrawerOpen={() => {
            this.handleDrawerOpen()
          }}
            title={this.props.title}
            filtersReady={this.state.categories && this.state.keywords && this.state.owners
            ? true
            : false}
            resourcesReady={this.state.resources
            ? true
            : false}
            keywords={this.state.keywords && this.state.keywords}
            categories={this.state.categories && this.state.categories}
            owners={this.state.owners && this.state.owners}
            applyFilters={(paramsString) => {
            this.setParamsString(paramsString)
          }}
            searchResources={(value) => {
            this.searchResources(value)
          }}/>

          <LeftDrawer
            handleDrawerClose={() => {
            this.handleDrawerClose()
          }}
            drawerOpen={this.state.leftDrawerOpen}/>

          <main
            className={classNames(classes.content, this.state.leftDrawerOpen && classes.contentShift)}>
            <CardsGrid
              resources={this.state.resources
              ? this.state.resources
              : []}/>
          </main>
        </div>
      </div>
    );
  }
}

CardsView.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  resources_url: PropTypes.string.isRequired
};

export default withStyles(styles)(CardsView);

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import {default as UpIcon} from 'material-ui-icons/ArrowUpward'

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
      height: '100%',
      marginBottom: theme.spacing.unit * 3,
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
      paddingTop: theme.spacing.unit * 3,
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
    },
    loadMore: {
      margin: '30 0 30 0', 
      display: 'flex',
      justifyContent: 'center'
    },
    loadMoreButton: {
      display: 'inline-flex',
      marginRight: 20
    },
  });
}

class CardsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftDrawerOpen: false,
      paramsObject:{}
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
      this.setState({resources: data.objects, nextURL: data.meta.next})
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

  searchResources(searchValue) {
    this.applyFilters(searchValue)
  }

  setParamsString(paramsObject) {
    this.setState({ paramsObject }, () => {
      this.applyFilters()
    })
    let paramsString = ''
    for (let param in paramsObject) {
      paramsString += `&${param}=${paramsObject[param].toString()}`
    }
    this.setState({ paramsString: paramsString }, () => {
      this.applyFilters()
    })
  }

  applyFilters(searchValue) {
    let paramsObject = this.state.paramsObject
    if (searchValue && searchValue.trim() != '') {
      paramsObject.title__icontains = searchValue
    }
    else {
      delete paramsObject.title__icontains
    }
    let paramsString = ''
    
    for (let param in paramsObject) {
      paramsString += `&${param}=${paramsObject[param].toString()}`
    }
    
    let url = `${this.props.resources_url}${paramsString}`
    fetch(url, {credentials: 'include'}).then((response) => response.json()).then((data) => {
      this.setState({resources: data.objects, nextURL:data.meta.next})
    })
  }

  getNextResources() {
    let nextURL = this.state.nextURL;
    if (nextURL) {
      fetch(nextURL, { credentials: 'include' }).then((response) => response.json()).then((data) => {
        let currentResources = this.state.resources;
        currentResources.push(...data.objects)
        this.setState({resources: currentResources, nextURL:data.meta.next})
      })
    } else {
      this.setState({endOfResources: true})
    }
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
      <div className={classes.root} >
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
            applyFilters={(paramsObject) => {
            this.setParamsString(paramsObject)
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
                : []} />
            { 
              this.state.nextURL
              ? <div className={classes.loadMore}>
                  <Button raised onClick={() => { this.getNextResources() }} className={classes.loadMoreButton}>Load More</Button>                  
                  <IconButton className={classes.loadMoreButton} onClick={() => { window.scrollTo(0, 0) }} aria-label="Go Up">
                    <UpIcon />
                  </IconButton>
                </div>
                : this.state.resources &&
                this.state.resources.length != 0 &&
                <div className={classes.loadMore}>
                  <IconButton className={classes.loadMoreButton} onClick={() => { window.scrollTo(0, 0) }} aria-label="Go Up">
                    <UpIcon />
                  </IconButton>
                </div>
            }
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

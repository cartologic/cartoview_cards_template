import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import { default as UpIcon } from 'material-ui-icons/ArrowUpward'
import { CircularProgress } from 'material-ui/Progress';

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
      // marginLeft: `-${drawerWidth + 1}px`,
      [
        theme
          .breakpoints
          .down('lg')
      ]: {
        marginLeft: `0px`
      },
      flexGrow: 1,
      paddingTop: theme.spacing.unit * 3,
      transition: theme
        .transitions
        .create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),

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
      marginLeft: 240,
      transition: theme
        .transitions
        .create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        [
          theme
            .breakpoints
            .down('lg')
        ]: {
          marginLeft: 'unset',
        }
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
    progress: {
      margin: '20px 45%'
    },
    title: {
      flexGrow: 1,
      fontSize: 18,
    },
  });
}

class CardsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftDrawerOpen: false,
      paramsObject: {},
      loading: false
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
      this.setState({ resources: data.objects, nextURL: data.meta.next, loading: false})
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
        this.setState({
          resources: currentResources,
          nextURL: data.meta.next,
          loading: false
        })
      })
    } else {
      this.setState({endOfResources: true})
    }
  }

  getApps() {
    let url = urls.APP_API_URL
    let apps = [] 
    
    return new Promise((resolve, reject) => {
      fetch(url, { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          return data.objects.map((o) => {
            apps.push({
              appTitle: o.title,
              appName: o.name,
              count: o.app_instance_count,
            })
          })
        })
      resolve(apps)
    })
  }

  resourcesCount() {
    const resources = [
      { countType: 'layersCount', url: "/api/layers/?limit=1" },
      { countType: 'mapsCount', url: "/api/maps/?limit=1" },
      { countType: 'appsCount', url: '/api/appinstances/?limit=1' },
    ]
    return new Promise((resolve, reject) => {
      resources.map((resource) => {
        fetch(resource.url, { credentials: 'include' })
          .then(response => response.json())
          .then(data => {
            let resourceCount = resource.countType
            this.setState({[resourceCount]:data.meta.total_count})
          })
      })
      resolve("success")
    })
  }

  componentWillMount() {
      
    
    this.setState({ loading: true }, () => {
      this.resourcesCount()
        .then((state) => {
          this.getApps()
            .then((apps) => {
              this.setState({ apps }, () => {
               this.getResources()
            })
          })
    
        })
      
    })
  }

  componentDidMount() {
    window.screenTop = 0
    let timer = null;
    window.addEventListener('scroll', () => {
      let element = document.body;
      if ((element.scrollHeight - element.scrollTop) < (element.clientHeight + 400)) {
        !this.state.loading && this.state.nextURL && this.setState({ loading: true }, () => {
           this.getNextResources()
        })
      }
    })
  }

  handleDrawerOpen() {
    this.setState({leftDrawerOpen: !this.state.leftDrawerOpen});
  };

  handleDrawerClose() {
    this.setState({leftDrawerOpen: false});
  };

  render() {
    const { classes } = this.props;
    const count = {
      mapsCount: this.state.mapsCount,
      layersCount: this.state.layersCount,
      appsCount: this.state.appsCount,
    }
    const title=(
      <Typography type="body1" color="inherit" className={classes.title} noWrap>
        {this.props.title}
      </Typography>
    )

    return (
      <div className={classes.root} >  
        <div className={classes.appFrame}>
          <MainAppBar
            appBarShift={this.state.leftDrawerOpen}
            handleDrawerOpen={() => {
            this.handleDrawerOpen()
          }}
            title={title}
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
            handleDrawerOpen={() => {
              this.handleDrawerOpen()
            }}
            drawerOpen={this.state.leftDrawerOpen}
            title={title}
            count={count}
            apps={this.state.apps}
          />

          <main 
            id='mainId'  
            className={classNames(classes.content, this.state.leftDrawerOpen && classes.contentShift)}>
            <CardsGrid
              resources={this.state.resources
              ? this.state.resources
                : []} />
            {
              this.state.loading
            ? <CircularProgress className={classes.progress} />
            : <div className={classes.loadMore}>                 
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

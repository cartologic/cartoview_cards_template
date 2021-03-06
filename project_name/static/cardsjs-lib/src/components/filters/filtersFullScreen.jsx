import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';

import Button from 'material-ui/Button';
import Dialog, {DialogContent} from 'material-ui/Dialog';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MoreVert from 'material-ui-icons/MoreVert'
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

// import ChipsArray from './filterChipsArray.jsx'
import {default as CategoriesList} from './filterList.jsx'
import {default as KeywordsList} from './filterList.jsx'
import {default as OwnersList} from './filterList.jsx'
import {default as FromDatePicker} from './datePicker.jsx'
import {default as ToDatePicker} from './datePicker.jsx'

const styles = theme => {
  return ({
    appBar: {
      position: 'relative',
      overFlow: 'overlay'
    },
    Dialog: {
      overflow:'scroll'
    },
    flex: {
      flex: 1
    },
    chipsArray: {
      display: 'inline-flex'
    },
    title: {
      display: 'inline-flex'
    },
    menuButton: {
      width: 90,
      marginRight: 10
    },
    dateRoot: {
      minWidth: '300px',
      maxWidth: '25%',
      background: theme.palette.background.paper,
      flexGrow: 1,
      margin: '0 10 10 10'
    },
    dateTitle: {
      backgroundColor: theme.palette.primary[500],
      height: 30,
      paddingTop: 8
    }
  })
};

const initialState = {
  open: false,

  checkedKeywords: [], 
  checkedCategories : [],
  checkedOwners : [],
  fromDate:'',
  toDate:''
};

class FullScreenDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }

  handleClickOpen() {
    this.setState({open: true});
  };

  handleRequestClose() {
    this.setState({open: false});
  };

  handleSave(clear) {
    let params = {}

    if (this.state.checkedKeywords && this.state.checkedKeywords.length > 0) {
      params.keywords__slug__in = this.state.checkedKeywords
    }
    if (this.state.checkedCategories && this.state.checkedCategories.length > 0) {
      params.category__identifier__in = this.state.checkedCategories
    }
    if (this.state.checkedOwners && this.state.checkedOwners.length > 0) {
      params.owner__username__in = this.state.checkedOwners
    }
    if (this.state.toDate && this.state.fromDate) {
      params.date__range = `${this.state.fromDate},${this.state.toDate}`
    } else {
      if (this.state.fromDate) {
        params.date__gte = `${this.state.fromDate}`
      }
      if (this.state.toDate) {
        params.date__gte = `${this.state.toDate}`
      }
    }

    clear
      ? this.setState(initialState, ()=>{this.props.applyFilters({})})
      : this.props.applyFilters(params)
      this.handleRequestClose()      
  }

  manageChecked(list, type) {
    // where type like checkedKeywords, checkedCategories
    this.setState({[type]: list})
  }

  handleDateChange(date, type) {
    this.setState({[type]: date})
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <IconButton
          onClick={() => {
          this.handleClickOpen()
        }}
          color="contrast"
          aria-label="Filters"
          className={classNames(classes.menuButton, this.state.open && classes.hide)}>
          <MoreVert/>
          <Typography type="subheading" color="inherit" className={classes.title} noWrap>
            Filters
          </Typography>
        </IconButton>

        <Dialog
          fullScreen
          className={classes.Dialog}
          open={this.state.open}
          onRequestClose={() => {
          this.handleRequestClose()
          }}
          transition={< Slide direction="down" />}>
          
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="contrast"
                onClick={() => {
                this.handleRequestClose()
              }}
                aria-label="Close">
                <CloseIcon/>
              </IconButton>
              <Typography type="title" color="inherit" className={classes.flex}>
                Filters
              </Typography>
              <Button
                color="accent"
                onClick={() => {
                this.handleSave(true)
                }}>
                Clear All
              </Button>

              <Button
                color="contrast"
                onClick={() => {
                this.handleSave()
                }}>
                Apply
              </Button>
            </Toolbar>
          </AppBar>
          
          <DialogContent>
            <div className={classes.body}>
              <div
                style={{
                textAlign: 'Center',
                margin: '0px auto',
                width: '80%'
              }}>
                <h3>Applied Filters</h3>
              </div>

              <div className={classes.listsContainer+ ' filtersContainer'}>
                <CategoriesList
                  title={'By Category'}
                  items={this.props.categories}
                  checkedItems={this.state.checkedCategories}
                  manageChecked={(list) => {
                  this.manageChecked(list, 'checkedCategories')
                  }}/>
                <KeywordsList
                  title={'By Keyword'}
                  items={this.props.keywords}
                  checkedItems={this.state.checkedKeywords}
                  manageChecked={(list) => {
                  this.manageChecked(list, 'checkedKeywords')
                  }}/>
                <OwnersList
                  title={'By Owner(username)'}
                  items={this.props.owners}
                  checkedItems={this.state.checkedOwners}
                  manageChecked={(list) => {
                  this.manageChecked(list, 'checkedOwners')
                  }} />

                <div className={classes.dateRoot}>
                  <Typography type="subheading" color="inherit" className={classes.dateTitle} align={'center'}>
                    {'By Date'}
                  </Typography>  
                  <div className={classes.DatePickersContainer}>
                    <FromDatePicker
                      label='From'
                      handleDateChange={(date) => {
                      this.handleDateChange(date, 'fromDate')
                    }}
                      value={this.state.fromDate && this.state.fromDate}/>
                    <ToDatePicker
                      label='To'
                      handleDateChange={(date) => {
                      this.handleDateChange(date, 'toDate')
                    }}
                      value={this.state.toDate && this.state.toDate}/>
                  </div>
                </div>  
                </div>              
              </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullScreenDialog);
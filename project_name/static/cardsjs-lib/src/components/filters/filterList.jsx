import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui-icons/Comment';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    // width: 251,
    minWidth: 300,
    maxWidth: '25%',
    background: theme.palette.background.paper,
    flexGrow: 1,
    margin: '0 10 10 10'
  },
  list: {
    border: '1px solid #f3f3f3',
    maxHeight: 300,
    overflow: 'auto',
  },
  filterTitle: {
    backgroundColor: theme.palette.primary[500],
    height: 30,
    paddingTop: 8
  }
});

class CheckboxList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
    };
  }

  componentWillMount() {
    if (this.props.checkedItems) {
      this.setState({checked: this.props.checkedItems})
    }
  }

  handleToggle (value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    }, () => {
      this.props.manageChecked(this.state.checked)
    });
    
  };

  render() {
    const { classes } = this.props;
    const items = this.props.items
    return (
      <div className={classes.root}>
        <Typography type="subheading" color="inherit" className={classes.filterTitle} align={'center'}>
          {this.props.title}
        </Typography>  
        <List className={classes.list}>
          {items.map((item, index) => (
            <ListItem
              key={index}
              dense
              button
              onClick={()=>{this.handleToggle(item.apiValue)}}
              className={classes.listItem}
            >
              <Checkbox
                checked={this.state.checked.indexOf(item.apiValue) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={item.value} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);
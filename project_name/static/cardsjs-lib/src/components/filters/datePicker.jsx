import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 10,
    width: '100%',
    display: 'flex'
  },
});

class DatePickers extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : ""
    };
  }

  handleChange(dateValue) {
    this.setState({ value: dateValue }, () => {
      this.props.handleDateChange(dateValue)
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <TextField
        label={this.props.label}
        InputLabelProps={{shrink:true}}  
        type="date"
        className={classes.textField}
        onChange={(e) => { this.handleChange(e.target.value) }}
        value={this.state.value}  
        />
    )
  }
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickers);
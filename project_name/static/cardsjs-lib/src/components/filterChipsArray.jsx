import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2,
    display: 'flex',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

class ChipsArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // handleRequestDelete (data) {
  //   if (data.label === 'ReactJS') {
  //     alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
  //     return;
  //   }

  //   const chipData = [...this.state.chipData];
  //   const chipToDelete = chipData.indexOf(data);
  //   chipData.splice(chipToDelete, 1);
  //   this.setState({ chipData });
  // };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.row} style={{display:'inline-flex'}}>
        {this.props.chipData.map((value, index) => {
          return (
            <Chip
              label={value}
              key={index}
              className={classes.chip}
            />
          );
        })}
      </div>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);
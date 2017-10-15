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
    this.state = {
      chipData: [
        { key: 0, label: 'filter 1' },
        { key: 1, label: 'filter 2' },
        { key: 2, label: 'filter 3' },
        { key: 3, label: 'filter 4' },
        { key: 4, label: 'filter 5' },
      ],
    };
  }

  // styles = {
  //   chip: {
  //     margin: 4,
  //   },
  //   wrapper: {
  //     display: 'flex',
  //     flexWrap: 'wrap',
  //   },
  // };

  handleRequestDelete (data) {
    if (data.label === 'ReactJS') {
      alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
      return;
    }

    const chipData = [...this.state.chipData];
    const chipToDelete = chipData.indexOf(data);
    chipData.splice(chipToDelete, 1);
    this.setState({ chipData });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.row} style={{display:'inline-flex'}}>
        {this.state.chipData.map(data => {
          return (
            <Chip
              label={data.label}
              key={data.key}
              onRequestDelete={()=>{this.handleRequestDelete(data)}}
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
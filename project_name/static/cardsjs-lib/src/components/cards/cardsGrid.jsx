import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';

import Grid from 'material-ui/Grid';

import {default as ResourceCard} from './resourceCard.jsx'

const styles = theme => ({
  rootGrid: {
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      width: '1000px',
      margin: 'auto'
    },
    [theme.breakpoints.up('lg')]: {
      width: '1250px',
      margin: 'auto'
    },
  },
  gridCell: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '250px',
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      margin: 'auto'
    },
  },
})

class CardsGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: this.props.resources,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.setState({
        resources: nextProps.resources
      })
    }
  }

  renderCards(classes) {
    return (
      this
      .state
      .resources
      .map((resource, i) => {
        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={3}
            key={i}
            className={classes.gridCell}
            >
            <ResourceCard
              id={resource.id}
              owner={resource.owner__username || resource.owner}
              title={resource.title}
              thumbnail_url={resource.thumbnail_url}
              date={resource.date}
              abstract={resource.abstract}
              detail_url={resource.detail_url}/>
          </Grid>
        )
      })
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container direction={"row"} className={classes.rootGrid} spacing={8}>
        {this.state.resources && this.renderCards(classes)}
      </Grid>
    );
  }
}

CardsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  resources: PropTypes.array.isRequired,
};

export default withStyles(styles)(CardsGrid);

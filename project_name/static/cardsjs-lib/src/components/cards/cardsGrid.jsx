import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import {default as SingleCard} from './singleCard.jsx'

const styles = theme => ({
  rootGrid: {
    width: '98%',
  },
  title: {
    marginLeft: 30
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
            md={4}
            lg={3}
            key={i}
            className={classes.gridCell + ' resourceGridCell'}
          >
            <SingleCard
              id={resource.id}
              owner={resource.owner__username || resource.owner}
              title={resource.title}
              thumbnail_url={resource.thumbnail_url}
              date={resource.date}
              abstract={resource.abstract}
              detail_url={resource.detail_url}
              launch_app_url={resource.launch_app_url}
              pageType={this.props.pageType}
            />
          </Grid>
        )
      })
    )
  }

  render() {
    const { classes } = this.props;
    const title = this.props.title && 
      < Typography type="headline" className={classes.title} gutterBottom>
        Featured
      </Typography>
    return (
      <div>
        {title}
        <Grid container direction={"row"} className={classes.rootGrid + ' cardsContainer'} spacing={8}>
          {this.state.resources && this.renderCards(classes)}
        </Grid>
      </div>  
    );
  }
}

CardsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  resources: PropTypes.array.isRequired,
};

export default withStyles(styles)(CardsGrid);

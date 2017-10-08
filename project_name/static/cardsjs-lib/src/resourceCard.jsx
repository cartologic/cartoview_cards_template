import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import OpenIcon from 'material-ui-icons/OpenInBrowser'
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import SimpleSnackbar from './copySnake.jsx'


const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
});

class ResourceCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }


  handleExpandClick () {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const classes = this.props.classes;
    const {id, owner, title, date, thumbnail_url, abstract, detail_url} = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {owner[0].toUpperCase()}
              </Avatar>
            }
            title={title}
            subheader={new Date(date).toDateString()}
          />
          <CardMedia
            className={classes.media}
            image={thumbnail_url}
          />
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites" onClick={()=>window.location.href=detail_url}>
              <OpenIcon />
            </IconButton>
            <SimpleSnackbar detail_url={detail_url}/>            
            <div className={classes.flexGrow} />
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick.bind(this)}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph type="body2">
                Description:
              </Typography>
              <Typography paragraph>
                {abstract}
              </Typography>
              <Grid container direction={ "row"} className={classes.rootGrid} spacing={16}>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.gridItem}>
                  <Button onClick={()=>window.location.href=detail_url} color="primary" className={classes.button}>
                    Open
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.gridItem}>
                  <Button onClick={()=>window.location.href=detail_url} color="accent" className={classes.button}>
                    Details
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

ResourceCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResourceCard);
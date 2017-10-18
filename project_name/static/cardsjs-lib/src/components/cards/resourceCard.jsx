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

import SimpleSnackbar from './copySnakeBar.jsx'


const styles = theme => ({
  card: {
    maxWidth: '100%'
  },
  media: {
    height: '120px',
  },
  expand: {
    margin:'auto',  
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
  title: {
    width: '150px',
    wordWrap: 'break-word',
  }
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

          <CardMedia
            className={classes.media}
            image={thumbnail_url}
          />
          <CardHeader
            className={classes.cardHeader}  
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {owner[0].toUpperCase()}
              </Avatar>
            }
            title={<div className={classes.title}>{title}</div>}
            subheader={new Date(date).toDateString()}
          />
          <CardActions disableActionSpacing>
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
            <SimpleSnackbar detail_url={detail_url}/>                          
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
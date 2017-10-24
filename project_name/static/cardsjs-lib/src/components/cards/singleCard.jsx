import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import {default as LaunchIcon} from 'material-ui-icons/Launch';
// import {default as DetailsIcon} from 'material-ui-icons/Details';
import {default as DetailsIcon} from 'material-ui-icons/FormatListbulleted';
import { default as CopyIcon } from 'material-ui-icons/ContentCopy';
import SimpleSnackbar from './copySnakeBar.jsx'


const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    // width: 200,
    // maxWidth:200,
    minWidth: '70%'
  },
  content: {
    flex: '1 0 auto',
    padding: 10,
  },
  username: {
    fontWeight: 'bolder'
  },
  contentActions: {
    flex: '1 0 auto',
    padding: '0 0 0 10 !important',
    display: 'flex',
    justifyContent: 'start'
  },
  actionsTyping: {
    fontSize:'13px !important'
  },
  iconButton: {
    display: 'inline-flex',
    margin: '0 20 0 0',
  },
  cover: {
    // width: 140,
    // maxWidth: 140,
    minWidth: '30%',
    height: 0,
    // maxHeight: 140,
    paddingTop: '120px',
    backgroundSize: 'cover'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function MediaControlCard(props) {
  const { classes, theme } = props;
  const {id, owner, title, date, thumbnail_url, abstract, detail_url, launch_app_url} = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
            className={classes.cover}
            image={thumbnail_url}
            title={title}
          />  
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography type="body1" noWrap>{title}</Typography>
            
              <Typography type="body2" color="secondary">
              <span className={classes.username}>{owner} </span> | {new Date(date).toDateString()}
              </Typography>
              <Typography gutterBottom noWrap>{abstract}</Typography>            
          </CardContent>
          
          <CardContent className={classes.contentActions}>
            {
              launch_app_url &&   
              <IconButton className={classes.iconButton} aria-label="Delete" onClick={()=>window.location.href=launch_app_url}>
                <LaunchIcon /> <Typography type="body2" color="secondary" className={classes.actionsTyping}>Open</Typography>
              </IconButton>
            }  

            <IconButton className={classes.iconButton} aria-label="Delete" onClick={()=>window.location.href=detail_url}>
              <DetailsIcon /> <Typography type="body2" color="secondary" className={classes.actionsTyping}>Details</Typography>
            </IconButton>
            <SimpleSnackbar detail_url={detail_url} className={classes.iconButton}/>
          </CardContent>
          
        </div>

      </Card>
    </div>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
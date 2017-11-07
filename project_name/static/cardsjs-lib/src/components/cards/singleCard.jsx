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
import MoreHoriz from 'material-ui-icons/MoreHoriz'


const styles = theme => ({
  card: {
    display: 'flex',
    padding: '10 0 10 10',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap:'no-wrap'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: '1 0 50%',
    maxWidth: '50%'
  },
  detailsButton: {
    flex: '1 0 10%',
    margin: 'auto 0',
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
    flex: '1 0 25%',
    backgroundSize: 'cover',
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

        <CardContent className={classes.content}>
          <Typography type="body1" noWrap>{title}</Typography>
          <Typography type="body2" color="secondary">
            {new Date(date).toDateString()}
          </Typography>
        </CardContent>

        <IconButton
            /* onClick={} */
          color="contrast"
          className={classes.detailsButton}>
          <MoreHoriz/>
        </IconButton>
      </Card>

    </div>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
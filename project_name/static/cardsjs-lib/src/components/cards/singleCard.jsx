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
import {default as DetailsIcon} from 'material-ui-icons/FormatListbulleted';
import {default as CopyIcon} from 'material-ui-icons/ContentCopy';
// import {default as Details} from './detailsFullScreen.jsx';
import { default as DetailsPopover } from './detailsPopover.jsx';
import SimpleSnackbar from './copySnakeBar.jsx'



const styles = theme => ({
  card: {
    marginBottom: 10,
  },
  part1: {
    minHeight: 60,
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
    flex: '1 0 40%',
    maxWidth: '40%'
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
  info: {
    padding: 10,
    backgroundColor: 'lightgrey',
    
    display: 'flex',
    flexDirection: 'row',
  },
  Date: {
    flexGrow:1
  },
  Owner: {
    fontWeight:'Bolder'
  }
});

class MediaControlCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snakeBarOpen: false,
    };
  }

  handleCopyClick() {  
    this.setState({ snakeBarOpen: true });
  };

  onCardMediaClick() {
    if (this.props.pageType === 'documents') {
      window.open(`${this.props.detail_url}/download`)
    }
  }

  render(){
    const { classes, theme } = this.props;
    const {id, owner, title, date, thumbnail_url, abstract, detail_url, launch_app_url, pageType} = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <div className={classes.part1}>
            <CardMedia
              className={`${classes.cover} ${pageType === 'documents' && 'documentMedia'}`}
              image={thumbnail_url}
              title={title}
              onClick={() => {this.onCardMediaClick()}} 
              />  
    
            <CardContent className={classes.content}>
              <Typography type="body1" noWrap>{title}</Typography>
            </CardContent>
    
            <DetailsPopover
              launch_app_url={launch_app_url}
              detail_url = {detail_url}
              className={classes.detailsButton} 
              handleCopyClick={()=>{this.handleCopyClick()}}
            />
          </div>  
          
          <div className={classes.part2}>
            <div className={classes.info}>
              <Typography className={classes.Date} type="body2" color="secondary">
                {new Date(date).toDateString()}
              </Typography>
              <Typography className={classes.Owner} type="body2" color="secondary">
                {owner}
              </Typography>
            </div>
          </div>  
        </Card>
        <SimpleSnackbar open={this.state.snakeBarOpen} />
      </div>
    );
  } 
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
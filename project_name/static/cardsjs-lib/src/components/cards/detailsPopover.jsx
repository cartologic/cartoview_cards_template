import React from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';

import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import MoreHoriz from 'material-ui-icons/MoreHoriz'
import { default as DetailsIcon } from 'material-ui-icons/FormatListbulleted'
import { default as CopyIcon } from 'material-ui-icons/ContentCopy';
import copy from 'copy-to-clipboard'
import {default as LaunchIcon} from 'material-ui-icons/Launch';


const styles = theme => ({
  detailsButton: {
    margin: 'auto 0',
  },
  content: {
    width:'120',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 10',
  },
  copyButton: {
    width:'unset !important'
  }
});

class AnchorPlayground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
    };
  }

  handleClickButton() {
    this.setState({
      open: true,
      anchorEl: findDOMNode(this.button)
    });
    this.button = null;
  }

  handleRequestClose() {
    this.setState({open: false});
  }

  render() {
    const {classes, detail_url, launch_app_url} = this.props;
    return (
      <div className={classes.detailsButton}>
        <IconButton
          ref={node => {this.button = node;}}  
          onClick={()=>{this.handleClickButton()}}
          color="contrast"
          >
          <MoreHoriz/>
        </IconButton>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onRequestClose={()=>{this.handleRequestClose()}}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
          }}>
          <div className={classes.content}>
            {
              launch_app_url &&  
              <IconButton
                onClick={()=>window.location.href=launch_app_url}
                color="contrast"
                aria-label="Filters">
                <LaunchIcon />
                <Typography type="body2" color="secondary" className={classes.actionsTyping}>Open</Typography>
              </IconButton>
            }  
            <IconButton
              onClick={()=>window.location.href=detail_url}
              color="contrast"
              aria-label="Filters">
              <DetailsIcon />
              <Typography type="body2" color="secondary">Details</Typography>
            </IconButton>

            {/* Toggle snakebar */}
            <IconButton
              onClick={() => {
                copy(String(window.location.origin + this.props.detail_url));
                this.props.handleCopyClick()
              }}
              className={classes.copyButton}>
              <CopyIcon />
              <Typography type="body2" color="secondary" className={classes.actionsTyping}>Copy URL</Typography>
            </IconButton>
          </div>
        </Popover>
      </div>  
    )
  }
}

AnchorPlayground.propTypes = {
  classes: PropTypes.object.isRequired,
  launch_app_url: PropTypes.string,
  detail_url: PropTypes.string.isRequired,
};

export default withStyles(styles)(AnchorPlayground);
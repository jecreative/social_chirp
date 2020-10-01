import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

// Redux Stuff
import { connect } from 'react-redux';
import { getChirp, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
    marginTop: 60,
    padding: 0,
  },
  dialogContent: {
    marginTop: 60,
    padding: 0,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});

export class ChirpDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: '',
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, chirpId } = this.props;
    const newPath = `/users/${userHandle}/chirp/${chirpId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getChirp(this.props.chirpId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      chirp: {
        chirpId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={8}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7} className={classes.dialogContent}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton chirpId={chirpId} />
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeperator} />
        <CommentForm chirpId={chirpId} />
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand chirp"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.DialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ChirpDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getChirp: PropTypes.func.isRequired,
  chirpId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  chirp: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  chirp: state.data.chirp,
  UI: state.UI,
});

const mapActionsToProps = {
  getChirp,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ChirpDialog));

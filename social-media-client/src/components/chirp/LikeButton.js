import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { connect } from 'react-redux';
import { likeChirp, unlikeChirp } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedChirp = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.chirpId === this.props.chirpId)
    )
      return true;
    else return false;
  };
  likeChirp = () => {
    this.props.likeChirp(this.props.chirpId);
  };
  unlikeChirp = () => {
    this.props.unlikeChirp(this.props.chirpId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedChirp() ? (
      <MyButton tip="Undo like" onClick={this.unlikeChirp}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeChirp}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  chirpId: PropTypes.string.isRequired,
  likeChirp: PropTypes.func.isRequired,
  unlikeChirp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeChirp,
  unlikeChirp,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);

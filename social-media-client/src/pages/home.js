import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import Chirp from '../components/chirp/Chirp';
import Profile from '../components/profile/Profile';
import ChirpSkeleton from '../util/ChirpSkeleton';

import { connect } from 'react-redux';
import { getChirps } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getChirps();
  }
  render() {
    const { chirps, loading } = this.props.data;
    let recentChirpsMarkup = !loading ? (
      chirps.map((chirp) => <Chirp key={chirp.chirpId} chirp={chirp} />)
    ) : (
      <ChirpSkeleton />
    );
    return (
      <Grid container spacing={8}>
        <Grid item sm={8} xs={12}>
          {recentChirpsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getChirps: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getChirps })(home);

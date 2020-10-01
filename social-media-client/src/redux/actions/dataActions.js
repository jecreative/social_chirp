import {
  SET_CHIRPS,
  LOADING_DATA,
  LIKE_CHIRP,
  UNLIKE_CHIRP,
  DELETE_CHIRP,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_CHIRP,
  SET_CHIRP,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from '../types';
import axios from 'axios';

// Get all chirps
export const getChirps = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/chirps')
    .then((res) => {
      dispatch({
        type: SET_CHIRPS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_CHIRPS,
        payload: [],
      });
    });
};

// Get Single chirp
export const getChirp = (chirpId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/chirp/${chirpId}`)
    .then((res) => {
      dispatch({
        type: SET_CHIRP,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// Post a chirp
export const postChirp = (newChirp) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/chirp', newChirp)
    .then((res) => {
      dispatch({
        type: POST_CHIRP,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Like a chirp
export const likeChirp = (chirpId) => (dispatch) => {
  axios
    .get(`/chirp/${chirpId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_CHIRP,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Unlike a chirp
export const unlikeChirp = (chirpId) => (dispatch) => {
  axios
    .get(`/chirp/${chirpId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_CHIRP,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Submit a comment
export const submitComment = (chirpId, commentData) => (dispatch) => {
  axios
    .post(`/chirp/${chirpId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Delete a chirp
export const deleteChirp = (chirpId) => (dispatch) => {
  axios
    .delete(`/chirp/${chirpId}`)
    .then(() => {
      dispatch({ type: DELETE_CHIRP, payload: chirpId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_CHIRPS,
        payload: res.data.chirps,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_CHIRPS,
        payload: null,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

import {
  SET_CHIRPS,
  LIKE_CHIRP,
  UNLIKE_CHIRP,
  LOADING_DATA,
  DELETE_CHIRP,
  POST_CHIRP,
  SET_CHIRP,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  chirps: [],
  chirp: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_CHIRPS:
      return {
        ...state,
        chirps: action.payload,
        loading: false,
      };
    case SET_CHIRP:
      return {
        ...state,
        chirp: action.payload,
      };
    case LIKE_CHIRP:
    case UNLIKE_CHIRP:
      let index = state.chirps.findIndex(
        (chirp) => chirp.chirpId === action.payload.chirpId
      );
      state.chirps[index] = action.payload;
      if (state.chirp.chirpId === action.payload.chirpId) {
        state.chirp = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_CHIRP:
      let indexDel = state.chirps.findIndex(
        (chirp) => chirp.chirpId === action.payload
      );
      state.chirps.splice(indexDel, 1);
      return {
        ...state,
      };
    case POST_CHIRP:
      return {
        ...state,
        chirps: [action.payload, ...state.chirps],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        chirp: {
          ...state.chirp,
          comments: [action.payload, ...state.chirp.comments],
        },
      };
    default:
      return state;
  }
}

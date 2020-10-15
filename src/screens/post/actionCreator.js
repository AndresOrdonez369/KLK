import Actions from '../../redux/actionTypes';
    
export const submitPost = () => async (dispatch) => {
    await console.log('submit')
        .then(() => {
            return dispatch({
                type: Actions.UPDATE_POST_SUCCESS
            });
        })
        .catch((error) => {
            return dispatch({
                type: Actions.UPDATE_POST_ERROR
            });
        });
};

export const uploadImage = () => async (dispatch) => {
    await console.log('ima')
        .then(() => {
            return dispatch({
                type: Actions.UPDATE_PHOTO_SUCCESS
            });
        })
        .catch((error) => {
            return dispatch({
                type: Actions.UPDATE_PHOTO_ERROR
            });
        });
};

export const uploadVideo = () => async (dispatch) => {
    await console.log('video')
        .then(() => {
            return dispatch({
                type: Actions.UPDATE_VIDEO_SUCCESS
            });
        })
        .catch((error) => {
            return dispatch({
                type: Actions.UPDATE_VIDEO_ERROR
            });
        });
};

export const uploadAudio = () => async (dispatch) => {
    await console.log('audio')
        .then(() => {
            return dispatch({
                type: Actions.UPDA
            });
        })
        .catch((error) => {
            return dispatch({
                type: Actions
            });
        });
};

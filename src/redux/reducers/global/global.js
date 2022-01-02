const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";

const initialState = {
    loginStatus: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_LOGIN_STATUS: {
            let newState = { ...state };
            newState.loginStatus = action.val
            return { ...newState };
        }
        default:
            return state;
    }
}

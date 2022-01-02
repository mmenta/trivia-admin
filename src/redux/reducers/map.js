export const mapStateToProps = state => {
    // redux vars will be mapped to
    // this.props.app.[reducername].[reducerVariable]
    const app = state.global;
    return { app };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        setLoginStatus: (status) => dispatch(
            { type: 'SET_LOGIN_STATUS', val: status }
        ),
    }
};
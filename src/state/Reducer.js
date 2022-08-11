
export const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return ({
                userInfo: action.payload,
                userToken: state.userToken,
                logOut: state.logOut,
                mainDataLoad: state.mainDataLoad
            })
        case 'SET_LOGOUT':
            return ({
                userInfo: state.userInfo,
                userToken: state.userToken,
                logOut: action.payload,
                mainDataLoad: state.mainDataLoad
            })
        case 'SET_TOKEN':
            return({
                userInfo: state.userInfo,
                userToken: action.payload,
                logOut: state.logOut,
                mainDataLoad: state.mainDataLoad
            })
        case 'SET_DATA_LOAD':
            return ({
                userInfo: state.userInfo,
                userToken: state.userToken,
                logOut: state.logOut,
                mainDataLoad: action.payload
            })
        case 'RESET':
            return ({
                userInfo: {},
                userToken: '',
                logOut: false,
                mainDataLoad: false
            })

        default:
            return state
    }
}

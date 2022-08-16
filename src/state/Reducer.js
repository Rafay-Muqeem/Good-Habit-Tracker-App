
export const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return ({
                userInfo: action.payload,
                userToken: state.userToken,
                mobileMenu: state.mobileMenu,
                sessExp: state.mainDataLoad
            })
        case 'SET_MOBILE_MENU':
            return ({
                userInfo: state.userInfo,
                userToken: state.userToken,
                mobileMenu: action.payload,
                sessExp: state.mainDataLoad
            })
        case 'SET_TOKEN':
            return({
                userInfo: state.userInfo,
                userToken: action.payload,
                mobileMenu: state.mobileMenu,
                sessExp: state.mainDataLoad
            })
        case 'SET_SESSION_EXP':
            return ({
                userInfo: state.userInfo,
                userToken: state.userToken,
                mobileMenu: state.mobileMenu,
                sessExp: action.payload
            })
        case 'RESET':
            return ({
                userInfo: {},
                userToken: '',
                mobileMenu: false,
                sessExp: false
            })

        default:
            return state
    }
}

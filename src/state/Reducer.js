
export const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return ({
                userInfo: action.payload,
                userToken: state.userToken,
                mobileMenu: state.mobileMenu,
                mainDataLoad: state.mainDataLoad
            })
        case 'SET_MOBILE_MENU':
            return ({
                userInfo: state.userInfo,
                userToken: state.userToken,
                mobileMenu: action.payload,
                mainDataLoad: state.mainDataLoad
            })
        case 'SET_TOKEN':
            return({
                userInfo: state.userInfo,
                userToken: action.payload,
                mobileMenu: state.mobileMenu,
                mainDataLoad: state.mainDataLoad
            })
        case 'SET_DATA_LOAD':
            return ({
                userInfo: state.userInfo,
                userToken: state.userToken,
                mobileMenu: state.mobileMenu,
                mainDataLoad: action.payload
            })
        case 'RESET':
            return ({
                userInfo: {},
                userToken: '',
                mobileMenu: false,
                mainDataLoad: false
            })

        default:
            return state
    }
}

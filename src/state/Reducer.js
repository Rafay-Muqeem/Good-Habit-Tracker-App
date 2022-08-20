
export const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return ({
                ...state,
                userInfo: action.payload,
            })
        case 'SET_TOKEN':
            return ({
                ...state,
                userToken: action.payload
            })
        case 'SET_MOBILE_MENU':
            return ({
                ...state,
                mobileMenu: action.payload
            })
        case 'SET_SESSION_EXP':
            return ({
                ...state,
                sessExp: action.payload
            })
        case 'SET_DONE_ID':
            return ({
                ...state,
                doneId: action.payload
            })
        case 'SET_DONE_MESSAGE':
            return ({
                ...state,
                doneMessage: action.payload
            })
        case 'SET_DONE_UNDO':
            return ({
                ...state,
                doneUndo: action.payload
            })
        case 'SET_DONE_CALL':
            return ({
                ...state,
                doneCall: action.payload
            })
        case 'SET_REFRESH_DASHBOARD':
            return ({
                ...state,
                refreshDashboard: action.payload
            })
        case 'RESET':
            return ({
                userInfo: {},
                userToken: '',
                mobileMenu: false,
                sessExp: false,
                doneId: '',
                doneMessage: false,
                doneUndo: false,
                doneCall: false,
                refreshDashboard: false
            })

        default:
            return state
    }
}

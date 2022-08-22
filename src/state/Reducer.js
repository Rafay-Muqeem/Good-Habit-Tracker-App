
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
        case 'SET_DONE':
            return ({
                ...state,
                done: {
                    ...state.done,
                    ...action.payload
                }
            })
        case 'SET_DELETE':
            return ({
                ...state,
                delete: {
                    ...state.delete,
                    ...action.payload
                }
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
                done: {
                    id: '',
                    message: false
                },
                delete: {
                    id: '',
                    message: false
                },
                refreshDashboard: false
            })

        default:
            return state
    }
}

const initialState = {
    NewNotif: false,
    NbNewNotif: 0,
    NotifText:"",
    fill:"white",
    callNotif:false,
    callFill:"white",
};

export default function NotifReducer(state = initialState, action) {
    switch (action.type) {

        case 'SET_CALL_NOTIF_FILL':
            return {
                ...state,
                callFill: action.payload.callFill,
            }

        case 'SET_CALL_NOTIF':
            return {
                ...state,
                callNotif:action.payload.callNotif,
            }
        case 'RESET_CALL_NOTIF':
            return {
                ...state,
                callNotif:false,
                callFill:"white",
            }



        case 'SET_NOTIF':
            return {
                ...state,
                NewNotif: action.payload.NewNotif,
                NbNewNotif: action.payload.NbNewNotif,
                NotifText:action.payload.NotifText,
            }

        case 'SET_NOTIF_FILL':
            return {
                ...state,
                fill: action.payload.fill,
            }
        case 'RESET_NOTIF':
            return {
                ...state,
                NewNotif: false,
                NbNewNotif: 0,
                NotifText:"",
                fill:"white",
            }

        default:
            return state
    }
}



export const SET_NOTIF = ({ NewNotif,NbNewNotif,NotifText}) => {
    return {
        type: 'SET_NOTIF',
        payload: { NewNotif,NbNewNotif,NotifText},
    };
};

export const SET_NOTIF_FILL = ({ fill}) => {
    return {
        type: 'SET_NOTIF_FILL',
        payload: { fill},
    };
};

export const RESET_NOTIF = () => {
    return {
        type: 'RESET_NOTIF',
    };
};

export const RESET_CALL_NOTIF = () => {
    return {
        type: 'RESET_CALL_NOTIF',
    };
};

export const SET_CALL_NOTIF_FILL = ({ callFill}) => {
    return {
        type: 'SET_CALL_NOTIF_FILL',
        payload: { callFill},
    };
};


export const SET_CALL_NOTIF = ({ callNotif}) => {
    return {
        type: 'SET_CALL_NOTIF',
        payload: { callNotif},
    };
};

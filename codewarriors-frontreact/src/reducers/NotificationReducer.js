import {NEW_NOTIFICATION} from "../actions/notification/NotificationType";

const initialState = {
    notifications: [],
    notification: {
        content: "",
        isSeen: false
    },

};

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, action.data]
            };
        default:
            return state;
    }
};

export default notificationReducer;

const initialState = {
    ready: false,
    BasePos: {lat: 36.899264, lng: 10.189501},
    DriverPos: {lat: null, lng: null},
    PatientPos: {lat: null, lng: null},
    zoom: 16,
    error: null,
};

export default function HomeReducer(state = initialState, action) {
    switch (action.type) {
        case 'RESET_MAP':
            return {
                ...state,
                ready: false,
                error: null,
            }
        case 'READY_MAP':
            return {
                ...state,
                ready: true,
            }
        case 'GEO_SUCCESS_PATIENT':
            return {
                ...state,
                PatientPos: {lat: action.payload.latitude, lng: action.payload.longitude},
                error: null
            }
        case 'GEO_SUCCESS_DRIVER':
            return {
                ...state,
                DriverPos: {lat: action.payload.latitude, lng: action.payload.longitude},
                error: null
            }
        case 'GEO_FAILURE':
            return {
                ...state,
                ready:false,
                error: action.payload.error,
            }
        default:
            return state
    }
}

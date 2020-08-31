
export const GEO_SUCCESS_PATIENT = ({latitude,longitude}) => {
    return{
        type: 'GEO_SUCCESS_PATIENT',
        payload: {latitude,longitude},
    }
};
export const GEO_SUCCESS_DRIVER = ({latitude,longitude}) => {
    return{
        type: 'GEO_SUCCESS_DRIVER',
        payload: {latitude,longitude},
    }
};
export  const  GEO_FAILURE =({error})=>{
    return{
        type:'GEO_FAILURE',
        payload:{error},
    }
};
export  const  RESET_MAP =()=>{
    return{
        type:'RESET_MAP',
    }
};
export  const  READY_MAP =()=>{
    return{
        type:'READY_MAP',
    }
};

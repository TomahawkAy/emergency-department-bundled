
export  const  SET_TAB =({index})=>{
    console.log(index)
    return{
        type:'SET_TAB',
        payload:{index},
    }
};
export  const  SET_COORD =({latitude,longitude})=>{
    return{
        type:'SET_COORD',
        payload: {latitude,longitude},    }
};
export  const  SET_SEARCH_DATA =({searchData})=>{
    return{
        type:'SET_SEARCH_DATA',
        payload: {searchData},    }
};


export  const  RESET_TASK_ID_CHOOSED =()=>{
    return{
        type:'RESET_TASK_ID_CHOOSED',
    }
};
export  const  SET_TASK_ID_CHOOSED =({id})=>{
    return{
        type:'SET_TASK_ID_CHOOSED',
        payload:{id},
    }
};

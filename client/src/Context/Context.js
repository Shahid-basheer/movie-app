import { createContext,useReducer,useEffect } from "react";
import  Reducer  from "./Reducer";
import VideoReducer from "./VideoReducer";



const initial_state={
    user:JSON.parse(localStorage.getItem('user')) || null,
    user_fetching:false,
    user_error:false,
    video:localStorage.getItem('video') || null,
    video_fetching:false,
    video_error:false
}


const user_initial_state ={
    user:localStorage.getItem('user') || null,
    user_fetching:false,
    user_error:false
}

const video_initial_state={
    video:localStorage.getItem('video') || null,
    video_fetching:false,
    video_error:false
}

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    console.log(values)
}

allStorage()

export const Context = createContext(initial_state)

export  const ContextProvider = ({children})=>{
const [state,dispatch] = useReducer(Reducer,user_initial_state)
const [video,setVideo] = useReducer(VideoReducer,video_initial_state)

useEffect(()=>{
    localStorage.setItem('video',video.video)
    localStorage.setItem('user',state.user)
    console.log(state.user)
},[state.user,video.video])


return(
    <Context.Provider value ={{video:video.video,video_fetching:video.video_fetching, video_error: video.video_error,
        user:state.user,user_fetching:state.user_fetching,user_Error:state.user_error, setVideo, dispatch}}>{children}</Context.Provider>
)

}

const VideoReducer = (state,action) => {
    
    switch(action.type){
        case 'video_initial_state':
        return{
            video:null,
            video_fetching:true,
            video_error:false
        }
        case 'video_player_success':
        return{
            video:action.payload,
            video_fetching:false,
            video_error:false
        }
        case 'video_player_failure':
        return{
            video:null,
            video_fetching:false,
            video_error:true
        }
        default:
            return state
    }
 }
 
 export default VideoReducer
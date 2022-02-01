

const Reducer = (state,action) => {
    
   switch(action.type){
       case 'user_initial_state':
        return{
            user:null,
            user_fetching:true,
            user_error:false
        }
        case 'user_login_success':
        return{
            user:action.user,
            user_fetching:false,
            user_error:false
        }
        case 'user_login_failure':
        return{
            user:null,
            user_fetching:false,
            user_error:true
        }
        case 'user_logout':
        return{
            user:null,
            user_fetching:false,
            user_error:false
        }
       default:
           return state
   }
}

export default Reducer

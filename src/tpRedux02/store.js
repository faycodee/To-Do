import { createStore } from "redux";
import produce from "immer";
const initState={
    cpt:0,
    dbUsers:[
        {id:1,nom:"khaldi"},
        {id:2,nom:"Alami"},
        {id:3,nom:"Aloui"},
    ],
    dbRoles:[
            
        {numR:1,nomR:"Admin"},
        {numR:2,nomR:"User"}
    ]
}

const reducer=(state=initState,action)=>{
    switch(action.type){
        case "INCREMENTER": 
            // return {...state,cpt:state.cpt+1}
                return produce(state,draftState=>{draftState.cpt++});
        case "DELETE": 
                        return produce(state,x=>{
                            x.dbUsers.splice(action.pos,1)
                        })
        case 'ADD':
            return produce(state,x=>{
                        x.dbUsers.push(action.newUser)
            })
        case 'UPDATE' : 
            return produce(state,draftState=>{
                draftState.dbUsers.splice(action.pos,1,action.curUser)
            } )
        case "ASCNOM":
                return produce(state,draftState=>{
                    draftState.dbUsers.sort((a,b)=>{
                        return a.nom.localeCompare(b.nom)
                    })
                })
        case "DESCNOM":
            return produce(state,draftState=>{
                draftState.dbUsers.sort((a,b)=>{
                    return b.nom.localeCompare(a.nom)
                })
            })
        case "ASCID":
            return produce(state,draftState=>{
                draftState.dbUsers.sort((a,b)=>{
                    return a.id-b.id
                })
            })
    
        case "DESCID":
            return produce(state,draftState=>{
                draftState.dbUsers.sort((a,b)=>{
                    return b.id-a.id
                })
            })
        default: return state;
    }
}

const store=createStore(reducer);

export default store;

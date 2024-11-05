import { createStore } from "redux";

const initState={
    dbUsers:[
        {id:1,nom:"khaldi"},
        {id:2,nom:"Alami"},
        {id:3,nom:"Aloui"},
    ],
    dbRoles:[

    ]
}

const reducer=(state=initState,action)=>{
    switch (action.type) {
        case "ADD":
            let t=[...state.dbUsers,action.newUser];
            console.log('User ajouté avec succès');
            return {...state,dbUsers:t }
        case "DELETE":
            return window.confirm('Etes-vous sûr?')?{...state,dbUsers:[...state.dbUsers.filter(u=>u.id!==action.mat)]}:state;

        case "UPDATE":
            let t2=[...state.dbUsers];
            let pos=t2.findIndex(u=>u.id==action.curUser.id);
            t2[pos].nom=action.curUser.nom;  // patch
            // t2.splice(pos,1,action.curUser);
            return {...state,dbUsers:t2}
        
        default:
            return state;
    }
}

const store=createStore(reducer);

export default store;
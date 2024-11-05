import { useRef } from "react";
import { connect } from "react-redux";

function App({data,supprimer, ajouter, modifier}) {
    const txtId=useRef();
    const txtNom=useRef();
    const btn=useRef();
    const txtCh=useRef();
    const frm=useRef();
    const supHandler=(id)=>{
        supprimer(id);
        
    }
    const addHandler=()=>{
        let curUser={id:txtId.current.value,nom:txtNom.current.value};
        if(btn.current.value==="Ajouter")
                    ajouter(curUser);
        else{
                modifier(curUser);
                console.log("Modifier avec succès");
                
                txtId.current.readOnly=false;
                
        }
                frm.current.reset();
    }
    const chargerHandler=(pos)=>{
        txtId.current.value=data[pos].id;
        txtNom.current.value=data[pos].nom;
        btn.current.value="Modifier";
        txtId.current.readOnly=true;
    }
    return ( <div>
        <form ref={frm}>
            <fieldset>
                <legend>infos user:</legend>
                id : <input type="text" ref={txtId}/> | 
                Nom : <input type="text" ref={txtNom}/> | 
                 <input type="button" value="Ajouter" onClick={()=>addHandler()} ref={btn}/> | 
            </fieldset>
        </form>
        <form >
            <input type="search" ref={txtCh} />
        </form>
        <h1>Liste utilisateurs :</h1>
        <ul>
            {
                data.map((u,i)=>
                <li key={i}>
                        {u.id}, {u.nom}, 
                        <input type="button" onClick={()=>supHandler(u.id)} value="X" /> | 
                        <input type="button" onClick={()=>chargerHandler(i)}  value="S" /> 
                </li>
                )
            }
        </ul>
    </div> );
}

function mapStateToProps(state) {
    return {
        data:state.dbUsers
    }
}
function mapDispatchToProps(dispatch) {
    return{
    supprimer:(id)=>dispatch({type:"DELETE",mat:id}),
    ajouter:(u)=>dispatch({type:"ADD",newUser:u}),
    modifier:(u)=>dispatch({type:"UPDATE",curUser:u})
}
}

export default connect(mapStateToProps,mapDispatchToProps) (App);
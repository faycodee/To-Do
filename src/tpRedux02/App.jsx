import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
    const txtId=useRef();
    const txtNom=useRef();
    const btn=useRef();
    const btn1=useRef();
    const btn2=useRef();
    const frm=useRef();
    const txtPos=useRef();

    const compteur=useSelector(state=>state.cpt);
    const data=useSelector(state=>state.dbUsers);
    // const data2=useSelector(state=>state.dbRoles);
    const dispatch=useDispatch();
    const supHandler=(pos)=>{
        if(window.confirm("Etes-vous sûr?")){
            dispatch({type:"DELETE",pos:pos});
            console.log("User Supprimé avec succès");

        }
        
    }
    const addHandler=()=>{
        let newU ={id:txtId.current.value,nom:txtNom.current.value};
        if(btn.current.value==='Ajouter'){

            dispatch({type:'ADD',newUser:newU})
            console.log('User ajouté avec succès');
        }else{
            //modifier
            dispatch({
                type:"UPDATE",
                pos:txtPos.current.value, 
                curUser:newU 
            })
        }
            frm.current.reset();
        
    
    }
    const chargerHandler = (pos)=> {
        txtId.current.value=data[pos].id;
        txtNom.current.value=data[pos].nom;
        btn.current.value='Modifier';
        txtPos.current.value=pos;
    }
    const trierParNom=()=>{
        if(btn1.current.value==="Asc Nom"){
            dispatch({type:"ASCNOM"});
            btn1.current.value="Desc Nom";
        }else{
            dispatch({type:"DESCNOM"});
            btn1.current.value="Asc Nom";
        }
    }
    
    const trierParId=()=>{
        if(btn2.current.value==="Asc Id"){
            dispatch({type:"ASCID"});
            btn2.current.value="Desc Id";
        }else{
            dispatch({type:"DESCID"});
            btn2.current.value="Asc Id";
        }
    }
    return ( <>
        <div>
            <h1>Compteur : {compteur}</h1>
            <input type="button" value="+" onClick={()=>dispatch({type:"INCREMENTER"})} />
        </div>
        <div>
            <form ref={frm}>
            Id : <input type="text" ref={txtId} /> | 
            Nom : <input type="text" ref={txtNom} /> | 
            <input type="hidden" ref={txtPos} /> | 
            <input type="button" value="Ajouter" ref={btn} onClick={()=>addHandler()}/>
            <input type="button" value="Asc Nom" ref={btn1} onClick={()=>trierParNom()}/> | 
            <input type="button" value="Asc Id" ref={btn2} onClick={()=>trierParId()}/>


            </form>
            <h1>Liste des utilisateurs</h1>
            <ul>
                {
                    data.map((u,i)=>
                    <li key={i}>{u.id} | {u.nom} | 
                    <input type="button" onClick={()=>supHandler(i)} value="X" />
                    <input type="button" onClick={()=>chargerHandler(i)} value="charger" />


                    
                    
                    </li>
                    )
                }
            </ul>
        </div>
    
    </> );
}

export default App;
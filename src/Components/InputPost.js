import React,{Fragment,useState} from "react";

const InputPost = () =>{
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const onSubmitForm = async e =>{
        e.preventDefault();

        try{
            const body = {name,description};
                await fetch("http://localhost:3001/post/insert",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(body)
            }); 
          setName('')
          setDescription('') 
        }
        catch(err){
            console.log(err.message);
        }
    }
   return (
   
        <form className ="d-flex mt-5" onSubmit={onSubmitForm}> 
            <input type="text" placeholder = "Nombre" name = "txt_nombre" className="form-control" value={name} className="form-control" onChange={e => 
            setName(e.target.value)}/>
            &nbsp;
            <input type="text" placeholder = "Descripcion"  value={description} name = "txt_descripcion" className="form-control" onChange={e => 
            setDescription(e.target.value)}/>
            &nbsp;
            <button className="btn btn-success">Crear</button>
        </form>
       );
}

export default InputPost;
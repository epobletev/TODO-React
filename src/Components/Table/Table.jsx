import React, {Fragment, useEffect, useState} from "react";
import { TextField } from "@material-ui/core";
import { addPost, getAllPost, deletePost } from '../../Helper/Services';
import './Table.css'

export const Table  = () =>{

    const [post, setPost] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [findPost, setFindPost] = useState('');

    useEffect(()=>{
        getAllPost().then((response)=>{
            setPost(response);
        });
    },[]);
    
    const onSubmitForm = async e =>{
        e.preventDefault();
        try{
           
            
          addPost(name,description).then((response)=>{
            setPost([...post,response])
          }) 
          setName('');
          setDescription('') ;  
        }
        catch(err){
            console.log(err.message);
        }
    }

    const deletePostById = async (postId) =>{
        try{
            deletePost(postId).then((response)=>{
                const postDelete = [...post];
                const index = response.post_id;
                postDelete.splice(post.findIndex(pid =>{ return pid.post_id === index}), 1);
                setPost([...postDelete]);
            })
        }catch(err){console.log(err.message);}
        
    }

    const filterPost = post.filter( post =>{
        return post.nombre.toLowerCase().includes(findPost.toLowerCase());
    });

    let postList = filterPost.map( post => (
        <tr key={post.post_id}>
            <td>{post.nombre}</td>
            <td>{post.descripcion}</td>
            <td>
                { <button type="button" className="btn btn-danger" onClick={() => deletePostById(post.post_id)}> Eliminar
                </button>}
            </td>
        </tr>
    ));

 return(
     <Fragment>
         <div className="mt-5 ml-5 mr-5">
           <TextField id="input_busqsueda" label="Buscar" variant="outlined" value={findPost} onChange={e => 
           setFindPost(e.target.value)}></TextField>
         </div>
    <div className="mt-5 ml-5 mr-5">
      <div className="table-responsive">
        <table className="table text-center table-bordered table-hover">
               <thead class="thead-light">
               <tr>
                   <th>Nombre</th>
                   <th>Descripcion</th>
                   <th>Accion</th>
               </tr>
               </thead>
               <tbody>
               {postList}
               </tbody>
       </table>
      </div>
    </div>
        
       
    <form className ="d-flex mt-5 ml-5 mr-5" onSubmit={onSubmitForm}> 
            <input type="text" placeholder = "Nombre" className="form-control"  className="form-control" value={name} onChange={e => 
            setName(e.target.value)}/>
            &nbsp;
            <input type="text" placeholder = "Descripcion"  className="form-control" value={description} onChange={e => 
            setDescription(e.target.value)}/>
            &nbsp;
            <button className="btn btn-success">Crear</button>
    </form>
</Fragment>
 );
};
import React, {Fragment, useEffect, useState} from "react";
import { getAllPost } from "../Helper/Services";

const ListAllPost  = () =>{
    
    const [post,setPost] = useState([]);
    const [data,setData] = useState([]);
    const [findPost, setFindPost] = useState('');
    //obtiene todo los post en la BD
    // const getPost = async () =>{
    //     console.log("help");
    //     try{
    //         // const response = await fetch("http://localhost:3001/post/getAll");
    //         // const jsonData = await response.json()
    //         // setPost(jsonData);
    //         // setData(jsonData);
    //     }
    //     catch(err){
    //         console.error(err.message);
    //     }
    // };

    useEffect(() =>{
        getAllPost()
    },[]);


    // elimina el post seleccionado
    const deletePost = async (postId) =>{
        try{
            const deletePost = await fetch(`http://localhost:3001/post/delete/${postId}`,{
                method:"DELETE"
            });
            setPost(post.filter(post => post.post_id !== postId))
        }catch(err){
            console.error(err.message);
        }

    }
    const filterPost = (findName) =>{
     findName !== "" ? setPost(post.filter(post => post.nombre.toLowerCase().includes(findName.toLowerCase()))) : setPost(data);

    }
    return(<Fragment>
        <input className="mt-5" type="text" placeholder = "Buscar" value={findPost} onChange={e => 
           setFindPost(e.target.value)}/>
                &nbsp;
                <button className="btn btn-success" onClick={() => filterPost(findPost)} >Buscar</button>
       <table class="table mt-5 text-center">
               <thead>
               <tr>
                   <th>Nombre</th>
                   <th>Descripcion</th>
                   <th>Accion</th>
               </tr>
               </thead>
               <tbody>
               {post.map( post => (
                   <tr key={post.post_id}>
                       <td>{post.nombre}</td>
                       <td>{post.descripcion}</td>
                       <td>
                           <button className="btn btn-danger" onClick={() => deletePost(post.post_id)}> Eliminar
                           </button>
                       </td>
                   </tr>
               ))}
               </tbody>
       </table>
   </Fragment>);
}

export default ListAllPost;
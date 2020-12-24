const config = require('../Config/config.json');
const endpoint = config.endpoint;
const axios = require('axios');

export const getAllPost = async() =>{
    try{
       let { data } = await axios({
           method:"get",
           url: `${endpoint}/post/getAll`,
       });
       return data;
    }catch(err){
        console.log(err.message);;
    }
}

export const addPost = async(name,description)=>{
    try{
         const body = {name,description};
         const response = await fetch("http://localhost:3001/post/insert",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });
            const json = await response.json();
            return json;
            
    }
    catch(err){
        console.log(err.message);
    }
}

export const deletePost = async(postId) =>{
         const response = await fetch(`http://localhost:3001/post/delete/${postId}`,{
                method:"DELETE"
            })
         const json = await response.json();
         return json;
}
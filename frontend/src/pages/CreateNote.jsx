import api from "../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateNote(){
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getNotes();
    }, []);
     

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };


    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
                navigate("/")
            })
            .catch((err) => alert(err));
    };

    function NavHome(){
        navigate("/")
    }
    
    function Logout(){
        navigate("/logout")
    }

    return(
        
        <div>
        <nav className="flex justify-evenly bg-[#007bff] text-white "> 
            <h2 className="m-4 font-bold text-xl ">Create note</h2>
            <button className="m-4 px-3 p-2 font-bold hover:bg-[#007bff] text-white rounded-lg bg-[#0056b3] duration-500 hover:scale-105" onClick={Logout}> logout</button>
        </nav>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input className="rounded-md duration-500" type="submit" value="Submit"></input>
               
                <a href="" onClick={NavHome} className="my-4 underline">Go to task</a>
            </form>
            
        </div>
        
    )
}

export default CreateNote
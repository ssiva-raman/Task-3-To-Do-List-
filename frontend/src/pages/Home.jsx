import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"
import {useNavigate } from "react-router-dom";


function Home() {
    
    const [notes, setNotes] = useState([]);
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

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    function NavCreate(){
        navigate("/create")
    }
    function Logout(){
        navigate("/logout")
    }


    const NonEmty= notes.map((note) => (
        <Note note={note} onDelete={deleteNote} key={note.id} />
    ));

    const Emty= "Create New Note"
 

    return (
        <div>
        <nav className="flex justify-around bg-[#007bff] text-white"> 
            <button className="m-4 px-3 p-2 hover:bg-[#007bff] font-bold text-white rounded-lg bg-[#0056b3] duration-500 hover:scale-105" onClick={NavCreate}> Create</button>
            <h2 className="m-4 text-xl font-bold">Notes</h2>
            <button className="m-4 px-3 p-2 hover:bg-[#007bff] font-bold text-white rounded-lg bg-[#0056b3] duration-500 hover:scale-105" onClick={Logout}> Logout</button>
        </nav>
        <div className="flex flex-col m-2 h-auto w-auto text-lg ">
        { NonEmty.length==0 ?  Emty : NonEmty }
            
        </div>
        
        </div>
    );
}

export default Home;
import { API_URL } from "../config";
import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css"

const View = () => {
    const [user, setUser] = useState({});
    const {id} = useParams();
    useEffect(() =>{
        axios
        .get(`${API_URL}/api/get/${id}`)
        .then((resp) => setUser({...resp.data[0]}));
    }, [id]);
    return(
        <div style={{marginTop: "150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>User Contact Detail</p>
                </div>
                <div className="container">
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Name:</strong>
                    <span>{user.name}</span>
                    <br />
                    <br />
                    <strong>Email:</strong>
                    <span>{user.email}</span>
                    <br />
                    <br />
                    <strong>Contact:</strong>
                    <span>{user.contact}</span>
                    <br />
                    <br />
                    <Link to="/">
                       <div style={{ textAlign: "center", marginTop: "6px" }}>
                            <button className="btn btn-edit">Go Back</button>
                       </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View;
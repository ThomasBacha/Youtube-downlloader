import React, { useState } from "react";
import axios from "axios";

const Home: React.FC = () => {
    const [url, setUrl] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post("/api/download", { url });
            // you'll have to handle the response data
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={url} onChange={handleChange} placeholder="Paste YouTube URL here" />
                <button type="submit">Download</button>
            </form>
        </div>
    );
};

export default Home;

import React from "react";
import { useState } from "react";



const NewPoll: React.FC = () => {
    const [options, setOptions] = useState<string[]>([]);
    
    // Title, options inputs and create button
    return (
    <div className="create-poll">
        <input type="text" placeholder="Question/Title"/>
        <div>
            <input type="text" placeholder="Option" />
            <button>Add</button>
        </div>
        <button>Create</button>
    </div>
    );
}

export default NewPoll;
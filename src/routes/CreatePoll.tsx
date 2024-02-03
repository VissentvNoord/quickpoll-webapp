import React from "react";
import { useState } from "react";
import PollOption from "../components/PollOption";


const NewPoll: React.FC = () => {
    const [options, setOptions] = useState<string[]>([]);
    const [newOption, setNewOption] = useState<string>("");

    const newOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue : string = e.target.value;
        setNewOption(inputValue);
    }

    const addNewOption = () => {
        if(newOption == ""){
            console.log("New option can't be empty")
            return;
        }

        const newOptions = [...options, newOption];
        setOptions(newOptions);
    }

    // Title, options inputs and create button
    return (
    <div className="create-poll">
        <input type="text" placeholder="Question/Title"/>
        {
            options.map((option, index) => (
                <PollOption key={index} options={options} setOptions={setOptions} optionValue={option} index={index} />
            ))
        }
        <div>
            <input type="text" onChange={newOptionChange} placeholder="Option" />
            <button  onClick={addNewOption}>Add</button>
        </div>
        <button>Create</button>
    </div>
    );
}

export default NewPoll;
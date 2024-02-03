import React, { useEffect } from "react";
import { useState } from "react";
import PollOption from "../components/PollOption";
import createPollRequest from "../components/CreatePollRequest";

//To do: Redirect user to poll when creation is successful, if not give error message
const NewPoll: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [options, setOptions] = useState<string[]>([]);
    const [newOption, setNewOption] = useState<string>("");

    useEffect(() => {
        if (loading) {
            createPollRequest({ setLoading, setError, title, options });
        }

    }, [loading]);

    const newOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue: string = e.target.value;
        setNewOption(inputValue);
    }

    const addNewOption = () => {
        if (newOption == "") {
            console.log("New option can't be empty")
            return;
        }

        const newOptions = [...options, newOption];
        setOptions(newOptions);
        setNewOption("");
    }

    const onCreatePoll = () => {
        if (title == "")
            return;

        setLoading(true);
    }

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue: string = e.target.value;
        setTitle(inputValue);
    }

    if(loading){
        return(
            <div>
                Loading
            </div>
        )
    }

    return (
        <div className="create-poll">
            <input type="text" placeholder="Question/Title" onChange={onTitleChange} />
            {
                options.map((option, index) => (
                    <PollOption key={index} options={options} setOptions={setOptions} optionValue={option} index={index} />
                ))
            }
            <div>
                <input type="text" onChange={newOptionChange} placeholder="Type new option here" value={newOption} />
                <button onClick={addNewOption}>Add</button>
            </div>
            <button onClick={onCreatePoll}>Create</button>
        </div>
    );
}

export default NewPoll;
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import PollOption from "../components/CreatorPollOption";
import createPollRequest from "../requests/createPollRequest";
import '../styles/createpoll.css';
import { useNavigate } from "react-router-dom";

//To do: Redirect user to poll when creation is successful, if not give error message
const NewPoll: React.FC = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [options, setOptions] = useState<string[]>([]);
    const [newOption, setNewOption] = useState<string>("");

    useEffect(() => {

        async function onPollCreated() {
            try {
                const response = await createPollRequest({ setLoading, setError, title, options }).then(res => {
                    return res;
                })
                .catch((e) => {
                    console.error(e);
                });

                console.log(response);
                if(response.id){
                    navigate("/" + response.id);
                }
            } catch (e) {
                console.error("Error: ", e);
            }
        }

        if (loading) {
            onPollCreated();
        }

        if (newOption !== "") {
            addNewOption();
        }

    }, [loading, newOption]);

    const newOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue: string = e.target.value;

        console.log(inputValue)
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

    if (loading) {
        return (
            <div>
                Loading
            </div>
        )
    }

    return (
        <div className="form-grid create-poll">
            <p>Question/Title</p>
            <input type="text" placeholder="Question/Title" onChange={onTitleChange} />

            <p>Responses</p>
            {
                options.map((option, index) => (
                    <PollOption
                        key={index}
                        options={options}
                        setOptions={setOptions}
                        optionValue={option}
                        index={index}
                    />
                ))
            }

            <input type="text" onInput={newOptionChange} placeholder="Type new response here" value={newOption} />
            <button onClick={onCreatePoll}>Create</button>
        </div>
    );
}

export default NewPoll;
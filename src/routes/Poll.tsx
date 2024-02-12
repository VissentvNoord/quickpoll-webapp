import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserPollOption from "../components/UserPollOption";
import useFetchPollData from "../requests/fetchPollRequest";
import SubmitOption from "../requests/submitPollRequest";

const Poll: React.FC = () => {
    const [socket, setSocket] = useState<WebSocket>();
    const { id } = useParams<{ id?: string }>();
    const [selectedOption, setSelectedOption] = useState<number>(-1);

    if (socket) {
        socket.onopen = () => {
            console.log("Websocket connected");

            const data = 42;
            socket.send(data.toString());
        }

        socket.onmessage = (event) => {
            console.log("Received message:", event.data);
        }

        socket.onclose = () => {
            console.log("Websocket disconnected");
        }
    }

    useEffect(() => {
        const newSocket = new WebSocket("ws:/localhost:8080/ws");
        setSocket(newSocket);
    }, []);

    const { loading, error, data } = useFetchPollData(id || '');

    if (error) {
        return <div>Poll not found</div>
    }

    if (loading) {
        return <div>Loading...</div>
    }

    console.log(data);
    const options = data.options;

    const submitOption = () => {
        SubmitOption(id || '', selectedOption);
    }

    return (
        <div className="poll">
            <h1>{data.title}</h1>
            <div>
                {Array.isArray(options) && options.map((option, index) => (
                    <UserPollOption key={index} descr={option.descr} id={index} selected={selectedOption} setSelected={setSelectedOption} />
                ))}
                <button onClick={submitOption}>Submit</button>
            </div>
        </div>
    );
}

export default Poll;
import { useState } from "react";
import API_URL from "../config";

interface CreatePollProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    options: string[];
}

const createPollRequest = async ({ setLoading, setError, title, options }: CreatePollProps) => {
    const data = {
        title,
        options
    };

    try {
        const response = await fetch(`${API_URL}/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        console.log("Response Data:", responseData); // Log response data here
        setLoading(false);
        return responseData; // Return the response data
    } catch (error) {
        setError(true);
        console.error("Error:", error);
        setLoading(false);
        throw error; // Re-throw the error to propagate it further
    }
};


export default createPollRequest;
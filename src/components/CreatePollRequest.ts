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
        fetch(`${API_URL}/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(responseData => {
            console.log(responseData);
        })
    } catch (e) {
        setError(true);

        console.error(e);
    }

    setLoading(false);
}

export default createPollRequest;
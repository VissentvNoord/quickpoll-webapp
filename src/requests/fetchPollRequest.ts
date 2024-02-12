import { useState, useEffect } from 'react';
import API_URL from '../config';

interface PollData{
    loading: boolean;
    error: string;
    data: any;
}

function useFetchPollData(id: string): PollData {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState(null);

    const fetchDataFromApi = async () => {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataFromApi();
    }, [id]);

    return { loading, error, data };
}

export default useFetchPollData;


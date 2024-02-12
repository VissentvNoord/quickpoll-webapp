import { useState, useEffect } from 'react';
import API_URL from '../config';


async function SubmitOption(id: string, option: number) {
    const submisson = {
        submission: option
    }

    try {
        const response = await fetch(`${API_URL}/${id}/submit`,
            {
                method: 'POST',
                body: JSON.stringify(submisson)
            });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
    } catch (error: any) {
        console.log(error.message);
    } finally {
    }
}

export default SubmitOption;

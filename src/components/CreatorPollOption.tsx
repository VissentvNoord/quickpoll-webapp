import { useEffect, useRef } from "react";

interface PollOptionProps {
    options: string[];
    setOptions: React.Dispatch<React.SetStateAction<string[]>>;
    optionValue: string;
    index: number;
}

const PollOption: React.FC<PollOptionProps> = ({ options, setOptions, optionValue, index }) => {
    const inputElementRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(index === options.length -1){
            inputElementRef.current?.focus();
        }
        
    }, [index, options.length]);

    const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const inputValue: string = e.target.value;

        const updatedOptions = [...options];
        updatedOptions[index] = inputValue;
        setOptions(updatedOptions);
    }

    const onOptionUnfocus = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const inputValue: string = e.target.value;

        if (inputValue == "") {
            removeOption();
        }
    }

    const removeOption = () => {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
    }


    return (
        <>
            <input ref={inputElementRef} type="text" value={optionValue} key={index} onBlur={(e) => onOptionUnfocus(e, index)} onChange={(e) => onOptionChange(e, index)} />
        </>
    )
}

export default PollOption;
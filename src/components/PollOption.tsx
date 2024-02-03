
interface PollOptionProps{
    options: string[];
    setOptions: React.Dispatch<React.SetStateAction<string[]>>; 
    optionValue: string;
    index: number;
}

const PollOption: React.FC<PollOptionProps> = ({ options, setOptions, optionValue, index }) => {
      const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const inputValue : string = e.target.value;
        
        const updatedOptions = [...options];
        updatedOptions[index] = inputValue;
        setOptions(updatedOptions);
    }

    const onOptionLeave = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const inputValue : string = e.target.value;
        
        if(inputValue == ""){
            const updatedOptions = options.filter((_, i) => i !== index);
            setOptions(updatedOptions);
        }
    } 


    return (
        <div>
            <input type="text" value={optionValue} key={index} onBlur={(e) => onOptionLeave(e, index)} onChange={(e) => onOptionChange(e, index)} />
        </div>
    )
}

export default PollOption;
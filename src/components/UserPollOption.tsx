import React from "react";

interface PollOptionProps{
    descr: string;
    id: number;
    selected: number;
    setSelected: React.Dispatch<React.SetStateAction<number>>; 
}

const UserPollOption: React.FC<PollOptionProps> = ({ descr, id, selected, setSelected }) => {
    

    const handleOptionClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        if(selected == id){
            setSelected(-1);
        }else{
            setSelected(index);
        }
    }

    return(
        <div>
            <h3 onClick={(e) => handleOptionClick(e, id) }>{descr}</h3>
            { id == selected ? "Selected" : null }
        </div>
    );
}

export default UserPollOption;
import React, {useState} from 'react';
import './Cell.css';

interface CellProps {
    id: number;
    value: string;
    display: string;
    onChange: (cellId: number, updatedValue: string) => void;
}

function Cell(props: CellProps) {
    let [selected, setSelected] = useState(false);
    let [value, setValue] = useState(props.value);


    return (
        <div key={props.id} className="cell">
            <input type="text"
                   value={selected ? value : props.display}
                   onFocus={() => setSelected(true)}
                   onBlur={() => {
                       setSelected(false)
                       if (value !== props.value)
                           props.onChange(props.id, value);
                   }}
                   onChange={(event) => {
                       setValue(event.target.value)
                   }}/>
        </div>
    );
}

export default Cell
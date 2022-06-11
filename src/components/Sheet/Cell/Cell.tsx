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

    return (
        <div key={props.id} className="cell">
            <input type="text"
                   value={selected ? props.value : props.display}
                   onFocus={() => setSelected(true)}
                   onBlur={() => setSelected(false)}
                   onChange={(event) => {
                       console.log("cell handle: ", event.target.value)
                       props.onChange(props.id, event.target.value)
                   }}/>
        </div>
    );
}

export default Cell
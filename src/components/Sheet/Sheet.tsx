import React, {useCallback, useMemo, useState} from 'react';
import './Sheet.css'
import Cell from "./Cell/Cell";
import {evaluateSheet} from "../../domain/SheetLang/Evaluator";

function Sheet() {
    const numRows = 12;
    const numColumns = 6;

    const [cellInputs, setCellInputs] = useState<string[]>(createInitialCellValues(numRows, numColumns));
    const [cellOutputs, setCellOutputs] = useState<string[]>(createInitialCellValues(numRows, numColumns));
    const [cellLookup] = useState(createCellLookup(numRows, numColumns))

    const handleCellValueChanged = useCallback((id: number, updatedInput: string) => {
        const updatedInputs = cellInputs.map((input, index) => {
            return index === id ? updatedInput : input
        })
        setCellInputs(updatedInputs);

        let updatedCellOutputs = evaluateSheet(updatedInputs, cellLookup);
        setCellOutputs(updatedCellOutputs);
    }, [cellInputs, cellLookup])



    const cells = useMemo(() => {
        return cellInputs.map((value, index) => {
            return <Cell key={index}
                         id={index}
                         value={value}
                         display={cellOutputs[index]}
                         onChange={handleCellValueChanged}/>
        })
    }, [cellInputs, cellOutputs, handleCellValueChanged]);

    return (
        <div className="sheet" style={{width: `${numColumns * 105}px`}}>
            {cells}
        </div>
    );
}

function createInitialCellValues(numRows: number, numColumns: number): string[] {
    const totalCells = numRows * numColumns;

    let cellValues: string[] = [];

    for (let i = 0; i < totalCells; i++) {
        cellValues[i] = "";
    }

    return cellValues;
}

function createCellLookup(numRows: number, numColumns: number): Map<string, number> {
    const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    const map: Map<string, number> = new Map<string, number>()

    let index = 0;
    for (let column = 0; column < numColumns; column++) {
        for (let row = 0; row < numRows; row++) {
            map.set(`${alphabet[column]}${row}`, index++);
        }
    }

    return map;
}

export default Sheet
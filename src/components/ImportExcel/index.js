import { useState } from "react";
import { Box, Button } from '@mui/material';
import * as XLSX from 'xlsx';
import DataTable from "../DataTableComponent";
function ImportExcel() {
    const [data, setData] = useState([]);
    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, {type: 'buffer'});

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws)

                resolve(data)
            };
            fileReader.onerror = ((error) => {
                reject(error);
            })
        });
        promise.then((data) => {
            setData(data)
        })
    }

    return(
        <Box m={2}>
            <Button
                variant="contained"
                component="label"
                style={{ marginBottom: "30px" }}
            >
                Upload File
                <input
                    type="file"
                    hidden
                    onChange={(e) => {
                        const file = e.target.files[0];
                        readExcel(file);
                    }}
                />
            </Button>
            <DataTable data={data} />
        </Box>
    )
}
export default ImportExcel;
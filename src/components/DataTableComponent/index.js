import React from "react";
import DataTable from 'react-data-table-component';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';

function DataTableComponent(props) {
    const { data } = props;

    const FilterComponent = ({ filterText, onFilter, onClear }) => (
        <>
            <TextField
                label="Search..."
                id="outlined-start-adornment"
                sx={{ m: 1, width: '25ch' }}
                value={filterText}
                onChange={onFilter}
                InputProps={{
                    endAdornment: <InputAdornment position="end"><ClearIcon onClick={onClear}/></InputAdornment>,
                }}
            />
        </>
    );

    const columns = [
        {
            name: 'FİRMA',
            selector: row => row.FİRMA,
        },
        {
            name: 'İŞE GİRİŞ TARİHİ',
            selector: row => row['İŞE GİRİŞ TARİHİ'],
            sortable: true,
        },
        {
            name: 'Sigortada Bildirilen Görevi',
            selector: row => row['Sigortada Bildirilen Görevi'],
        },
        {
            name: 'PLAN DURUMU',
            selector: row => row['PLAN DURUMU'],
        },
        {
            name: 'UYUMLULUK/GEÇERLİLİK',
            selector: row => row['UYUMLULUK/GEÇERLİLİK'],
        },
        {
            name: 'BELGE ADI',
            selector: row => row['BELGE ADI'],
        },
        {
            name: 'ALINDIĞI KURUM',
            selector: row => row['ALINDIĞI KURUM'],
        },
        {
            name: 'BELGE TARİHİ BAŞLANGIÇ',
            selector: row => row['BELGE TARİHİ BAŞLANGIÇ'],
            sortable: true,
        },
        {
            name: 'BELGE BİTİŞ TARİHİ',
            selector: row => row['BELGE BİTİŞ TARİHİ'],
            sortable: true,
        },
        {
            name: 'BELGE NO',
            selector: row => row['BELGE NO'],
        },
        {
            name: 'KALAN SÜRE',
            selector: row => row['KALAN SÜRE'],
            sortable: true,
        },
    ]
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = data.filter(
        item => (item['ALINDIĞI KURUM'] || item['Sigortada Bildirilen Görevi'] || item['FİRMA'] || item['BELGE ADI']) && (item['ALINDIĞI KURUM'] || item['Sigortada Bildirilen Görevi'] || item['FİRMA'] || item['BELGE ADI']).toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    return(
        <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            persistTableHead
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
        />
    )
}
export default DataTableComponent;
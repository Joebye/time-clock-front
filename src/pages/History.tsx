import { Box, Button } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSelectorDataByCurUser } from "../hooks/hooks";
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import { useSelectorUser } from "../redux/store";

const History: React.FC = () => {

const curUserRedux = useSelectorUser();
const curUserTz = curUserRedux.teudatZeut;
const rows = useSelectorDataByCurUser() as any;
    
   const handleProcessRowUpdate = (updRow: any) => {
   const savedData = JSON.parse(localStorage.getItem(curUserTz)!);
   savedData.forEach((el:any, ind: any) => {
      if (el.id == updRow.id) {
         savedData[ind] = updRow;
      }
     })
    localStorage.setItem(curUserTz, JSON.stringify(savedData))
   }
   

    const columnsCommon: GridColDef[] = [
        
        {
            field: "index", headerName: 'Order', flex: 0.2, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center', 
            renderCell: (params) => {
                const rowInd = params.api.getRowIndexRelativeToVisibleRows(params.id);
                return rowInd+1;
            }
        },
        {
            field: "date", headerName: 'Date', flex: 0.3, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: "teudatZeut", headerName: 'ID', flex: 0.3, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: "entry", headerName: 'Entry', flex: 0.5, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: "startBreak", headerName: 'Start Break', flex: 0.5, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: "endBreak", headerName: 'End Break', flex: 0.5, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: "exit", headerName: 'Exit', flex: 0.5, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: "notes", headerName: 'Notes', flex: 0.5, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center', editable: true
        },

        
    ]

     function handleClickFn() {
        const doc = new jsPDF();
        const savedDataInLs = JSON.parse(localStorage.getItem(curUserTz)!);
        const rowsWithIndex = savedDataInLs.map((row:any, index:any) => ({
            ...row,
            index: index + 1,
        }));
        autoTable(doc, {
            head: [columnsCommon.map((col: any) => col.headerName)],
            body: rowsWithIndex.map((row: any) => columnsCommon.map(col => row[col.field]))

        })
        doc.save('table.pdf')
        }


    return <Box sx={{ margin: '15px' }}>
        <Box sx={{marginBottom: '10px'}}>
        <Button variant="contained" onClick={() => handleClickFn()}>Extract PDF</Button>
        </Box>
    <DataGrid 
    columns={columnsCommon} rows={rows}
    processRowUpdate={handleProcessRowUpdate}
    editMode="row"
    />
     
    </Box>
   
}

export default History;
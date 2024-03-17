import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useToast} from "../../../components/Toast/ToastContex";
import { useNavigate } from 'react-router-dom';
import {getLanguages} from '../../../apiService/LanguageService';

function LanguagesList(){
    const [standBy, setStandBy] = useState(false);
    const { pushToast } = useToast();
    const [warehouse, setWarehouse] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        sendRequest();
    }, []);

    const { t } = useTranslation();

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'abbreviation',
            headerName: t("languages.abbreviation"),
            width: 250,
            editable: false,
        },
    ];

    async function sendRequest() {
        setStandBy(true);
        try {
            const warehousesResponse = await getLanguages(pushToast);
            setWarehouse(warehousesResponse.data);
            setRowCount(warehousesResponse.total)
            setStandBy(false);
        } catch (error) {
            setStandBy(false);
        }
    }

    return(
        <main>
            <div className="m-auto content max-w-screen-xl">
                <h2 className="text-center mb-8">{t('languages.title')}</h2>
                <button
                    type="button"
                    onClick={() => {
                        navigate(`/back/languages/add`)
                    }}
                    style={{ backgroundColor: "#6AAF5C" }}
                    className={`block mb-2 text-white cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
                    {t('languages.addBtn')}
                </button>
                <Box sx={{height: "500px", width: 'auto'}}>
                    <DataGrid
                        rows={warehouse}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        rowCount={rowCount}
                        checkboxSelection={false}
                        paginationMode="server"
                        sortingMode="server"
                        disableRowSelectionOnClick
                        pageSizeOptions={[5, 10, 25]}
                        filterMode="server"
                        loading={standBy}
                        onRowClick={(params) => {
                            navigate(`/back/languages/${params.row.abbreviation}`)
                        }}
                    />
                </Box>
            </div>
        </main>
    )
}

export default LanguagesList
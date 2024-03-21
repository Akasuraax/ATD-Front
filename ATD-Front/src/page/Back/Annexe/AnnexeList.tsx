import Box from '@mui/material/Box';
import {DataGrid, GridColDef } from '@mui/x-data-grid';
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useToast} from "../../../components/Toast/ToastContex";
import { useNavigate } from 'react-router-dom';
import {getAnnexes} from '../../../apiService/AnnexeService';

function AnnexeList(){
    const [standBy, setStandBy] = useState(false);
    const { pushToast } = useToast();
    const [annexe, setAnnexe] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const navigate = useNavigate();

    const [dataGrid, setDataGrid] = useState({});

    useEffect(() => {
        sendRequest();
    }, [dataGrid]);

    const { t } = useTranslation();

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: t("annexes.name"),
            width: 250,
            editable: false,
        },
        {
            field: 'address',
            headerName: t("annexes.address"),
            width: 250,
            editable: false,
        },
        {
            field: 'zipcode',
            headerName: t("annexes.zipcode"),
            width: 175,
            editable: false,
        },
        {
            field: 'archive',
            headerName: t("annexes.isArchived"),
            width: 150,
            editable: false,
            renderCell: (params) => renderArchiveCell(params.value),
        },
    ];
    const renderArchiveCell = (archived: boolean) => {
        if (archived) return <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">archivé</span>
        else return <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">actif</span>

    };

    // page change
    const handlePageChange = async (params) => {
        setDataGrid((prevModel) => ({
            ...prevModel,
            page: params.page,
            pageSize:params.pageSize
        }))
    };

    const onSortModelChange = async (params) => {
        if(params.length !== 0) {
            setDataGrid((prevModel) => ({
                ...prevModel,
                fieldSort: params[0].field,
                sort:params[0].sort
            }))
        } else {
            setDataGrid((prevModel) => ({
                ...prevModel,
                fieldSort:'id',
                sort: 'asc'
            }))
        }
    }

    const onFilterChange = async (params) => {
        setDataGrid((prevModel) => ({
            ...prevModel,
            fieldFilter:params.items[0].field,
            operator: params.items[0].operator,
            value: params.items[0].value
        }))
    }

    async function sendRequest() {
        setStandBy(true);
        try {
            const typesResponse = await getAnnexes(dataGrid, pushToast);
            setAnnexe(typesResponse.data);
            setRowCount(typesResponse.total)
            setStandBy(false);
        } catch (error) {
            setStandBy(false);
        }
    }

    return(
        <main>
            <div className="m-auto content max-w-screen-xl">
                <h2 className="text-center mb-8">{t('annexes.title')}</h2>
                <button
                    type="button"
                    onClick={() => {
                        navigate(`/back/annexes/add`)
                    }}
                    style={{ backgroundColor: "#6AAF5C" }}
                    className={`block mb-2 text-white cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
                    {t('annexes.addBtn')}
                </button>
                <Box sx={{height: "500px", width: 'auto'}}>
                    <DataGrid
                        rows={annexe}
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
                        onPaginationModelChange={handlePageChange}
                        onSortModelChange={onSortModelChange}
                        filterMode="server"
                        onFilterModelChange={onFilterChange}
                        loading={standBy}
                        onRowClick={(params) => {
                            navigate(`/back/annexes/${params.row.id}`)
                        }}
                    />
                </Box>
            </div>
        </main>
    )
}

export default AnnexeList
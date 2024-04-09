import {useEffect, useState} from "react";
import {useToast} from "../../../components/Toast/ToastContex";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {getDemands} from "../../../apiService/DemandService";
import Box from "@mui/material/Box";

export default function DemandsList(){
    const [standBy, setStandBy] = useState(false);
    const { pushToast } = useToast();
    const [pieces, setPieces] = useState([]);
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
            field: 'type',
            headerName: t("demands.type_name"),
            width: 250,
            editable: false,
            valueGetter: (params) => params.row.type.name,
        },
        {
            field: 'user',
            headerName: t("demands.user_email"),
            width: 250,
            editable: false,
            valueGetter: (params) => params.row.user.email,
        },
        {
            field: 'status',
            headerName: t("demands.status"),
            width: 250,
            editable: false,
        },
        {
            field: 'archive',
            headerName: t("demands.isArchived"),
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
            const response = await getDemands(dataGrid, pushToast);
            setPieces(response.data);
            setRowCount(response.total)
            setStandBy(false);
        } catch (error) {
            setStandBy(false);
        }
    }

    return(
        <main className="display-list">
            <div className="m-auto content max-w-screen-xl">
                <h2 className="text-center mb-8">{t('demands.title')}</h2>
                <Box sx={{height: "500px", width: 'auto'}}>
                    <DataGrid
                        rows={pieces}
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
                            navigate(`/back/demands/${params.row.id}`)
                        }}
                    />
                </Box>
            </div>
        </main>
    )
}
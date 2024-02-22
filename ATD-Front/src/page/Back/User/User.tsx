import './user.css'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {getUsers} from "../../../apiService/UserService";
import {useToast} from "../../../components/Toast/ToastContex";
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import IconButton from '@mui/material/IconButton';



function User(){
    const [standBy, setStandBy] = useState(false);
    const { pushToast } = useToast();
    const [users, setUsers] = useState([]);
    const [dataGrid, setDataGrid] = useState({
        page: 0,
        pageSize: 10,
        rowCount:0,
        fieldSort:'id',
        sort:'desc',
        fieldFilter:'',
        operator: '',
        value: '*'
    });



    const { t } = useTranslation();
    const title = t("user.title");
    const isArchived = t("user.isArchived");
    const informations = t("user.informations");
    const action = t("user.action");
    const downloadData = t("user.downloadData");
    const partner = t("user.partner");
    const beneficiary = t("user.beneficiary");
    const volunteer = t("user.volunteer");
    const waitingValidation = t("user.waitingValidation");

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
            field: 'name',
            headerName: t("user.name"),
            width: 150,
            editable: false,
        },
        {
            field: 'forname',
            headerName: t("user.lastName"),
            width: 150,
            editable: false,
        },
        {
            field: 'email',
            headerName: t("user.email"),
            width: 280,
            editable: false,
        },
        {
            field: 'roles',
            headerName:"roles",
            width: 150,
            editable: false,
            sortable: false,
            renderCell: (params) => {
            return (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        {params.row.roles[0].name}
                    </span>
                );
            },
        },
        {
            field: 'status',
            headerName: t("user.waitingValidation"),
            width: 120,
            editable: false,
            renderCell: (params) => renderStatusCell(params.value),

        },
        {
            field: 'archive',
            headerName: t("user.isArchived"),
            width: 120,
            editable: false,
            renderCell: (params) => renderArchiveCell(params.value),
        },
        {
            field: 'action',
            headerName: '',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <div>
                    <IconButton aria-label="delete"
                                onClick={() => {console.log('infos ' + params.row.id)}} >
                        <InfoIcon/>
                    </IconButton>
                    <IconButton aria-label="delete"
                                style={{ color: '#F85866' }}
                                onClick={() => {console.log('deleted ' + params.row.id)}} >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="delete"

                                onClick={() => {console.log('download ' + params.row.id)}} >
                        <DownloadForOfflineIcon/>
                    </IconButton>
                </div>
            ),
        },
    ];

    const renderStatusCell = (status: number) => {
        switch (status) {
            case 0: return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">en attente</span>;
            case 1: return <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">validé</span>;
            case 2: return <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">refusé</span>
        }
    };
    const renderArchiveCell = (archived: boolean) => {
        if (archived) return <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">archivé</span>
        else return <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">active</span>

    };

    useEffect(() => {
        sendRequest();
    }, [dataGrid]);

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
            const usersResponse = await getUsers(dataGrid, pushToast);
            setUsers(usersResponse.data);
            setStandBy(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs.', error);
            setStandBy(false);
        }
    }


    return(
        <main>
            <div className="m-auto content">
                <Box sx={{height: "auto", width: '100%'}}>
                    <DataGrid
                        rows={users}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        rowCount={31}
                        checkboxSelection={false}
                        paginationMode="server"
                        sortingMode="server"
                        disableRowSelectionOnClick
                        pageSizeOptions={[5, 10, 25]}
                        onPaginationModelChange={handlePageChange}
                        onSortModelChange={onSortModelChange}
                        filterMode="server"
                        onFilterModelChange={onFilterChange}
                    />
                </Box>
            </div>
        </main>
)
}

export default User;
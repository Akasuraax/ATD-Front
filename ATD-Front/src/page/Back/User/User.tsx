import './user.css'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {getUsers} from "../../../apiService/UserService";
import {useToast} from "../../../components/Toast/ToastContex";
import {IUser} from "../../../interfaces/user"




function User(){


    const [standBy, setStandBy] = useState(false);
    const { pushToast } = useToast();
    const [users, setUsers] = useState([]);
    const [dataGrid, setDataGrid] = useState({
        page: 0,
        pageSize: 5,
        rowCount:0,
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

    const userActions = [
        { label: {informations}, onClick: (item) => console.log('J\'accepte', item) },
        { label: {action}, onClick: (item) => console.log('J\'accepte', item) },
        { label: {downloadData}, onClick: (item) => console.log('J\'accepte', item) },
    ];

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: t("user.name"),
            width: 250,
            editable: true,
        },
        {
            field: 'forname',
            headerName: t("user.lastName"),
            width: 250,
            editable: true,
        },
        {
            field: 'email',
            headerName: t("user.email"),
            width: 300,
            editable: true,
        },
        {
            field: 'status',
            headerName: t("user.waitingValidation"),
            width: 150,
            editable: true,
        },
        {
            field: 'archive',
            headerName: t("user.isArchived"),
            width: 150,
        }
    ];


    useEffect(() => {
        setStandBy(true)
        const fetchData = async () => {
            const params = {
                page: 0,
                perPage: 10,
            };
            const res = await getUsers(params,pushToast);
            setDataGrid((prevModel) => ({
                ...prevModel,
                rowCount: res.total,
            }));
            if(users !== null) {
                setUsers(res.data);
                setStandBy(false)
            }
        };

        fetchData();
    }, []);

    const handlePageChange = async (params) => {
        console.log(params)
        try {
            const usersResponse = await getUsers(params, pushToast);
            console.log(users)
                setUsers(usersResponse.data);
                setStandBy(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs.', error);
            setStandBy(false);
        }
    };


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
                        rowCount={dataGrid.rowCount}
                        checkboxSelection
                        paginationMode="server"
                        disableRowSelectionOnClick
                        onPaginationModelChange={handlePageChange}
                    />
                </Box>
            </div>
        </main>
)
}

export default User;
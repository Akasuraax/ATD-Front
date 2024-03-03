import './vehicle.css'
import {useTranslation} from "react-i18next";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {IVehicles} from "../../../interfaces/vehicle"
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {useToast} from "../../../components/Toast/ToastContex";
import {useNavigate} from "react-router-dom";
import {getVehicles} from "../../../apiService/vehiclesService";

function Vehicle() {


    const [standBy, setStandBy] = useState(false);
    const { pushToast } = useToast();
    const [vehicles, setVehicles] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const navigate = useNavigate();

    const [dataGrid, setDataGrid] = useState({
        page: 0,
        pageSize: 10,
        fieldSort:'id',
        sort:'asc',
        fieldFilter:'',
        operator: '',
        value: '*'
    });

    const {t} = useTranslation();
    const title = t("vehicle.title");
    const addBtn = t("vehicle.addBtn");
    const name = t("vehicle.name");
    const registration = t("vehicle.registration");
    const avgConsumption = t("vehicle.avgConsumption");
    const annex = t("vehicle.annex");
    const deleteBtn = t("vehicle.delete");
    const details = t("vehicle.details");
    const consumptionFilter = t("vehicle.consumption");


    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'name',
            headerName: t("user.name"),
            width: 150,
            editable: false,
        },
        {
            field: 'license_plate',
            headerName: t("user.lastName"),
            width: 150,
            editable: false,
        },
        {
            field: 'average_consumption',
            headerName: t("user.email"),
            width: 300,
            editable: false,
        },
        {
            field: 'fuel_type',
            headerName: t("user.email"),
            width: 300,
            editable: false,
        },
        {
            field: 'annexe_name',
            headerName: t("user.email"),
            width: 300,
            editable: false,
        },
    ];

    useEffect(() => {
        sendRequest();
    }, [dataGrid]);
    async function sendRequest() {
        setStandBy(true);
        try {
            const vehiclesResponse = await getVehicles(dataGrid, pushToast);
            console.log(vehiclesResponse)
            setVehicles(vehiclesResponse.data);
            setRowCount(vehiclesResponse.total)
            setStandBy(false);
        } catch (error) {
            setStandBy(false);
        }
    }

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

    return (
        <main>
            <div className="m-auto">
                <h2 className="text-center m-12">{title}</h2>
                <div className="m-auto content">
                    <Box sx={{height: "auto", width: 'auto'}}>
                        <DataGrid
                            rows={vehicles}
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
                                navigate(`/back/users/${params.row.id}`)
                            }}
                        />
                    </Box>
                </div>
            </div>
        </main>
    )
}

export default Vehicle;
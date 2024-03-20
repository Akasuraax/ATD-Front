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
            headerName: t("vehicle.name"),
            width: 150,
            editable: false,
        },
        {
            field: 'license_plate',
            headerName: t("vehicle.registration"),
            width: 150,
            editable: false,
        },
        {
            field: 'average_consumption',
            headerName: t("vehicle.avgConsumption"),
            width: 300,
            editable: false,
        },
        {
            field: 'fuel_type',
            headerName: t("vehicle.consumption"),
            width: 300,
            editable: false,
        },
        {
            field: 'annexe_name',
            headerName: t("vehicle.annexe"),
            width: 150,
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
                <h2 className="text-center mb-8">{title}</h2>
                <button
                    type="button"
                    onClick={() => {
                        navigate(`/back/vehicles/add`)
                    }}
                    style={{backgroundColor: "#6AAF5C"}}
                    className={`block mb-2 text-white cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
                    {t("vehicle.addBtn")}
                </button>
                <Box sx={{height: '60vh', width: 'auto'}}>
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
                            navigate(`/back/vehicles/${params.row.id}`)
                        }}
                    />
                </Box>
            </div>
        </main>
    )
}

export default Vehicle;
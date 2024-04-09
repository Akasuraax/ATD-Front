import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useToast} from "../../../components/Toast/ToastContex";
import { useNavigate } from 'react-router-dom';
import {getRecipes} from "../../../apiService/RecipeService";

function RecipesList(){
    const [standBy, setStandBy] = useState(false);
    const { pushToast } = useToast();
    const [recipes, setRecipes] = useState([]);
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
            headerName: t("recipe.titled"),
            width: 500,
            editable: false,
        },
        {
            field: 'description',
            headerName: t("recipe.description"),
            width: 600,
            editable: false,
        },
    ];

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
            const recipesResponse = await getRecipes(dataGrid, pushToast);
            setRecipes(recipesResponse.data);
            setRowCount(recipesResponse.total)
            setStandBy(false);
        } catch (error) {
            setStandBy(false);
        }
    }

    return(
        <main className="display-list">
            <div className="m-auto content max-w-screen-xl">
                <h2 className="text-center mb-8">{t('recipe.title')}</h2>
                <button
                    type="button"
                    onClick={() => {
                        navigate(`/back/recipes/add`)
                    }}
                    style={{ backgroundColor: "#6AAF5C" }}
                    className={`block mb-2 text-white cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
                    {t("recipe.addRecipe")}
                </button>
                <Box sx={{height: "500px", width: 'auto'}}>
                    <DataGrid
                        rows={recipes}
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
                            navigate(`/back/recipes/${params.row.id}`)
                        }}
                    />
                </Box>
            </div>
        </main>
    )
}

export default RecipesList
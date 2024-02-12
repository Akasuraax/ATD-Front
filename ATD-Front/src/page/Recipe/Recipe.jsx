import './recipe.css'
import {useTranslation} from "react-i18next";
import List from "../../components/List/List.jsx";

function Recipe(){
    const { t } = useTranslation();
    const title = t("recipe.title")
    const titled = t("recipe.name");
    const numIngredients = t("recipe.numIngredients");
    const addRecipe = t("recipe.addRecipe");
    const deleteBtn = t("warehouse.delete");
    const details = t("warehouse.details");

    const list = [
        {titled: "Soupe aux choux", numIngredients: 1},
        {titled: "Soupe aux poires", numIngredients: 1},
        {titled: "Soupe aux tomates", numIngredients: 1},
    ];

    const userActions = [
        { label: {deleteBtn}, onClick: (item) => console.log('Supprime', item) },
        { label: {details}, onClick: (item) => console.log('J\'accepte', item) },
    ];

    const addAction = [
        {
            label: {addRecipe},
            onClick: (item) => console.log('J\'accepte', item)
        }
    ];

    return (
        <main>
            <div className="m-auto visit-page">
                <h2 className="text-center m-12">{title}</h2>
                <List data={list} column={[{titled}, {numIngredients}]} actions={userActions} add={addAction}
                      filter={[{numIngredients}]}/>
            </div>
        </main>
    )

}

export default Recipe;
import './language.css'
import {useTranslation} from "react-i18next";
import List from "../../../components/List/List.jsx";

function Language(){
    const { t } = useTranslation();
    const title = t("language.title");
    const addLanguage = t("language.addLanguage");
    const language = t("language.language");
    const added = t("language.added");
    const deleteBtn = t("language.delete");
    const newFile = t("language.newFile");

    const list = [
        {language: "fr", added:"13/02"},
        {language: "en", added:"13/02"},
        {language: "de", added:"13/02"},
    ]

    const userActions = [
        { label: {deleteBtn}, onClick: (item) => console.log('Supprime', item) },
        { label: {newFile}, onClick: (item) => console.log('J\'accepte', item) },
    ];

    const addAction = [
        {
            label: {addLanguage},
            onClick: (item) => console.log('J\'accepte', item)
        }
    ];

    return(
        <main>
            <div className="m-auto min-page">
                <h2 className="text-center m-12">{title}</h2>
                <List data={list} column={[{language}, {added}]} actions={userActions} add={addAction} filter={[{added}]}/>
            </div>
        </main>
    )

}

export default Language;
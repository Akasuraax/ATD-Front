// @ts-ignore
import moment from "moment";
import {IPatchUser, IUser} from "../../interfaces/user";
import {useTranslation} from "react-i18next";
import {Input, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";
import {Datepicker} from "flowbite-react";

export default function EditUser({user, onButtonClick, onSave}: {
    user: IUser,
    onButtonClick: () => void,
    onSave: (newUser: IPatchUser) => void
}) {

    const {t} = useTranslation();
    const [value, setValue] = useState<Date | null>(moment(user.birth_date).format('YYYY-MM-DD'));
    const [phone, setPhone] = useState(user.phone_number);
    const [siret, setSiret] = useState(user.siret_number);



    function saveUser(e) {
        e.preventDefault();
        const form = e.target;
        const newUser: IPatchUser = {
            forname: form.elements["name"].value,
            name: form.elements["lastName"].value,
            email : form.elements["email"].value,
            phone_number: form.elements["phone"].value,
            zipcode: form.elements["zipcode"].value,
            address: form.elements["address"].value,
        }
        if(user.roles.filter(role => role.id === 4).length > 0) {
            newUser.siretNumber = siret
            newUser.companyName = form.elements["company"].value
        } else {
            newUser.gender = form.elements["gender"].value
            newUser.birth_date = form.elements["birthDate"].value
        }
        onSave(newUser)
    }

    return (
        <div
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-4 mb-4">
            <button className="float-right" onClick={onButtonClick}>
                <i className="fi fi-sr-pencil "></i>
            </button>
            <div className="p-4 md:p-8 mb-4">

                <form onSubmit={saveUser}>
                    <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.name")}</p>
                    <Input name="lastName" defaultValue={user.name} required />
                    <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mt-4 mb-0.5">{t("user.lastName")}</p>

                    <Input name="name" defaultValue={user.forname} required />

                    <p className="text-m font-normal text-gray-500 dark:text-gray-400 mt-4">{t("user.zipcode")}</p>
                    <Input
                        name="zipcode"
                        type="number"
                        required={true}
                        defaultValue={user.zipcode}
                        slotProps={{
                            input: {
                                max: 99999,
                            },
                        }}
                    />

                    <p className="text-m font-normal text-gray-500 dark:text-gray-400 mt-4 mb-0.5">{t("user.address")}</p>
                    <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4">
                        <Input name="address" defaultValue={user.address} required/>
                    </p>

                    <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.email")}</p>
                    <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4"><Input
                        name="email"
                        defaultValue={user.email} required/>
                    </p>

                    <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.phone")}</p>
                    <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4">
                        <input
                            style={{
                                border: "none",
                                borderBottom: "1px solid black",
                                paddingLeft: "0px",
                                paddingBottom: '4px'
                            }}
                            type="tel"
                            name="phone"
                            id="phone"
                            pattern="[0-9]{10}"
                            onInput={(e) => e.target.value = e.target.value.replace(/[^\d]/g, '').slice(0, 10)}
                            defaultValue={phone}
                            onChange={(e) => (setPhone(e.target.value.replace(/[^0-9]/g, '')))}
                        />
                    </p>

                    {user.roles.filter(role => role.id === 4).length > 0 ? (
                        <>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.companyName")}</p>
                            <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4"><Input
                                name="company"
                                defaultValue={user.compagny}/>
                            </p>

                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.siretNumber")}</p>
                            <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4">
                                <input
                                    style={{
                                        border: "none",
                                        borderBottom: "1px solid black",
                                        paddingLeft: "0px",
                                        paddingBottom: '4px'
                                    }}
                                    type="text"
                                    name="siret"
                                    id="siret"
                                    onInput={(e) => e.target.value = e.target.value.replace(/[^\d]/g, '').slice(0, 16)}
                                    defaultValue={phone}
                                    onChange={(e) => (setSiret(e.target.value.replace(/[^0-9]/g, '')))}
                                />
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.gender")}</p>
                            <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4">
                                <Select
                                    id="gender"
                                    name="gender"
                                    required
                                    defaultValue={user.gender}
                                >
                                    <MenuItem value={0}>Homme</MenuItem>
                                    <MenuItem value={1}>Femme</MenuItem>
                                    <MenuItem value={2}>Non préciser</MenuItem>
                                </Select>
                            </p>

                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.birthdayDate")}</p>
                            <p className="text-m font-normal text-black-500 dark:text-gray-400">
                                <Datepicker
                                    name="birthDate"
                                    style={{paddingLeft: '2.5rem'}}
                                    maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
                                    value={value}
                                    onSelectedDateChanged={(date) => setValue(moment(date).format('YYYY-MM-DD'))}
                                />
                            </p>
                        </>
                    )}
                    <button
                        type="submit"
                        style={{backgroundColor: "#6AAF5C"}}
                        className={`block mt-8 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
                        {t('generic.saveButton')}
                    </button>
                </form>
            </div>
        </div>
    )
}
import {CustomFlowbiteTheme, FileInput, Label, Modal} from "flowbite-react";
import {t} from "i18next";
import ListFilesActivity from "../Activity/ListFilesActivity";
import {useToast} from "../Toast/ToastContex";
import {useEffect, useRef, useState} from "react";
import {IVehicles} from "../../interfaces/vehicle";
import {getAllVehicles} from "../../apiService/vehiclesService";
import JourneyActivity from "../Activity/JourneyActivity";
import {ISteps} from "../../interfaces/activity";

export default function SaveJourneyModal({setOpenModal, activityId, openModal, update, journeySteps}: {
    setOpenModal: (value: boolean) => void,
    activityId: number,
    openModal: boolean,
    update: (arg0: {
        name: string,
        vehicleid: IVehicles,
        steps:string[]
        activityId:number
    }) => void,
    journeySteps: string[]
}) {

    const [journey, setJourney] = useState({
        name: '',
        vehicleId: null,
        steps:[],
        activityId:null
    })
    const [vehicles, setVehicles] = useState<IVehicles[]>([])
    const [standBy, setStandby] = useState<boolean>(true)

    const {pushToast} = useToast();


    useEffect(() => {
        getVehiclesF()
    }, []);

    useEffect(() => {
        const stepsTransformed = journeySteps.map((address, index) => ({
            id: index,
            address: address,
        }));
        updateField('steps', stepsTransformed);
    }, [journeySteps]);

    useEffect(() => {
        updateField('activityId',activityId)
    }, [activityId]);

    const customTheme: CustomFlowbiteTheme['modal'] = {
        "root": {
            "base": "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
            "show": {
                "on": "flex bg-opacity-50 dark:bg-opacity-80",
                "off": "hidden"
            },
        }
    };

    const updateField = (field: string, value: any) => {
        setJourney((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const getVehiclesF = async () => {
        try {
            setStandby(true)
            const res = await getAllVehicles(pushToast)
            updateField('vehicleId',res[0].id)
            setVehicles(res)
            setStandby(false)
        } catch (err) {
            console.log(err)
        }
    }

    const save = () => {
        if(journey.name === '') {
            pushToast({
                content:'il faut un titre',
                type:'failure'
            })
            return
        }
        update(journey)
    }

    return (
        <Modal theme={customTheme} show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
            <Modal.Header/>
            <Modal.Body>
                {standBy ? null : (
                    <>
                        <label htmlFor="title"
                               className="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-white">{t('activity.journeyTitle')}</label>
                        <input
                            type="text"
                            name="title"
                            required={true}
                            style={{
                                borderBottom: '1px solid black',
                                borderLeft: 'none',
                                borderRight: 'none',
                                borderTop: 'none',
                                margin: '0',
                                padding: '0',
                                fontSize: '0.875rem',
                                width: '20%',
                                marginBottom: '12px',
                            }}
                            value={journey.name}
                            onChange={(e) => updateField('name', e.target.value)}
                        />
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Vehicule"/>
                        </div>
                        <select
                            id="role"
                            required
                            value={journey.vehicleId}
                            onChange={(e) => updateField('vehicleId', e.target.value)}
                        >
                            {vehicles.map(v =>
                                <option value={v.id} key={v.id}>{v.name}, {v.license_plate}</option>)}
                        </select>
                        <JourneyActivity journey={journey.steps}/>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <div
                    className="pt-4 flex w-full justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                    <button
                        onClick={() => setOpenModal(false)}
                        className="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        {t("generic.cancel")}
                    </button>
                    <button
                        onClick={save}
                        className="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        {t("generic.register")}
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
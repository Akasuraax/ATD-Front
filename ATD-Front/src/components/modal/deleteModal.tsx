
'use client';
import PropTypes from 'prop-types';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Button, Modal } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {useTranslation} from "react-i18next";



const customTheme: CustomFlowbiteTheme = {
    modal: {
        root: {
            show: {
                on: "flex filter bg-opacity-50",
                off: "hidden",
            },
        },
    },
};

export default function DeleteModal({openModal, onClose, text }) {

    const { t } = useTranslation();


    return (
        <>
            <Flowbite theme={{ theme: customTheme }}>
                <Modal show={openModal} size="md" onClose={() => onClose(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                {text}
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button className="btn" onClick={() => onClose(true)}>
                                    {t("generic.acceptDelete")}
                                </Button>
                                <Button color="gray" onClick={() => onClose(false)}>
                                    {t("generic.refuseDelete")}
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </Flowbite>
        </>
    );
}

DeleteModal.propTypes = {
    openModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};
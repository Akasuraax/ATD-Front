
'use client';
import PropTypes from 'prop-types';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Button, Modal } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';



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

export default function DeleteModal({openModal, onClose }) {

    return (
        <>
            <Flowbite theme={{ theme: customTheme }}>
                <Modal show={openModal} onClose={() => onClose(false)} >
                    <Modal.Header>Terms of Service</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                                companies around the world are updating their terms of service agreements to comply.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                                to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                                soon as possible of high-risk data breaches that could personally affect them.
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="gray" onClick={() => onClose(true)}>I accept</Button>
                        <Button color="gray" onClick={() => onClose(false)}>
                            Decline
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Flowbite>
        </>
    );
}

DeleteModal.propTypes = {
    openModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
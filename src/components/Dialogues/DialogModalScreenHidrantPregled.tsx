import React, { useState } from 'react';
import { Dialog, Divider } from '@rneui/themed';
import api from '../../services/api';
import {  BASE_URL_PREGLED_SLIKA } from '../../config';
import { CustomToast } from '../Toasts/CustomToast';
import { useSelector } from 'react-redux';
import { UseConnectivity } from '../../Hooks/UseConnectivityHook';
import * as SQLite from 'expo-sqlite';
import { CameraComponent } from '../Camera/CameraComponent';

interface DialogPregledProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    selectedMarkerId: number | null;
    updatePregled

}

const DialogModalScreenHidrantPregled: React.FC<DialogPregledProps> = ({
    visible,
    setVisible,
    selectedMarkerId,
    updatePregled
}) => {

    const [formData, setFormData] = useState<FormData | null>(null);

    const isConnected = UseConnectivity();
    const db = SQLite.openDatabase('pregled_hidrantov.db');
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const handleSubmit = async () => {
        try {
            if (isConnected) {
                try {
                    await api.post(`${BASE_URL_PREGLED_SLIKA}/${selectedMarkerId}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    try {
                        updatePregled()
                    } catch (error) {
                        console.error('Error, setting new pregled slika:', error);
                        throw error;
                    }
                } catch (error) {
                    console.error('Error while uploading the image:', error);
                    throw error;
                }
                setVisible(false);
            }
            CustomToast('Dodali ste pregled.', 'success');
        } catch (error) {
            console.error(error);
        }

    };

    const theme = useSelector((state: any) => state.theme);

    const handlePictureTaken = (formData: FormData) => {
        setFormData(formData);
    }

    return (
        <Dialog
            overlayStyle={[theme.style.dialogContainer, { height: '90%', width: '90%' }]}
            isVisible={visible}
            onBackdropPress={toggleOverlay}
        >
            <>
                <Divider style={{ marginTop: 10 }} />
                <CameraComponent
                    hydrantId={selectedMarkerId}
                    onPictureTaken={handlePictureTaken}
                    onSubmit={handleSubmit}
                />
            </>
        </Dialog>
    );

}

export default DialogModalScreenHidrantPregled;
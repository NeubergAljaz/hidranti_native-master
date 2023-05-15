/*
success: Zelen toast, ki se običajno uporablja za obveščanje o uspešno zaključeni operaciji.
error: Rdeč toast, ki se običajno uporablja za obveščanje o napaki.
info: Modri toast, ki se običajno uporablja za obveščanje uporabnika o neki informaciji.
null: Siv toast, ki se lahko uporablja za katero koli sporočilo, ki ne sodi v zgornje kategorije.
*/
import Toast from 'react-native-toast-message';

export const CustomToast = (message: string, type: 'success' | 'error' | 'info' | 'null' = 'success') => {
    Toast.show({
        type: type,
        position: 'bottom',
        text1: 'Obvestilo',
        text2: message,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 10,
        bottomOffset: 40,
    });
};
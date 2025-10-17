import { useCallback } from 'react';
import { Platform, Alert } from 'react-native';
import { PERMISSIONS, RESULTS, requestMultiple, openSettings, checkMultiple } from 'react-native-permissions';


export const useCameraAndLibraryAccessPermission = () => {

    const showBlockedAlert = useCallback(() => {
        Alert.alert(
            'Permission Required',
            'Image Library access permission is blocked. Please enable it in settings.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => openSettings() }
            ]
        );
    }, []);

    const getPermissions = useCallback(() => {
        let permissions = [];

        if (Platform.OS === 'ios') {
            permissions = [
                PERMISSIONS.IOS.CAMERA,
                PERMISSIONS.IOS.PHOTO_LIBRARY,
                PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
            ]
        } else if (Platform.OS === 'android') {
            permissions = [
                PERMISSIONS.ANDROID.CAMERA,
                PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            ]
            // for older Android versions (less than android 13)
            if (Platform.Version < 33) {
                permissions = permissions.concat(
                    [
                        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
                        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
                    ]
                )
            }
        }
        return permissions;
    }, []);

    const getCameraAndLibraryAccessPermission = useCallback(async () => {
        let unavailable = [];
        let limited = [];
        let denied = [];
        let blocked = [];
        let granted = [];

        try {

            const checkedPermissions = await checkMultiple(getPermissions());

            for (const [permission, status] of Object.entries(checkedPermissions)) {

                switch (status) {
                    case RESULTS.UNAVAILABLE:
                        unavailable.push(permission);
                        break;
                    case RESULTS.DENIED:
                        denied.push(permission);
                        break;
                    case RESULTS.LIMITED:
                        limited.push(permission);
                        break;
                    case RESULTS.BLOCKED:
                        blocked.push(permission);
                        break;
                    case RESULTS.GRANTED:
                        granted.push(permission);
                        break;

                }

            }

            if (unavailable.length > 0) {
                console.log('Permission request Unavailable!');
                Alert.alert(
                    'Permission Required',
                    'Sorry, some of camera features are not available on this device.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Open Settings', onPress: () => openSettings() }
                    ]
                );
            }

            if (limited.length > 0) {
                console.log('Permission request has a limited-grant!');
            }

            if (denied.length > 0) {
                console.log('Image Library Access is Denied!');
                const requestResults = await requestMultiple(denied);
                const stillDenied = Object.values(requestResults).filter(res => res !== RESULTS.GRANTED);
                if (stillDenied.length > 0) {
                    showBlockedAlert();
                    return false;
                }
            }

            if (blocked.length > 0) {
                console.log('Image Library Access is Blocked!');
                showBlockedAlert();
                return false;
            }

            await new Promise(res => setTimeout(res, 200));
            return true; // For 'granted' and/or 'limited'
        } catch (error) {
            console.log('Error while requesting Camera and Gallery permissions!. ', error);
            return false;
        }

    }, [getPermissions, showBlockedAlert]);

    return { getCameraAndLibraryAccessPermission };
}
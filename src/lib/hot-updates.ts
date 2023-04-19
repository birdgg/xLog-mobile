import * as Updates from 'expo-updates';
import { Alert } from 'react-native';

export async function checkHotUpdates() {
    try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
            await Updates.fetchUpdateAsync();

            Alert.prompt(
                'Update Available',
                'A new version of the app is available. Restart the app to apply the update.',
                [
                    {
                        text: 'Restart',
                        onPress: async () => {
                            await Updates.reloadAsync();
                        },
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                ]
            );
        }
    } catch (e) {
        Alert.alert('Error', e.message);
    }
}
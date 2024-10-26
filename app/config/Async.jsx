import AsyncStorage from "@react-native-async-storage/async-storage";

class Async {
    async createToken(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (e) {
            console.error('createToken', e);
        }
        return false;
    }

    async getToken(key) {
        try {
            const token = await AsyncStorage.getItem(key);
            if (token !== null) {
               return token;
            }
        } catch (e) {
            console.log('getToken', e);
        }
        return null;
    }

    async removeToken(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (e) {
            console.log('removeToken', e);
        }
        return false;
    }

}

export default Async;
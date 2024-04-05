import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StartPage = () => {
    if (AsyncStorage.getItem('userToken')) {
        return <Redirect href="/home" />;
    } else {
        return <Redirect href="/login" />;
    }
}

export default StartPage;
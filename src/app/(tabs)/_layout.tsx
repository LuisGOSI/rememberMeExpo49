import { Tabs } from "expo-router"
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



function HomeIcon(props) {
    return <AntDesign name="home" size={50} style={{ marginBottom: -3 }} {...props} />;
}

function ContactIcon(props) {
    return <AntDesign name="user" size={50} style={{ marginBottom: -3 }} {...props} />;
}

function addIcon(props) {
    return <AntDesign name="pluscircleo" size={50} style={{ marginBottom: -3 }} {...props} />;
}

function BluetoothIcon(props) {
    return <Feather name="bluetooth" size={50} style={{ marginBottom: -3 }} {...props} />;

}

export default () => {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="home" options={{ title: "Inicio", tabBarIcon: HomeIcon }} />
            <Tabs.Screen name="addPill" options={{ title: "Nueva pastilla", tabBarIcon: addIcon }} />
            <Tabs.Screen name="bluetooth" options={{ title: "Bluetooth", tabBarIcon:BluetoothIcon }} />
            <Tabs.Screen name="contact" options={{ title: "Sesion", tabBarIcon: ContactIcon }} />
        </Tabs>
    )
}
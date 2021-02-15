import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import sha1 from "sha1";

export default function App() {
    const [ hasPermission, setHasPermission ] = useState(null);
    const [ lastScan, setLastScan ] = useState(null);
    const [ lastHash, setLastHash ] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeScanned = ({ _, data }) => {
        if (lastScan !== data) {
            notificationAsync(NotificationFeedbackType.Success);
            const hash = sha1(data);
            setLastScan(data);
            setLastHash(hash);
        }
    };

    return (
        <View style={styles.container}>
            {(() => {
                if (hasPermission === null) {
                    return <Text style={styles.text}>Requesting for camera permission...</Text>;
                }
                if (hasPermission === false) {
                    return <Text style={styles.text}>Camera permission access is required for scanning.</Text>;
                }

                return [
                    <BarCodeScanner key="scanner" onBarCodeScanned={handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />,
                    <Text key="scanned" style={styles.textBottom}>{lastScan !== null && `Last Scan: ${lastScan}\nLast Hash: ${lastHash}`}</Text>
                ];
            })()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#FFFFFF",
    },
    textBottom: {
        color: "#FFFFFF",
        alignSelf: "flex-end",
    },
});

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import sha1 from "sha1";

export default function App() {
    const [ hasPermission, setHasPermission ] = useState(null);
    const [ baseURL, setBaseURL ] = useState(null);
    const [ lastScan, setLastScan ] = useState(null);
    const [ lastHash, setLastHash ] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeScanned = ({ _, data }) => {
        if (data.startsWith("barcode-scanner://")) {
            setBaseURL(data.substr("barcode-scanner://".length));
        } else if (lastScan !== data) {
            const hash = sha1(data);
            setLastScan(data);
            setLastHash(hash);
            notificationAsync(NotificationFeedbackType.Success);
            if (baseURL !== null) {
                const controller = new AbortController();
                fetch(baseURL + hash, { signal: controller.signal })
                .catch((err) => {
                    if (err instanceof DOMException && err.code == DOMException.ABORT_ERR) {
                        alert("Request timed out");
                    } else {
                        alert(err);
                    }
                });
                setTimeout(() => controller.abort(), 1000);
            }
        }
    };

    return (
        <View style={styles.rootContainer}>
            {(() => {
                if (hasPermission === null) {
                    return <Text style={styles.statusText}>Requesting for camera permission...</Text>;
                }
                if (hasPermission === false) {
                    return <Text style={styles.statusText}>Camera permission access is required for scanning.</Text>;
                }

                return (
                    <View style={styles.scannerContainer}>
                        <Text style={styles.textTop}>{baseURL !== null && `Server URL: ${baseURL}`}</Text>
                        <BarCodeScanner style={styles.scanner} onBarCodeScanned={handleBarCodeScanned} />
                        <Text style={styles.textBottom}>{lastScan !== null && `Last Scan: ${lastScan}\nLast Hash: ${lastHash}`}</Text>
                    </View>
                );
            })()}
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    statusText: {
        fontSize: 20,
        padding: 10,
    },
    scannerContainer: {
        flex: 1,
        flexDirection: "column",
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#000000",
        justifyContent: "space-between",
    },
    textTop: {
        color: "#FFFFFF",
        alignSelf: "flex-start",
        marginTop: 20,
        padding: 10,
    },
    scanner: {
        ...StyleSheet.absoluteFillObject,
    },
    textBottom: {
        color: "#FFFFFF",
        alignSelf: "flex-end",
        marginBottom: 20,
        padding: 10,
    },
});

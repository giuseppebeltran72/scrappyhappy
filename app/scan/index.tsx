import { useState, useEffect, useRef } from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
    Alert,
} from "react-native"
import * as React from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from "expo-image-manipulator"
import { StackNavigationProp } from "@react-navigation/stack"
import Feather from "react-native-vector-icons/Feather";

type ScanScreenProps = {
    navigation: StackNavigationProp<any>
}

const ScanScreen = ({ navigation }: ScanScreenProps) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanning, setScanning] = useState(false)
    const [scannedItem, setScannedItem] = useState<any>(null)
    const cameraRef = useRef<any>(null);
    const [cameraFacing, setCameraFacing] = useState<CameraType>('back');

    // Waste categories with descriptions for the mock recognition
    const wasteCategories = [
        {
            type: "Plastic",
            description: "Recyclable in most areas. Please clean before recycling.",
            recyclable: true,
            points: 10,
        },
        {
            type: "Paper",
            description: "Recyclable. Keep dry and free from food contamination.",
            recyclable: true,
            points: 5,
        },
        {
            type: "Metal",
            description: "Highly recyclable. Rinse containers before recycling.",
            recyclable: true,
            points: 15,
        },
        {
            type: "Glass",
            description: "Recyclable indefinitely. Separate by color if required in your area.",
            recyclable: true,
            points: 12,
        },
        {
            type: "E-Waste",
            description: "Contains valuable materials. Must be taken to special collection points.",
            recyclable: true,
            points: 25,
        },
        {
            type: "Organic",
            description: "Compostable. Can be used to create nutrient-rich soil.",
            recyclable: true,
            points: 8,
        },
        {
            type: "Non-Recyclable",
            description: "Unfortunately, this item cannot be recycled in most areas.",
            recyclable: false,
            points: 0,
        },
    ]

    const takePicture = async () => {
        if (cameraRef.current) {
            setScanning(true)
            try {
                // With the new API, we need to use a different approach to take pictures
                const photo = await cameraRef.current.takePictureAsync();

                // Resize the image to reduce processing time (in a real app)
                const manipResult = await ImageManipulator.manipulateAsync(photo.uri, [{ resize: { width: 300 } }], {
                    compress: 0.7,
                    format: ImageManipulator.SaveFormat.JPEG,
                })

                // Mock waste recognition - in a real app, this would call an ML model
                await mockRecognizeWaste(manipResult.uri)
            } catch (error) {
                console.error("Error taking picture:", error)
                Alert.alert("Error", "Failed to capture image. Please try again.")
                setScanning(false)
            }
        }
    }

    // Mock function to simulate waste recognition
    const mockRecognizeWaste = async (imageUri: string) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Randomly select a waste category (in a real app, this would be determined by ML)
        const randomCategory = wasteCategories[Math.floor(Math.random() * wasteCategories.length)]

        setScannedItem(randomCategory)
        setScanning(false)
    }

    const resetScan = () => {
        setScannedItem(null)
    }

    if (!permission) {
        // Camera permissions are still loading
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        )
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No access to camera</Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.goBack()}>
                    <Text style={styles.secondaryButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {!scannedItem ? (
                <>
                    <CameraView 
                        ref={cameraRef} 
                        style={styles.camera} 
                        facing={cameraFacing}
                        onMountError={(error) => {
                            console.error("Camera mount error:", error);
                            Alert.alert("Camera Error", "There was an error accessing the camera.");
                        }}
                    >
                        <View style={styles.overlay}>
                            <View style={styles.scanFrame} />
                        </View>

                        <View style={styles.header}>
                            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                                <Feather name="arrow-left" size={24} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Scan Waste</Text>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.instructionText}>Position your camera over the waste item</Text>

                            {scanning ? (
                                <View style={styles.scanningContainer}>
                                    <ActivityIndicator size="large" color="#4CAF50" />
                                    <Text style={styles.scanningText}>Analyzing waste...</Text>
                                </View>
                            ) : (
                                <TouchableOpacity style={styles.captureButton} onPress={takePicture} disabled={scanning}>
                                    <View style={styles.captureButtonInner} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </CameraView>
                </>
            ) : (
                <View style={styles.resultContainer}>
                    <View style={styles.resultHeader}>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Feather name="arrow-left" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.resultHeaderTitle}>Scan Result</Text>
                    </View>

                    <View style={styles.resultContent}>
                        <View
                            style={[styles.resultTypeContainer, { backgroundColor: scannedItem.recyclable ? "#E8F5E9" : "#FFEBEE" }]}
                        >
                            <Feather
                                name={scannedItem.recyclable ? "check-circle" : "x-circle"}
                                size={40}
                                color={scannedItem.recyclable ? "#4CAF50" : "#F44336"}
                            />
                            <Text style={styles.resultType}>{scannedItem.type}</Text>
                            {scannedItem.recyclable && <Text style={styles.pointsText}>+{scannedItem.points} points</Text>}
                        </View>

                        <Text style={styles.resultDescription}>{scannedItem.description}</Text>

                        <View style={styles.tipsContainer}>
                            <Text style={styles.tipsTitle}>Disposal Tips:</Text>
                            <View style={styles.tipItem}>
                                <Feather name="info" size={16} color="#4CAF50" style={styles.tipIcon} />
                                <Text style={styles.tipText}>
                                    {scannedItem.recyclable
                                        ? "Clean the item before recycling to prevent contamination."
                                        : "Consider alternatives to this item that are recyclable."}
                                </Text>
                            </View>
                            <View style={styles.tipItem}>
                                <Feather name="map-pin" size={16} color="#4CAF50" style={styles.tipIcon} />
                                <Text style={styles.tipText}>
                                    {scannedItem.recyclable
                                        ? "Find nearby recycling points in the Locate Areas section."
                                        : "Check local waste management guidelines for proper disposal."}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.resultFooter}>
                        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={resetScan}>
                            <Feather name="camera" size={20} color="#4CAF50" style={styles.buttonIcon} />
                            <Text style={styles.secondaryButtonText}>Scan Again</Text>
                        </TouchableOpacity>

                        {scannedItem.recyclable && (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    Alert.alert(
                                        "Points Added!",
                                        `You've earned ${scannedItem.points} points for recycling ${scannedItem.type.toLowerCase()}.`,
                                        [{ text: "Great!", onPress: () => navigation.goBack() }],
                                    )
                                }}
                            >
                                <Feather name="check" size={20} color="white" style={styles.buttonIcon} />
                                <Text style={styles.buttonText}>Confirm Recycling</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    camera: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
    scanFrame: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: "#4CAF50",
        borderRadius: 20,
        backgroundColor: "transparent",
    },
    header: {
        position: "absolute",
        top: 50,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
    },
    footer: {
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    instructionText: {
        color: "white",
        fontSize: 16,
        marginBottom: 30,
        textAlign: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "rgba(255,255,255,0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    captureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "white",
    },
    scanningContainer: {
        alignItems: "center",
    },
    scanningText: {
        color: "white",
        marginTop: 10,
        fontSize: 16,
    },
    resultContainer: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    resultHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    resultHeaderTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
        color: "#333",
    },
    resultContent: {
        flex: 1,
        padding: 20,
    },
    resultTypeContainer: {
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    resultType: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
        color: "#333",
    },
    pointsText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#4CAF50",
        marginTop: 5,
    },
    resultDescription: {
        fontSize: 16,
        lineHeight: 24,
        color: "#555",
        marginBottom: 20,
    },
    tipsContainer: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    tipsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    tipItem: {
        flexDirection: "row",
        marginBottom: 10,
        alignItems: "flex-start",
    },
    tipIcon: {
        marginRight: 10,
        marginTop: 2,
    },
    tipText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
        color: "#555",
    },
    resultFooter: {
        padding: 20,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
    },
    button: {
        flex: 1,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#4CAF50",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 5,
    },
    secondaryButton: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#4CAF50",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    secondaryButtonText: {
        color: "#4CAF50",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonIcon: {
        marginRight: 8,
    },
    errorText: {
        fontSize: 18,
        color: "#F44336",
        textAlign: "center",
        margin: 20,
    },
})

export default ScanScreen
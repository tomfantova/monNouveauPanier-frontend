import React from 'react'
import { SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function BookmarksScreen({ navigation }) {

    const { height, width, fontScale } = useWindowDimensions();
    const styles = makeStyles(height, width, fontScale)

    return (
        <KeyboardAwareScrollView>
            <View style={styles.backgroundView}>
                <SafeAreaView style={styles.safeAreaViewContainer}>
                    <View style={styles.globalViewContainer}>
                        <Text>BookmarksScreen</Text>
                    </View>
                </SafeAreaView>
            </View>
        </KeyboardAwareScrollView>
    )
}

const makeStyles = (height: number, width: number, fontScale: number) => {

    const adaptToHeight = (size: number) => {
        return ((height * size) / 844) / fontScale
    }

    const adaptToWidth = (size: number) => {
        return ((width * size) / 390)
    }

    const normalizeText = (size: number) => {
        return ((width * size) / 390) / fontScale
    }

    return StyleSheet.create({
        backgroundView: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%',
            minWidth: '100%',
        },
        safeAreaViewContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%',
            minWidth: '100%',
        },
        globalViewContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            paddingHorizontal: adaptToWidth(20),
            paddingVertical: adaptToWidth(20),
        },
    })

}
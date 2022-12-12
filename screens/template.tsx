import React from 'react'
import { SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function TemplateScreen({ navigation }) {

    const { height, width, fontScale } = useWindowDimensions();
    const styles = makeStyles(height, width, fontScale)

    return (
        <KeyboardAwareScrollView>
            <View style={styles.backgroundView}>
                <SafeAreaView style={styles.safeAreaViewContainer}>
                    <View style={styles.globalViewContainer}>
                        <Text>TemplateScreen</Text>
                    </View>
                </SafeAreaView>
            </View>
        </KeyboardAwareScrollView>
    )
}

const makeStyles = (height, width, fontScale) => {

    const adaptToHeight = size => {
        return ((height * size) / 844) / fontScale
    }

    const normalize = size => {
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
            paddingHorizontal: normalize(20),
            paddingVertical: normalize(20),
        },
    })

}
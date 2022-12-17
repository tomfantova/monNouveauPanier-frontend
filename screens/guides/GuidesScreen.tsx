import React from 'react'
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useEffect, useRef, useState } from 'react'

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'



export default function GuidesScreen({ navigation }) {

    const { height, width, fontScale } = useWindowDimensions();
    const styles = makeStyles(height, width, fontScale)

    const initialSearchInputPlaceholder = '🔍  Rechercher un guide conso'
    const [searchInputPlaceholder, setSearchInputPlaceholder] = useState(initialSearchInputPlaceholder)
    const [searchInput, setSearchInput] = useState('')

    const scrollRef = useRef<any>()
    const firstCardOffset = width - ((width * 40) / 390)
    const [scrollviewOffset, setScrollviewOffset] = useState(firstCardOffset)
    const [scrollviewScrollListening, setScrollviewScrollListening] = useState(false)
    const [isScrollviewTouched, setIsScrollviewTouched] = useState(false)


    const newsCards: JSX.Element[] = [
        <View key={0} style={[styles.newsCard, styles.newsPremium]}>
            <Text style={styles.newsPremiumTitle}>Devenir Premium</Text>
            <Text style={styles.newsPremiumTeaser}>
                Soutenez notre projet éco-responsable et débloquez toutes les fonctionnalités
            </Text>
            <Text style={styles.newsPremiumPricing}>
                <Text style={styles.newsPremiumPricingAmount}>20€ / </Text>
                <Text style={styles.newsPremiumPricingFrequency}>an</Text>
            </Text>
            <TouchableOpacity style={styles.newsPremiumBtn}>
                <Text style={styles.newsPremiumBtnText}>En savoir plus</Text>
            </TouchableOpacity>
        </View>,
        <View key={1} style={[styles.newsCard, styles.newsSecond]}>
            <Text>Annonce 2</Text>
        </View>,
        <View key={2} style={[styles.newsCard, styles.newsThird]}>
            <Text>Annonce 3</Text>
        </View>,
        <View key={3} style={[styles.newsCard, styles.newsFourth]}>
            <Text>Annonce 4</Text>
        </View>,
    ]
    const newsCardWidth: object = { width: `${100 / (newsCards.length + 2)}%` }
    const newsLoopCardsIndexes: number[] = [newsCards.length - 1, ...newsCards.map((e, i) => i), 0]
    const newsLoopCards: JSX.Element[] = [
        <View
            key={0}
            style={[styles.newsLoopCard, newsCardWidth]}
        >
            {newsCards[newsLoopCardsIndexes[0]]}
        </View>,
        ...newsCards.map((e, i) => e = (
            <View
                key={i + 1}
                style={[styles.newsLoopCard, newsCardWidth]}
            >
                {newsCards[newsLoopCardsIndexes[i + 1]]}
            </View>
        )),
        <View
            key={newsLoopCardsIndexes.length - 1}
            style={[styles.newsLoopCard, newsCardWidth]}
        >
            {newsCards[newsLoopCardsIndexes[newsLoopCardsIndexes.length - 1]]}
        </View>,
    ]


    const handleScrollviewBulletPoints = (i: number) => {
        scrollRef.current?.scrollTo({
            x: firstCardOffset * (i + 1),
            animated: true,
        });
    }


    const newsBulletPoints: JSX.Element[] = newsCards.map((e, i) => {
        let bulletPointColor: object
        let bulletPointSize: object
        if (Math.round(scrollviewOffset / firstCardOffset) === i + 1) {
            bulletPointColor = { backgroundColor: "#F1A100" }
            bulletPointSize = { height: (width * 7) / 390, width: (width * 7) / 390 }
        } else {
            bulletPointColor = { backgroundColor: "#AFAFAF" }
            bulletPointSize = { height: (width * 5) / 390, width: (width * 5) / 390 }
        } 
        return (
            <TouchableWithoutFeedback
                key={i}
                onPress={() => handleScrollviewBulletPoints(i)}
            >
                <View style={styles.newsBulletPointBtn}>
                    <View
                        style={[{
                            ...styles.newsBulletPoint,
                            ...bulletPointColor,
                            ...bulletPointSize,
                        }]}
                    >
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    })


    useEffect(() => {

        setTimeout(() => {
            setScrollviewScrollListening(true)
        }, 1000)

    })


    useEffect(() => {

        if (!isScrollviewTouched) {

            const scrollviewInterval = setTimeout(() => {
                scrollRef.current?.scrollTo({
                    x: scrollviewOffset + firstCardOffset,
                    animated: true,
                });
            }, 60000)

            return () => clearInterval(scrollviewInterval)

        }

    }, [isScrollviewTouched, scrollviewOffset])


    const handleScrollviewPagination = (event: any) => {

        if (scrollviewScrollListening) {
            const scrollPositionIndex: number = (event.nativeEvent.contentOffset.x / firstCardOffset)

            let cardIndex: number = 0
            if (scrollPositionIndex >= 1) {
                cardIndex = Math.round(scrollPositionIndex - 0.49)
            } else {
                cardIndex = Math.round(scrollPositionIndex + 0.49)
            }
        
            if (cardIndex === 0) {
                scrollRef.current?.scrollTo({
                    x: firstCardOffset * (newsLoopCards.length - 2),
                    animated: false,
                });

            } else if (cardIndex === newsLoopCards.length - 1) {
                scrollRef.current?.scrollTo({
                    x: firstCardOffset,
                    animated: false,
                });
            }
        }

    }


    const handleScrollviewScrollEnd = (event: any) => {

        setIsScrollviewTouched(false)

        const newOffset = Math.round(event.nativeEvent.contentOffset.x / firstCardOffset) * firstCardOffset

        if (newOffset >= firstCardOffset && newOffset <= (newsLoopCards.length - 2) * firstCardOffset) {
            setScrollviewOffset(newOffset)
        }  else if (newOffset > (newsLoopCards.length - 2) * firstCardOffset) {
            setScrollviewOffset(firstCardOffset)
        } else if (newOffset < firstCardOffset) {
            setScrollviewOffset(firstCardOffset * (newsLoopCards.length - 2))
        }

    }

    
    return (
        <KeyboardAwareScrollView>
            <View style={styles.globalBackgroundView}>
                <SafeAreaView style={styles.globalSafeAreaViewContainer}>
                    <View style={styles.globalViewContainer}>


                        <ImageBackground
                            source={require('../../assets/guides/bg-search-section.jpg')}
                            defaultSource={require('../../assets/guides/bg-search-section.jpg')}
                            style={styles.searchContainer}
                            imageStyle={styles.searchBackgroundImage}
                        >
                            <View style={styles.searchBackgroundImageOpacity}>
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder={searchInputPlaceholder}
                                    placeholderTextColor='grey'
                                    onFocus={() => setSearchInputPlaceholder('')}
                                    onBlur={() => setSearchInputPlaceholder(initialSearchInputPlaceholder)}
                                />
                            </View>
                        </ImageBackground>


                        <ScrollView
                            horizontal={true}
                            pagingEnabled={true}
                            scrollEnabled={scrollviewScrollListening}
                            showsHorizontalScrollIndicator={false}
                            disableIntervalMomentum={true}
                            decelerationRate="fast"
                            contentContainerStyle={[styles.newsCardContainer, { width: `${100 * newsLoopCards.length}%` }]}
                            style={styles.newsContainer}
                            contentOffset={{x: firstCardOffset, y: 0}}
                            ref={scrollRef}
                            onScroll={event => handleScrollviewPagination(event)}
                            onScrollBeginDrag={() => setIsScrollviewTouched(true)}
                            onMomentumScrollEnd={event => handleScrollviewScrollEnd(event)}
                            scrollEventThrottle={5}
                        >
                            {newsLoopCards}
                        </ScrollView>

                        <View style={styles.newsBulletPointsContainer}>
                            {newsBulletPoints}
                        </View>


                        <View style={styles.guidesContainer}>
                            <Text style={styles.guidesTitle}>Découvrez nos guides conso</Text>
                            <View style={styles.guidesCardsContainer}>
                                <TouchableOpacity style={[styles.guidesCard, styles.guidesGeneralities]}>
                                    <Text style={styles.guidesCardTitle}>Guides généraux</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.guidesCard, styles.guidesProducts]}>
                                    <Text style={styles.guidesCardTitle}>Fiches produits</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.guidesCard, styles.guidesLabels]}>
                                    <Text style={styles.guidesCardTitle}>Labels & Co</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.guidesCard, styles.guidesInterviews]}>
                                    <Text style={styles.guidesCardTitle}>Entretiens</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={styles.postContainer}>
                            <Text style={styles.postTitle}>Dites-nous en plus</Text>
                            <Text></Text>
                        </View>


                    </View>
                </SafeAreaView>
            </View>
        </KeyboardAwareScrollView>
    )
}



const makeStyles = (height: number, width: number, fontScale: number) => {

    const adaptToHeight = (size: number) => {
        return ((height * size) / 844)
    }

    const adaptToWidth = (size: number) => {
        return ((width * size) / 390)
    }

    const normalizeText = (size: number) => {
        return ((width * size) / 390) / fontScale
    }

    return StyleSheet.create({


        globalBackgroundView: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%',
            minWidth: '100%',
        },
        globalSafeAreaViewContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
        },
        globalViewContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '100%',
            width: '100%',
            paddingHorizontal: adaptToWidth(20),
            paddingVertical: adaptToWidth(20),
        },


        searchContainer: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: adaptToWidth(20),
            height: adaptToWidth(180),
            width: '100%',
            borderRadius: adaptToWidth(10),
        },
        searchBackgroundImage: {
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            borderRadius: adaptToWidth(10),
            position: 'absolute',
        },
        searchBackgroundImageOpacity: {
            height: '100%',
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: adaptToWidth(10),
        },
        searchInput: {
            fontSize: normalizeText(15),
            width: '90%',
            textAlign: 'left',
            padding: adaptToWidth(14),
            borderColor: 'black',
            borderWidth: adaptToWidth(0.5),
            borderRadius: adaptToWidth(8),
            marginBottom: adaptToWidth(22),
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },


        newsContainer: {
            marginBottom: adaptToWidth(20),
            height: adaptToWidth(240),
            width: '100%',
            borderRadius: adaptToWidth(10),
            backgroundColor: 'white',
        },
        newsCardContainer: {
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        newsCard: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        newsPremium: {
            backgroundColor: '#002654',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: adaptToWidth(30),
        },
        newsPremiumTitle: {
            fontWeight: '600',
            fontSize: normalizeText(20),
            color: '#F1A100',
        },
        newsPremiumTeaser: {
            fontSize: adaptToWidth(15),
            color: 'white',
            textAlign: 'center',
            marginBottom: adaptToWidth(6),
        },
        newsPremiumPricing: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: adaptToHeight(4),
        },
        newsPremiumPricingAmount: {
            fontSize: normalizeText(20),
            fontWeight: '500',
            color: 'white',
        },
        newsPremiumPricingFrequency: {
            fontSize: normalizeText(24),
            fontWeight: '500',
            color: '#F1A100',
        },
        newsPremiumBtn: {
            height: adaptToWidth(36),
            width: adaptToWidth(240),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F1A100',
            borderRadius: adaptToWidth(8),
            borderColor: 'black',
            borderWidth: adaptToWidth(0.5),
        },
        newsPremiumBtnText: {
            color: 'black',
            fontWeight: '600',
            fontSize: normalizeText(15),
        },
        newsSecond: {
        },
        newsThird: {
        },
        newsFourth: {
        },
        newsLoopCard: {
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        newsBulletPointsContainer: {
            marginBottom: adaptToWidth(20),
            height: adaptToWidth(10),
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        newsBulletPointBtn: {
            width: adaptToWidth(25),
            height: adaptToWidth(32),
            justifyContent: 'center',
            alignItems: 'center',
        },
        newsBulletPoint: {
            borderRadius: adaptToWidth(50),
        },


        guidesContainer: {
            backgroundColor: 'white',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: adaptToWidth(500),
            width: '100%',
            borderRadius: adaptToWidth(10),
            padding: adaptToWidth(10),
            marginBottom: adaptToWidth(20),
        },
        guidesTitle: {
            textAlign: 'center',
            marginVertical: adaptToWidth(20),
            fontWeight: '600',
            fontSize: normalizeText(20),
            width: '100%',
            paddingHorizontal: '2.5%',
        },
        guidesCardsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            height: adaptToWidth(414),
            width: '100%',
            borderRadius: adaptToWidth(10),
        },
        guidesCard: {
            justifyContent: 'center',
            alignItems: 'center',
            height: '45%',
            width: '45%',
            margin: '2.5%',
            borderRadius: adaptToWidth(8),
            borderColor: 'black',
            borderWidth: adaptToWidth(0.5),
        },
        guidesGeneralities: {
            backgroundColor: 'blue',
        },
        guidesProducts: {
            backgroundColor: 'green',
        },
        guidesLabels: {
            backgroundColor: 'yellow',
        },
        guidesInterviews: {
            backgroundColor: 'red',
        },
        guidesCardTitle: {
            
        },


        postContainer: {
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            padding: adaptToWidth(20),
            height: adaptToWidth(260),
            width: '100%',
            borderRadius: adaptToWidth(10),
        },
        postTitle: {
            fontWeight: '600',
            fontSize: normalizeText(20),
        },
    })

}
import GameCard from '@/component/GameCard';
import color, { globalstyle } from '@/styles/global';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

/**
 * Component displaying a list of interactive games for user selection
 * @returns {JSX.Element} The rendered Games component
 */
const Games = () => {

    /** Placeholder images for game cards */
    const gameImages = {
        rockPaperScissors: require('../assets/images/RockPaper.png'),
        throwDart: require('../assets/images/ThrowDart.png'),
        spinTheWheel: require('../assets/images/SpintheWheel.png'),
    };

    /** Data array defining the games to display */
    const games = [
        {
            title: 'Rock Paper Scissors',
            description: 'The classic quick decision-maker game.',
            image: gameImages.rockPaperScissors,
            backgroundColor: color.purple,
            screen: "RockPaperScissorsScreen",
        },
        {
            title: 'Throw Dart',
            description: 'Take your aim and throw the dart.',
            image: gameImages.throwDart,
            backgroundColor: color.skyblue,
            screen: "ThrowDartScreen",
        },
        {
            title: 'Spin the Wheel',
            description: 'Spin the wheel and choose a fun challenge.',
            image: gameImages.spinTheWheel,
            backgroundColor: color.darkpurple,
            screen: "SpinTheWheelScreen",
        },
    ];

    return (
        <View style={[styles.container, globalstyle.container]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.container}>
                    <Text style={[globalstyle.text_22_bold_90]}>Choose a Game 🎮</Text>
                    <Text style={[styles.subtitle, globalstyle.text_16_reg_50]}>Find the perfect way to break the ice and have fun!</Text>
                    {/* Game Cards */}
                    {games && games?.map((game, index) => (
                        <GameCard
                            key={index}
                            title={game.title}
                            description={game.description}
                            image={game.image}
                            backgroundColor={game.backgroundColor}
                            screenName={game.screen}
                        />
                    ))}

                </View>
            </ScrollView>
        </View>
    );
};
/**
 * Styles for the Games component
 * @type {Object}
 */
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingTop: 16
    },
    container: {
        flex: 1,
        backgroundColor: color.white
    },
    subtitle: {
        marginTop: 8,
        marginBottom: 20,
    },
});

export default Games;
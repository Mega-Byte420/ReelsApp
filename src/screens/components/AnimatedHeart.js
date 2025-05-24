import React, { useEffect, useRef } from 'react';
import { Animated, Text, Dimensions } from 'react-native';

const AnimatedHeart = () => {
    const position = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(position, {
                toValue: -150,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const leftOffset = Math.random() * 40 - 20;

    return (
        <Animated.View
            style={{
                position: 'absolute',
                bottom: 100,
                left: width / 2 + leftOffset,
                transform: [{ translateY: position }],
                opacity,
            }}
        >
            <Text style={{ fontSize: 24, color: 'red' }}>❤️</Text>
        </Animated.View>
    );
};
export default AnimatedHeart;
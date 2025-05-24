import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Animated,
    Easing,
} from 'react-native';
import Video from 'react-native-video';
import { Share } from 'react-native';

const { width, height } = Dimensions.get('window');
const FlyingHeart = ({ startX, startY }) => {
    const position = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const scale = useRef(new Animated.Value(0)).current;
    const xAxis = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const xMovement = Math.random() * 20 - 10; // Minimal horizontal movement

        Animated.parallel([
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.2,
                    duration: 150,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.quad),
                }),
                Animated.timing(scale, {
                    toValue: 0.9,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]),
            Animated.timing(position, {
                toValue: -80, // Shorter upward distance
                duration: 800,  // Faster animation
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(xAxis, {
                toValue: xMovement,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={{
                position: 'absolute',

                left: startX - 10,
                bottom: startY,
                opacity: opacity,
                transform: [
                    { translateY: position },
                    { translateX: xAxis },
                    { scale: scale },
                ],
            }}
        >
            <Text style={{ fontSize: 24 }}>❤️</Text>
        </Animated.View>
    );
};
export default function ReelItem({ reel, isActive, index, forcePause }) {
    const [paused, setPaused] = useState(!isActive);
    const [liked, setLiked] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [hearts, setHearts] = useState([]);
    const likeAnimation = useRef(new Animated.Value(1)).current;
    const controlsAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Respect forcePause from parent
        if (forcePause) {
            setPaused(true);
        } else {
            setPaused(!isActive);
        }
    }, [isActive, forcePause]);

    const triggerHearts = () => {
        const newHearts = Array.from({ length: 8 }, (_, i) => ({
            id: Date.now() + i,
            startX: width - 60, // Start near the like button
            startY: height - 180 - Math.random() * 50, // Random vertical position
        }));

        setHearts((prev) => [...prev, ...newHearts]);

        // Clean up hearts after animation
        setTimeout(() => {
            setHearts((prev) => prev.filter(heart =>
                !newHearts.some(newHeart => newHeart.id === heart.id)
            ));
        }, 1300);
    };
    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this reel: ${reel.videoUrl}`,
                url: reel.videoUrl, // optional depending on platform
                title: 'Awesome Reel',
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    };

    const handleVideoPress = () => {
        setPaused(!paused);
        setShowControls(true);

        Animated.sequence([
            Animated.timing(controlsAnimation, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.delay(2000),
            Animated.timing(controlsAnimation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => setShowControls(false));
    };


    const handleLike = () => {
        const newLiked = !liked;
        setLiked(newLiked);

        if (newLiked) {
            triggerHearts(); // Only show hearts when liking
        }

        Animated.sequence([
            Animated.timing(likeAnimation, {
                toValue: 1.3,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(likeAnimation, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.videoContainer}
                onPress={handleVideoPress}
                activeOpacity={1}
            >
                <Video
                    source={{ uri: reel.videoUrl }}
                    style={styles.video}
                    resizeMode="stretch"
                    repeat
                    paused={paused}
                    muted={false}
                    volume={5.0}
                />

                {showControls && (
                    <Animated.View
                        style={[
                            styles.playPauseIcon,
                            { opacity: controlsAnimation }
                        ]}
                    >
                        <Text style={styles.playPauseText}>
                            {paused ? '▶️' : '⏸️'}
                        </Text>
                    </Animated.View>
                )}
                {hearts.map((heart) => (
                    <FlyingHeart
                        key={heart.id}
                        startX={heart.startX}
                        startY={heart.startY}
                    />
                ))}
            </TouchableOpacity>

            <View style={styles.overlay}>
                <View style={styles.rightActions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleLike}
                    >
                        <Animated.Text
                            style={[
                                styles.actionIcon,
                                { transform: [{ scale: likeAnimation }] }
                            ]}
                        >
                            {liked ? '❤️' : '🤍'}
                        </Animated.Text>
                        <Text style={styles.actionText}>{reel.likes}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionIcon}>💬</Text>
                        <Text style={styles.actionText}>{reel.comments}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                        <Text style={styles.actionIcon}>📤</Text>
                        <Text style={styles.actionText}>Share</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionIcon}>🎵</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomInfo}>
                    <View style={styles.userInfo}>
                        <Text style={styles.username}>@{reel.username}</Text>
                        <Text style={styles.description}>{reel.description}</Text>
                        {reel.hashtags && (
                            <Text style={styles.hashtags}>{reel.hashtags}</Text>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: '#000',
    },
    videoContainer: {
        width,
        height,
    },
    video: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    playPauseIcon: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    playPauseText: {
        fontSize: 20,
        color: '#fff',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'space-between',
        zIndex: 5,
    },
    rightActions: {
        position: 'absolute',
        bottom: 100,
        right: 15,
    },
    actionButton: {
        alignItems: 'center',
        marginBottom: 20,
    },
    actionIcon: {
        fontSize: 28,
        color: '#fff',
        marginBottom: 5,
    },
    actionText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
    bottomInfo: {
        position: 'absolute',
        bottom: 30,
        left: 15,
        right: 80,
    },
    userInfo: {},
    username: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 5,
        lineHeight: 18,
    },
    hashtags: {
        color: '#1DA1F2',
        fontSize: 14,
    },
});

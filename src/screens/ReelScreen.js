import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    FlatList,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
} from 'react-native';
import Video from 'react-native-video';
import auth from '@react-native-firebase/auth';
import { mockReelsData } from './components/data/mockData';
import ReelItem from './components/ReelItem';
import Toast from 'react-native-toast-message';

const { height } = Dimensions.get('window');

export default function ReelsScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [reels] = useState(mockReelsData);
    const [forcePause, setForcePause] = useState(false); // New state for forced pause
    const flatListRef = useRef(null);

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel', onPress: () => setForcePause(false) },
                {
                    text: 'Logout',
                    onPress: () => {
                        setForcePause(true); // Pause all videos
                        auth().signOut().then(() => {
                            Toast.show({
                                type: 'success',
                                text1: 'Logged out',
                                text2: 'See you soon! 👋',
                            });
                        });
                    }
                },
            ]
        );

    };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index || 0);
        }
    }).current;

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 80,
    };

    const renderReel = ({ item, index }) => (
        <ReelItem
            reel={item}
            isActive={index === currentIndex && !forcePause} // Respect forcePause
            index={index}
            forcePause={forcePause} // Pass down the forcePause prop
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={reels}
                renderItem={renderReel}
                keyExtractor={(item) => item.id}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                getItemLayout={(data, index) => ({
                    length: height,
                    offset: height * index,
                    index,
                })}
                removeClippedSubviews={true}
                maxToRenderPerBatch={3}
                windowSize={5}
            />

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    logoutButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    logoutText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
});

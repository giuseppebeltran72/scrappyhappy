'use client'

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

// Define navigation param list
type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
  // Add other screens as needed
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock data for scrollable sections
const collectItems = [
  { id: '1', title: 'Paper', image: require('../assets/images/paper.png') },
  { id: '2', title: 'Plastic', image: require('../assets/images/plastic.png') },
  { id: '3', title: 'Metal', image: require('../assets/images/metal.png') },
  { id: '4', title: 'E-Waste', image: require('../assets/images/ewaste.png') },
  { id: '5', title: 'Glass', image: require('../assets/images/glass.png') },
  { id: '6', title: 'Organic', image: require('../assets/images/organic.png') },
];

const missionItems = [
  {
    id: '1',
    title: 'Reduce Waste',
    description: 'Our goal is to reduce landfill waste by 50% by 2030',
    image: require('../assets/images/reduce.jpg'),
  },
  {
    id: '2',
    title: 'Educate Communities',
    description: 'Spreading awareness about proper waste management',
    image: require('../assets/images/educate.jpg'),
  },
  {
    id: '3',
    title: 'Reward Recycling',
    description: 'Creating incentives for sustainable practices',
    image: require('../assets/images/reward.png'),
  },
];

const learnItems = [
  {
    id: '1',
    title: 'Recycling 101',
    description: 'Learn the basics of recycling',
    image: require('../assets/images/learn1.png'),
  },
  {
    id: '2',
    title: 'Composting Guide',
    description: 'Turn waste into garden gold',
    image: require('../assets/images/learn2.png'),
  },
  {
    id: '3',
    title: 'Zero Waste Living',
    description: 'Tips for reducing your footprint',
    image: require('../assets/images/learn3.png'),
  },
];

// Feature grid items
const featureItems = [
  {
    id: '1',
    title: 'Eco-connect with companies',
    icon: 'handshake-o',
    type: 'FontAwesome',
  },
  { id: '2', title: 'Scrap Rewards', icon: 'gift', type: 'Feather' },
  { id: '3', title: 'Leaderboard', icon: 'trophy', type: 'FontAwesome5' },
  { id: '4', title: 'Eco Quests', icon: 'map', type: 'Feather' },
  { id: '5', title: 'Segregation', icon: 'trash-2', type: 'Feather' },
  { id: '6', title: 'Locate Areas', icon: 'map-pin', type: 'Feather' },
  { id: '7', title: 'History', icon: 'history', type: 'FontAwesome5' },
  { id: '8', title: 'Refer & Earn', icon: 'share-2', type: 'Feather' },
];

const HomePage = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const [activeTab, setActiveTab] = useState('home');
  const userName = 'Converge'; // user state/context

  const renderIcon = (item: { id?: string; title?: string; icon: any; type: any }) => {
    if (item.type === 'Feather') {
      return <Feather name={item.icon} size={24} color="#4CAF50" />;
    } else if (item.type === 'FontAwesome5') {
      return <FontAwesome5 name={item.icon} size={24} color="#4CAF50" />;
    } else if (item.type === 'FontAwesome') {
      return <FontAwesome name={item.icon} size={24} color="#4CAF50" />;
    } else {
      return <MaterialCommunityIcons name={item.icon} size={24} color="#4CAF50" />;
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Name */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {userName}!</Text>
          <TouchableOpacity>
            <View style={styles.profileIcon}>
              <Text style={styles.profileInitial}>{userName.charAt(0)}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ScrappyHappy Container */}
        <View style={styles.scrappyContainer}>
          <Text style={styles.appTitle}>ScrappyHappy</Text>
          <Text style={styles.appTagline}>Scrap Smart, Save the Earth</Text>
          <Text style={styles.appCta}>
            Make Change! What are we gonna do today?
          </Text>
        </View>

        {/* 4x2 Grid Tiles */}
        <View style={styles.gridContainer}>
          {featureItems.map(item => (
            <TouchableOpacity key={item.id} style={styles.gridItem}>
              <View style={styles.iconContainer}>{renderIcon(item)}</View>
              <Text style={styles.gridItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* What We Collect Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>What We Collect</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}>
            {collectItems.map(item => (
              <TouchableOpacity key={item.id} style={styles.collectItem}>
                <Image source={item.image} style={styles.collectImage} />
                <Text style={styles.collectText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Our Mission Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}>
            {missionItems.map(item => (
              <TouchableOpacity key={item.id} style={styles.missionItem}>
                <Image source={item.image} style={styles.missionImage} />
                <Text style={styles.missionTitle}>{item.title}</Text>
                <Text style={styles.missionDescription}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Learn Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Learn</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}>
            {learnItems.map(item => (
              <TouchableOpacity key={item.id} style={styles.learnItem}>
                <Image source={item.image} style={styles.learnImage} />
                <Text style={styles.learnTitle}>{item.title}</Text>
                <Text style={styles.learnDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bottom padding to ensure content isn't hidden behind the navigation bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[
            styles.navButton,
            activeTab === 'home' && styles.activeNavButton,
          ]}
          onPress={() => setActiveTab('home')}>
          <Feather
            name="home"
            size={24}
            color={activeTab === 'home' ? '#4CAF50' : '#757575'}
          />
          <Text
            style={[
              styles.navText,
              activeTab === 'home' && styles.activeNavText,
            ]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, activeTab === "scan" && styles.activeNavButton]}
          onPress={() => {
            setActiveTab("scan")
            navigation.navigate("Scan")
          }}
        >
          <View style={styles.scanButton}>
            <Feather name="camera" size={24} color="#FFFFFF" />
          </View>
          <Text
            style={[
              styles.navText,
              activeTab === 'scan' && styles.activeNavText,
            ]}>
            Scan QR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            activeTab === 'more' && styles.activeNavButton,
          ]}
          onPress={() => setActiveTab('more')}>
          <Feather
            name="menu"
            size={24}
            color={activeTab === 'more' ? '#4CAF50' : '#757575'}
          />
          <Text
            style={[
              styles.navText,
              activeTab === 'more' && styles.activeNavText,
            ]}>
            More
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrappyContainer: {
    backgroundColor: '#4CAF50',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  appTagline: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  appCta: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  gridItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  gridItemText: {
    fontSize: 10,
    textAlign: 'center',
    color: '#333',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    color: '#333',
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  collectItem: {
    marginRight: 15,
    alignItems: 'center',
    width: 100,
  },
  collectImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    backgroundColor: '#E8F5E9',
    marginBottom: 8,
  },
  collectText: {
    fontSize: 14,
    color: '#333',
  },
  missionItem: {
    width: width * 0.7,
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  missionImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  missionDescription: {
    fontSize: 14,
    color: '#666',
  },
  learnItem: {
    width: width * 0.7,
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  learnImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  learnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  learnDescription: {
    fontSize: 14,
    color: '#666',
  },
  bottomPadding: {
    height: 80,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingBottom: 10,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavButton: {
    // Additional styling for active tab if needed
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#757575',
  },
  activeNavText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  scanButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default HomePage;
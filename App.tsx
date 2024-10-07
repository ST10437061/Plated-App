import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Subscription" component={SubscriptionPage} />
        <Stack.Screen name="Welcome" component={WelcomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ ...props.style, opacity: fadeAnim }}>
      {props.children}
    </Animated.View>
  );
};

function isEmpty(value) {
  return (
    value == null || 
    (value.hasOwnProperty('length') && value.length === 0) || 
    (value.constructor === Object && Object.keys(value).length === 0)
  );
};

function LandingPage({ navigation }) {
  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Image source={require('./assets/menu.jpeg')} style={styles. />
          </View>

          <View style={styles.container}>
            <Text style={styles.welcomeText}>
              Welcome to Christoffel's Menu App! Explore the finest cuisines and dishes tailored to your taste.
            </Text>
          </View>

          <View>
            <TouchableOpacity style={styles.buttonStyle}
              onPress={() => {
                navigation.navigate('Subscription');
              }}>
              <Text style={styles.buttonTextStyle}>EXPLORE MENU</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function SubscriptionPage({ navigation }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState(0);
  const [selectedMealType, setSelectedMealType] = useState(0);

  const cuisines = [
    { key: 1, value: 'Italian' },
    { key: 2, value: 'French' },
    { key: 3, value: 'Asian' },
    { key: 4, value: 'African' },
  ];

  const mealTypes = [
    { key: 1, value: 'Appetizers' },
    { key: 2, value: 'Main Course' },
    { key: 3, value: 'Desserts' },
    { key: 4, value: 'Drinks' }
  ];

  const [error, setError] = useState('');

  return (
    <View>
      <SafeAreaView>
        <ScrollView>

          <FadeInView>
            <Text style={styles.error}>{error}</Text>

            <View style={styles.section}>
              <TextInput
                onChangeText={setName}
                placeholder="Enter your name"
                style={styles.inputStyle}
                placeholderTextColor='#1d2d57'
              />
            </View>

            <View style={styles.section}>
              <TextInput
                onChangeText={setSurname}
                placeholder="Enter your surname"
                style={styles.inputStyle}
                placeholderTextColor='#1d2d57'
              />
            </View>

            <View style={styles.section}>
              <TextInput
                onChangeText={setEmail}
                placeholder="Enter your email address"
                style={styles.inputStyle}
                keyboardType="email-address"
                placeholderTextColor='#1d2d57'
              />
            </View>

            <View style={styles.section}>
              <TextInput
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                style={styles.inputStyle}
                keyboardType="phone-pad"
                placeholderTextColor='#1d2d57'
              />
            </View>

            <View style={styles.sectionList}>
              <SelectList
                setSelected={setSelectedCuisine}
                data={cuisines}
                placeholder="Please select your preferred cuisine"
              />
            </View>

            <View style={styles.sectionList}>
              <SelectList
                setSelected={setSelectedMealType}
                data={mealTypes}
                placeholder="Please select your meal type"
              />
            </View>

            <View>
              <TouchableOpacity style={styles.buttonStyle}
                onPress={() => {
                  if (!isEmpty(name) && !isEmpty(surname) && !isEmpty(email) && !isEmpty(phone) && selectedCuisine !== 0 && selectedMealType !== 0) {
                    navigation.navigate('Welcome', {
                      nameKey: name,
                      surnameKey: surname,
                      emailKey: email,
                      phoneKey: phone,
                      cuisineKey: selectedCuisine,
                      mealTypeKey: selectedMealType
                    });
                    setError('');
                  } else {
                    setError('Please fill in all the required fields');
                  }
                }}>
                <Text style={styles.buttonTextStyle}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </FadeInView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function WelcomePage({ route }) {
  const { nameKey: name, surnameKey: surname, cuisineKey: cuisine, mealTypeKey: mealType } = route.params;

  const cuisineOptions = {
    1: 'Italian',
    2: 'French',
    3: 'Asian',
    4: 'African'
  };

  const mealTypeOptions = {
    1: 'Appetizers',
    2: 'Main Course',
    3: 'Desserts',
    4: 'Drinks'
  };

  const selectedCuisine = cuisineOptions[cuisine];
  const selectedMealType = mealTypeOptions[mealType];

  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome, {name} {surname}!</Text>
            <Text style={styles.welcomeText}>You are subscribed to {selectedCuisine} cuisine and {selectedMealType} meal options.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 50
  },
  welcomeText: {
    color: '#1d2d57',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 15
  },
  buttonStyle: {
    backgroundColor: '#1d2d57',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#1d2d57',
    height: 50,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 25,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#e4be1b',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  section: {
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  sectionList: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    color: '#1d2d57',
    paddingLeft: 15,
    paddingRight: 15


import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const MainScreen = ({ navigation, route }: { navigation: any; route: { params: { newItem?: any } } }) => {

  const [menuItems, setMenuItems] = useState([
    { course: 'Starter', name: 'Bruschetta', description: 'Tomato and basil on grilled bread' },
    { course: 'Main Course', name: 'Grilled Steak', description: 'Perfectly grilled steak with sides' },
    { course: 'Dessert', name: 'Chocolate Mousse', description: 'Rich chocolate mousse with cream' },
  ]);

  // If a new item is passed from AddMenuItemScreen, add it to the list
  if (route.params?.newItem) {
    setMenuItems([...menuItems, route.params.newItem]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.course}>{item.course}</Text>
            <Text>{item.name} - {item.description}</Text>
          </View>
        )}
      />
      <Button title="Add Menu Item" onPress={() => navigation.navigate('AddMenuItemScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuItem: {
    marginVertical: 10,
  },
  course: {
    fontWeight: 'bold',
  },
});
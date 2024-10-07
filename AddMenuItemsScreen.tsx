import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function AddMenuItemScreen({ navigation }: any) {
  const [course, setCourse] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddItem = () => {
    const newItem = { course, name, description };
    navigation.navigate('Home', { newItem });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Course (e.g., Starter, Main Course, Dessert)"
        value={course}
        onChangeText={setCourse}
        style={styles.input}
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
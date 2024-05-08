import React, { useState } from 'react';
import Livro from '../components/Livro'; // Assuming Livro is a TypeScript component
import { SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getLivros } from '../api/livros';
import { Book, ScreenName } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

export default function EmprestimoScreen({ navigation }: {navigation: any}) {

	//const navigation = useNavigation<StackNavigationProp<any>>();

	const livrosQuery = useQuery({
		queryKey: ['livros'],
		queryFn: getLivros,
	});

	const handleNavigate = (screenName: ScreenName, bookId: number) => {
		navigation.navigate(screenName.name, {bookId});
	};

	const renderItem = ({ item }: { item: Book }) => (
		<TouchableOpacity onPress={() => handleNavigate({ name: 'DetalhesScreen' }, item.id)}>
			<Livro title={item.titulo} author={item.autor} />
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Biblioteca</Text>

			<FlatList
				data={livrosQuery.data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
			/>

		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F4F4',
		padding: 20,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#333',
		marginBottom: 20,
	},
	selectedBookContainer: {
		marginTop: 20,
	},
	selectedBookTitle: {
		fontSize: 20,
		color: '#333',
		marginBottom: 10,
		fontStyle: 'italic',
	},
	input: {
		height: 40,
		borderColor: '#ddd',
		borderWidth: 1,
		marginBottom: 10,
		padding: 10,
	},
	label: {
		fontSize: 18,
		color: '#333',
		marginBottom: 5,
	},
	borrowButton: {
		backgroundColor: '#4CAF50',
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 5,
		alignItems: 'center',
	},
	borrowButtonText: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
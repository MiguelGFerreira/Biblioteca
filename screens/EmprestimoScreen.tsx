import React, { useState } from 'react';
import Livro from '../components/Livro';
import { SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getLivros } from '../api/livros';
import { Book, ScreenName } from '../types';

export default function EmprestimoScreen({ navigation }: { navigation: any }) {

	const [searchQuery, setSearchQuery] = useState('');

	const searchLivros = (query: string) => {
		const lowerCaseQuery = query.toLowerCase().trim();
		return livrosQuery.data.filter((livro: { titulo: string; autor: string; }) =>
			livro.titulo.toLowerCase().includes(lowerCaseQuery) || livro.autor.toLowerCase().includes(lowerCaseQuery)
		);
	};

	const livrosQuery = useQuery({
		queryKey: ['livros'],
		queryFn: getLivros,
	});

	const handleNavigate = (screenName: ScreenName, bookId: number) => {
		navigation.navigate(screenName.name, { bookId });
	};

	const renderItem = ({ item }: { item: Book }) => (
		<View>
			<TouchableOpacity onPress={() => handleNavigate({ name: 'DetalhesScreen' }, item.id)}>
				<Livro title={item.titulo} author={item.autor} image={item.link_capa} />
			</TouchableOpacity>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Biblioteca</Text>

			<TextInput
				style={styles.searchInput}
				placeholder="Pesquisar por título ou autor"
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>

			<FlatList
				contentContainerStyle={styles.livroContainer}
				data={searchQuery ? searchLivros(searchQuery) : livrosQuery.data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				numColumns={2}
			/>

		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		alignItems: 'center',
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#333',
		textAlign: 'center',
		marginTop: 20,
		marginBottom: 20,
	},
	searchInput: {
		width: '90%',
		height: 40,
		borderWidth: 1,
		borderColor: '#fff',
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 20,
	},
	livroContainer: {
		width: '100%',
		paddingHorizontal: 10,
		justifyContent: 'space-between',
	},
});

import React, { useState } from 'react';
import Livro from '../components/Livro'; // Assuming Livro is a TypeScript component
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Book {
	id: number;
	titulo: string;
	autor: string;
}

const Livros = [
	{ id: 1, titulo: 'Livro 1', autor: "Miguel", matricula: "220992" },
	{ id: 2, titulo: 'Livro 2', autor: "Leonardo", matricula: "220908" },
	{ id: 3, titulo: 'Livro 3', autor: "Liniker", matricula: "222222" },
];


export default function DevolucaoScreen() {
	const [livroSelecionado, setLivroSelecionado] = useState<Book | null>(null);
	const [matricula, setMatricula] = useState('');

	const navigation = useNavigation();

	const handleBookSelection = (book: Book) => {
		setLivroSelecionado(book);
	};

	const handleMatriculaChange = (text: string) => {
		setMatricula(text);
	};

	const handleBorrowBook = () => {
		if (!matricula) {
			alert('Insira sua matrícula para continuar.');
			return;
		}

		alert('Livro emprestado com sucesso!');
		setLivroSelecionado(null);
		setMatricula('');
		navigation.goBack();
	};

	const renderItem = ({ item }: { item: Book }) => (
		<TouchableOpacity onPress={() => handleBookSelection(item)}>
			<Livro title={item.titulo} author={item.autor} isSelected={livroSelecionado === item} />
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Biblioteca</Text>

			<FlatList
				data={Livros}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
			/>

			{livroSelecionado && (
				<View style={styles.selectedBookContainer}>
					<Text style={styles.label}>Selecionado:</Text>
					<Text style={styles.selectedBookTitle}>{livroSelecionado.titulo}</Text>

					<Text style={styles.label}>Matrícula:</Text>
					<TextInput
						keyboardType="numeric"
						maxLength={6}
						style={styles.input}
						value={matricula}
						onChangeText={handleMatriculaChange}
					/>

					<TouchableOpacity style={styles.borrowButton} onPress={handleBorrowBook}>
						<Text style={styles.borrowButtonText}>Emprestar Livro</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
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
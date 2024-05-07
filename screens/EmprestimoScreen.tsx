import React, { useEffect, useState } from 'react';
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

export default function EmprestimoScreen() {
	const [livroSelecionado, setLivroSelecionado] = useState<Book | null>(null);
	const [matricula, setMatricula] = useState('');
	const [livros, setLivros] = useState([]);

	const navigation = useNavigation();

	// const getLivros = async (): Promise<Book[]> => {
	// 	try {
	// 		const response = await axios.get('http://localhost:3000/express-biblioteca/livros');
	// 		return response.data;
	// 	} catch (error) {
	// 		console.error(error);
	// 		return [];
	// 	}
	// };

	const fetchData = () => {
		const baseURL = "http://127.0.0.1:3000/express-biblioteca";
		axios.get(`${baseURL}/livros`).then((response) => console.log(response.data));
	};

	const getLivros = async () => {
		const response = await fetch(`http://localhost:3000/express-biblioteca/livros`);
		const data = await response.json();
		setLivros(data);
	}

	// const livrosQuery = useQuery<Book[], Error>({
	// 	queryKey: ['livros'],
	// 	queryFn: getLivros,
	// });

	// const livros = livrosQuery.data || [];

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

	useEffect(() => {
		fetchData();
	}, []);

	console.log("Livros: " + livros.length);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Biblioteca</Text>

			<FlatList
				data={livros}
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
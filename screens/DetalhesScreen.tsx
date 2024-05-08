import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Book } from "../types";
import { getLivroById } from "../api/livros";
import { useQuery } from "@tanstack/react-query";


export default function DetalhesScreen({ route }: { route: any }) {

	const id: number = route.params.bookId;

	const [livroSelecionado, setLivroSelecionado] = useState<Book | null>(null);
	const [matricula, setMatricula] = useState('');
	const [livro, setLivro] = useState<Book | null>(null);

	const getBookData = async () => {
		setLivro(await getLivroById(id));
	}
	
	if (livro == null) {
		getBookData();
	}

	console.log(livro?.autor)
	
	const handleBookSelection = (book: Book) => {
		setLivroSelecionado(book);
	};

	const handleMatriculaChange = (text: string) => {
		setMatricula(text);
	};

	const handleBorrowBook = () => {
		if (!matricula || matricula.length < 6) {
			alert('Insira sua matrícula para continuar.');
			return;
		}

		/*if (paginas < 200) {
			devolver = 10;
		} else if (paginas < 400) {
			devolver = 15;
		} else if (paginas < 500) {
			devolver = 20;
		} else if (paginas < 600) {
			devolver = 25;
		} else if (paginas < 700) {
			devolver = 30;
		} else {
			devolver = 35;
		}*/

		alert('Livro emprestado com sucesso!');
		setLivroSelecionado(null);
		setMatricula('');
		//navigation.goBack();
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.label}>Selecionado: {livro?.autor}</Text>
			<Text style={styles.selectedBookTitle}>{id}</Text>

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
		</SafeAreaView>
	)
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
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Book } from "../types";
import { getLivroById } from "../api/livros";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import BookItem from "../components/Livro";
import { postReserva } from "../api/reservas";


export default function DetalhesScreen({ route }: { route: any }) {

	const id: number = route.params.bookId;

	const [livroSelecionado, setLivroSelecionado] = useState<Book | null>(null);
	const [matricula, setMatricula] = useState('');

	const livroQuery = useQuery({
		queryKey: ['livro', id],
		queryFn: () => getLivroById(id),
	})

	const handleMatriculaChange = (text: string) => {
		setMatricula(text);
	};

	const addDays = (days: number) => {
		const result = new Date();
		result.setDate(result.getDate() + days);
		return result.toLocaleDateString('pt-BR');
	}

	const calculaDevolução = (paginas: number) => {
		if (paginas < 200) {
			return addDays(10);
		} else if (paginas < 400) {
			return addDays(15);
		} else if (paginas < 500) {
			return addDays(20);
		} else if (paginas < 600) {
			return addDays(25);
		} else if (paginas < 700) {
			return addDays(30);
		} else {
			return addDays(35);
		}
	}

	const handleBorrowBook = async () => {
		if (!matricula || matricula.length < 6) {
			alert('Insira sua matrícula para continuar.');
			return;
		}

		const devolucao = calculaDevolução(livroQuery.data[0].paginas);
		if (await postReserva(livroQuery.data[0].id, matricula)) {
			alert(`Livro emprestado com sucesso! \nFavor devolver até o dia ${devolucao}`);
			setLivroSelecionado(null);
			setMatricula('');
		} else {
			alert("Algo deu errado.")
		}
	};

	if (livroQuery.isLoading) {
		return <Loader isLoading={true} />
	}
	if (livroQuery.isError) {
		return (
			<SafeAreaView>
				<Text>ERRO</Text>
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.bookInfoContainer}>
				<Image
					source={{ uri: livroQuery.data[0].link_capa }}
					style={styles.bookImage}
					resizeMode='contain'
				/>
				<Text style={styles.bookTitle}>{livroQuery.data[0].titulo}</Text>
				<Text style={styles.bookAuthor}>{livroQuery.data[0].autor}</Text>
				<Text style={styles.bookCategory}>{livroQuery.data[0].categoria}</Text>
				<Text style={styles.bookSubcategory}>{livroQuery.data[0].subcategoria}</Text>
				<TextInput
					style={styles.matriculaInput}
					keyboardType="numeric"
					maxLength={6}
					value={matricula}
					onChangeText={handleMatriculaChange}
					placeholder="Digite sua matricula"
				/>
				<TouchableOpacity
					style={styles.borrowButton}
					onPress={handleBorrowBook}
				>
					<Text style={styles.borrowButtonText}>Pegar Emprestado</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	bookInfoContainer: {
		alignItems: 'center',
	},
	bookImage: {
		width: 200,
		height: 300,
		marginBottom: 20,
	},
	bookTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	bookAuthor: {
		fontSize: 18,
		marginBottom: 5,
	},
	bookCategory: {
		fontSize: 16,
		marginBottom: 5,
	},
	bookSubcategory: {
		fontSize: 16,
		marginBottom: 20,
	},
	matriculaInput: {
		width: '100%',
		height: 60,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		padding: 10,
		marginBottom: 20,
	},
	borrowButton: {
		backgroundColor: '#4CAF50',
		padding: 15,
		borderRadius: 5,
		marginBottom: 10,
		textAlign: "center",
		alignItems: "center",
		width: "100%",
	},
	borrowButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
});

import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Book } from "../types";
import { getLivroById } from "../api/livros";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";


export default function DetalhesScreen({ route }: { route: any }) {

	const id: number = route.params.bookId;

	const [livroSelecionado, setLivroSelecionado] = useState<Book | null>(null);
	const [matricula, setMatricula] = useState('');

	const livroQuery = useQuery({
		queryKey: ['livro', id],
		queryFn: () => getLivroById(id),
	})

	console.log(livroQuery)

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
					source={{ uri: 'https://th.bing.com/th/id/R.598b0c21ae7577e3911bdeaf215f6a10?rik=mYGFFMxcvtQW6w&riu=http%3a%2f%2fpngimg.com%2fuploads%2fbook%2fbook_PNG2116.png&ehk=t3rvVsFXFNhJQE%2bHTxNEsklPMuqozVePr1XVCsPPJ9w%3d&risl=&pid=ImgRaw&r=0' }}
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

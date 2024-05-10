import React from 'react';
import { SafeAreaView, Text, StyleSheet, Image, Dimensions, Animated } from 'react-native';

interface ReservaProps {
	title: string;
	matricula: number;
	dataEmprestimo: string;
}

const BookItem: React.FC<ReservaProps> = ({ title, matricula, dataEmprestimo }) => {

	return (
		<SafeAreaView style={styles.reservaCard}>
			<Text style={styles.reservaTitle}>{title}</Text>
			<Text style={styles.reservaMatricula}>{matricula}</Text>
			<Text style={styles.reservaMatricula}>{dataEmprestimo}</Text>
		</SafeAreaView>
	);
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	reservaCard: {
		width: (windowWidth - 40) / 2,
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 20,
		marginBottom: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	reservaTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 5,
	},
	reservaMatricula: {
		fontSize: 14,
		color: '#666',
	},
});

export default BookItem;

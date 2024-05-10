import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ReservaProps {
	title: string;
	matricula: string;
	dataEmprestimo: string;
}

const ReservaCard: React.FC<ReservaProps> = ({ title, matricula, dataEmprestimo }) => {

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.text}>Matrícula: {matricula}</Text>
			<Text style={styles.text}>Data do Empréstimo: {dataEmprestimo}</Text>
		</View>
	);
};


const styles = StyleSheet.create({
	container: {
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
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	text: {
		fontSize: 16,
		marginBottom: 5,
	},
});

export default ReservaCard;

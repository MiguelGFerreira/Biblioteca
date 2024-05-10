import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Reserva } from '../types';
import { getReservas, patchReserva } from '../api/reservas';
import ReservaCard from '../components/ReservaCard';


export default function DevolucaoScreen() {
	const [matricula, setMatricula] = useState('');
	const [showBox, setShowBox] = useState(true);

	const navigation = useNavigation();
	const queryClient = useQueryClient();

	const reservasQuery = useQuery({
		queryKey: ['reservas'],
		queryFn: getReservas,
	});

	const handleMatriculaChange = (text: string) => {
		setMatricula(text);
	};

	const handleDevolucao = async (idReserva: number) => {
		return Alert.alert(
			"Está certo disso?",
			"Você quer devolver este livro??",
			[
				{
					text: "Sim",
					onPress: async () => {
						await patchReserva(idReserva);
						queryClient.invalidateQueries({queryKey: ['reservas']})
						alert("Livro devolvido! \nObrigado!");
					},
				},
				{
					text: "Não",
				},
			]
		);
	}

	const renderItem = ({ item }: { item: Reserva }) => (
		<TouchableOpacity onPress={() => handleDevolucao(item.id_reserva)}>
			<ReservaCard title={item.titulo} dataEmprestimo={item.data_emprestimo.substring(0, 10)} matricula={item.matricula} />
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Reservas</Text>

			<FlatList
				data={reservasQuery.data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id_reserva.toString()}
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
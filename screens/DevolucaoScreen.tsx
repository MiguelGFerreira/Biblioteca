import React from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity, Alert, View } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Reserva } from '../types';
import { getReservas, patchReserva } from '../api/reservas';
import ReservaCard from '../components/ReservaCard';


export default function DevolucaoScreen() {
	const queryClient = useQueryClient();

	const reservasQuery = useQuery({
		queryKey: ['reservas'],
		queryFn: getReservas,
	});

	const handleDevolucao = async (idReserva: number) => {
		return Alert.alert(
			"Está certo disso?",
			"Você quer devolver este livro??",
			[
				{
					text: "Sim",
					onPress: async () => {
						await patchReserva(idReserva);
						queryClient.invalidateQueries({ queryKey: ['reservas'] })
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
			<View style={styles.reservaCard}>
				<ReservaCard title={item.titulo} dataEmprestimo={item.data_emprestimo.substring(0, 10)} matricula={item.matricula} />
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Reservas</Text>

			<FlatList
				style={styles.flatList}
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
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	flatList: {
		flex: 1,
		paddingHorizontal: 20,
	},
	reservaCard: {
		backgroundColor: '#f0f0f0',
		borderRadius: 10,
		padding: 20,
		marginBottom: 20,
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface ScreenName {
	name: string;
}

const HomeScreen = () => {
	const navigation = useNavigation<StackNavigationProp<any>>();

	const handleNavigate = (screenName: ScreenName) => {
		navigation.navigate(screenName.name);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Bem Vindo!</Text>
			<TouchableOpacity
				style={styles.actionButton}
				onPress={() => handleNavigate({ name: 'EmprestimoScreen' })}
			>
				<Text style={styles.actionButtonText}>Empréstimo</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.actionButton}
				onPress={() => handleNavigate({ name: 'DevolucaoScreen' })}
			>
				<Text style={styles.actionButtonText}>Devolução</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f0f0f0',
		padding: 20,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 30,
		color: '#333',
	},
	actionButton: {
		backgroundColor: '#4CAF50',
		padding: 15,
		borderRadius: 5,
		marginBottom: 10,
		textAlign: "center",
		alignItems: "center",
		width: "60%",
	},
	actionButtonText: {
		fontSize: 16,
		color: 'white',
		fontWeight: 'bold',
		textTransform: 'uppercase',
	},
});

export default HomeScreen;

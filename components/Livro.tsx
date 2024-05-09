import React from 'react';
import { SafeAreaView, Text, StyleSheet, Image, Dimensions, Animated } from 'react-native';

interface BookItemProps {
	title: string;
	author: string;
	image: string;
}

const BookItem: React.FC<BookItemProps> = ({ title, author, image }) => {

	return (
		<SafeAreaView style={styles.bookCard}>
			<Image
				source={{ uri: image }}
				style={styles.bookImage}
				resizeMode='contain'
			/>
			<Text style={styles.bookTitle}>{title}</Text>
			<Text style={styles.bookAuthor}>{author}</Text>
		</SafeAreaView>
	);
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	bookCard: {
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
	bookImage: {
		width: '100%',
		height: 150,
		marginBottom: 10,
		borderRadius: 10,
	},
	bookTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 5,
	},
	bookAuthor: {
		fontSize: 14,
		color: '#666',
	},
});

export default BookItem;

import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

interface BookItemProps {
	title: string;
	author: string;
	image: string;
}

const BookItem: React.FC<BookItemProps> = ({ title, author, image }) => {

	return (
		<View style={styles.bookCard}>
			<Image
				source={{ uri: image }}
				style={styles.bookImage}
				resizeMode='contain'
			/>
			<Text style={styles.bookTitle}>{title}</Text>
			<Text style={styles.bookAuthor}>{author}</Text>
		</View>
	);
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	bookCard: {
		width: (windowWidth - 40) / 2,
		height: "auto",
		borderRadius: 10,
		padding: 20,
		marginBottom: 20,
		
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

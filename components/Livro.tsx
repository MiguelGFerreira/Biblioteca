import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

interface BookItemProps {
	title: string;
	author: string;
}

const BookItem: React.FC<BookItemProps> = ({ title, author }) => {

	return (
		<SafeAreaView>
			<Text style={styles.bookTitle}>{title}</Text>
			<Text style={styles.bookAuthor}>{author}</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	bookTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333',
	},
	bookAuthor: {
		fontSize: 16,
		color: '#999',
	},
	selectedBookItem: {
		backgroundColor: '#F0F0F0',
	},
});

export default BookItem;

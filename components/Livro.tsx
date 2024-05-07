import React from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';


interface BookItemProps {
	title: string;
	author: string;
	isSelected: boolean;
}

const BookItem: React.FC<BookItemProps> = ({ title, author, isSelected }) => {
	const bookItemStyle = isSelected ? styles.selectedBookItem : {};

	return (
		<View style={bookItemStyle}>
			<Text style={styles.bookTitle}>{title}</Text>
			<Text style={styles.bookAuthor}>{author}</Text>
		</View>
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

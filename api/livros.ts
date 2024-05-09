import axios from "axios";

const API_URL = 'http://10.10.200.70:3000/express-biblioteca/livros';

export const getLivros = async () => {
	try {
		const response = await axios.get(`${API_URL}/`);
		return await response.data;
	} catch (error) {
		console.error(error)
	}
}

export const getLivroById = async (id: number) => {
	try {
		const response = await axios.get(`${API_URL}/${id}`);
		return await response.data;
	} catch (error) {
		console.error(error)
	}
}
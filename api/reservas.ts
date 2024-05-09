import axios from "axios";

const API_URL = 'http://10.10.200.70:3000/express-biblioteca/reservas';

export const getReservas = async () => {
	try {
		const response = await axios.get(`${API_URL}/`);
		return await response.data;
	} catch (error) {
		console.error(error)
	}
}

export const getReservaById = async (id: number) => {
	try {
		const response = await axios.get(`${API_URL}/${id}`);
		return await response.data;
	} catch (error) {
		console.error(error)
	}
}

export const postReserva = async (idLivro: number, matricula: string) => {
	try {
		axios.post( `${API_URL}/`, {
			idLivro: idLivro,
			matricula: matricula
		}) // continue
	} catch (error) {
		console.error(error);
	}
}
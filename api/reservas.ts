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
		const response = await axios.post(`${API_URL}/`, {
			ID_LIVRO: idLivro,
			MATRICULA: matricula
		});

		if (response.status !== 200) {
			console.error(`Erro reservando livro: ${response.data.message}`);
			return false;
		}

		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};


export const patchReserva = async (idReserva: number) => {
	try {
		const response = await axios.patch(`${API_URL}/${idReserva}`, {
			id: idReserva
		})

		if (response.status !== 200) {
			console.error(`Erro devolvendo o livro: ${response.data.message}`);
			return false;
		}

		return true;
	} catch (error) {
		console.error(error)
	}
}
export interface ScreenName {
	name: string;
}

export interface Book {
	id: number;
	titulo: string;
	autor: string;
	categoria: string;
	subcategoria: string;
	status: string;
	paginas: number;
	link_capa: string;
}

export interface Reserva {
	id_reserva: number;
	id_livro: number;
	titulo: string;
	matricula: number;
	data_emprestimo: string;
}
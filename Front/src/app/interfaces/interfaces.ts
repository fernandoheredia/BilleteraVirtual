export interface DataTransacciones {
    classRed:             boolean;
    idTipoOperacion:      number;
    codigoMovimientoText: string;
    cotARSvsBTC:          number;
    cuenta:               number;
    debe:                 number;
    fecha:                string;
    haber:                number;
    id:                   number;
    idUsuario:            number;
    imgCuenta:            string;
    monto:                number;
    signo:                string;
    booleanARS:           boolean;
}

export interface Portafolio {
    ars: number;
    btc: number;
    ars_img: string;
    btc_img: string;
}
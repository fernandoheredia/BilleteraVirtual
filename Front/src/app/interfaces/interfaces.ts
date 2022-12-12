export interface DataTransacciones {
    classRed:             boolean;
    codigoMovimiento:     string;
    codigoMovimientoText: string;
    cotARSvsBTC:          number;
    cuenta:               string;
    cuentaNombre:         string;
    debe:                 number;
    fecha:                string;
    haber:                number;
    id:                   number;
    idUsuario:            number;
    imgCuenta:            string;
    monto:                number;
    signo:                string;
    booleanARS:           boolean;
    idTipoOperacion:      number;
}

export interface Portafolio {
    ars: number;
    btc: number;
    ars_img: string;
    btc_img: string;
}

export interface IntegranteEquipo{
    imagen : string;
    name: string;
    perfil:string;
}
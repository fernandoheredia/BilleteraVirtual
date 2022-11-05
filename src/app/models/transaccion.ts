export class Transaccion
{
    idUsuario: number;
    codigoMovimiento: string;
    cuenta: string;
    fecha: string;
    debe : number; 
    haber: number;
    cotARSvsBTC: number;

    constructor(idUsuario:number,codigoMovimiento: string,cuenta: string,fecha: string,debe : number,
        haber: number, cotARSvsBTC: number)
    {
        this.idUsuario=idUsuario;
        this.codigoMovimiento=codigoMovimiento;
        this.cuenta=cuenta;
        this.fecha=fecha;
        this.debe=debe; 
        this.haber=haber;
        this.cotARSvsBTC=cotARSvsBTC;
    }
}
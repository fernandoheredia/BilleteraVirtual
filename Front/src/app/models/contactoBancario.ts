export class ContactoBancario
{
    idContacto:number;
    idUsuario:number;
    cbu:string;
    beneficiario:string;

    constructor(idContacto:number,idUsuario:number,cbu:string,beneficiario:string)
    {
        this.idContacto=idContacto;
        this.idUsuario=idUsuario;
        this.cbu=cbu;
        this.beneficiario=beneficiario;
    }
}
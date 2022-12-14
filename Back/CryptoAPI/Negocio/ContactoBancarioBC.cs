using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio
{
    public class ContactoBancarioBC
    {
        public List<ContactoBancario> ObtenerContactosBancarios( crypto_dbContext db, int userId) 
        {
            return db.ContactosBancarios.Where(r => r.IdUsuario == userId).ToList();
        }

        public void RegistrarContactos(crypto_dbContext db, int idUsuario)
        {
            List<string> beneficiarioList = new List<string> { "pepe", "lucia", "tini", "maria", "luis", "jose", "francisco", "leonel", "julian", "tito","palomo" };
            string beneficiario;
            string cbu;
            Random rand = new Random();
            Random randName = new Random();
            for (int i = 1; i <= 2; i++)
            {
                ContactoBancario miContacto = new ContactoBancario();
                var x = rand.Next(0, 10000000);
                cbu = x.ToString("0000000");
                var y = randName.Next(0, 9);
                beneficiario = beneficiarioList[y];
                miContacto.IdUsuario = idUsuario;
                miContacto.Cbu = cbu;
                miContacto.Beneficiario = beneficiario;
                db.ContactosBancarios.Add(miContacto);
                db.SaveChanges();
            }
        }
    }
}

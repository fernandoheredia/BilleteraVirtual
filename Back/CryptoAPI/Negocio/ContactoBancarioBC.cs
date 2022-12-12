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
    }
}

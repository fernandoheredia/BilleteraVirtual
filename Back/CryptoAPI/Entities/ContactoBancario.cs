using System;
using System.Collections.Generic;

namespace Entities
{
    public partial class ContactoBancario
    {
        public ContactoBancario()
        {
            Operaciones = new HashSet<Operacion>();
        }

        public int IdContacto { get; set; }
        public int IdUsuario { get; set; }
        public string Cbu { get; set; } = null!;

        public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
        public virtual ICollection<Operacion> Operaciones { get; set; }
    }
}

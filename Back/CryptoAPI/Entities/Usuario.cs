using System;
using System.Collections.Generic;

namespace Entities
{
    public partial class Usuario
    {
        public Usuario()
        {
            ContactoBancario = new HashSet<ContactoBancario>();
            Cuenta = new HashSet<Cuenta>();
        }

        public int IdUsuario { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public DateTime FechaAlta { get; set; }
        public DateTime? FechaBaja { get; set; }
        public DateTime FechaNacimiento { get; set; }

        public virtual ICollection<ContactoBancario> ContactoBancario { get; set; }
        public virtual ICollection<Cuenta> Cuenta { get; set; }
    }
}

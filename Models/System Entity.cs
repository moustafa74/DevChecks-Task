using Microsoft.EntityFrameworkCore;

namespace DevChecks_Task.Models
{
    public class System_Entity:DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public System_Entity() { }  
        public System_Entity(DbContextOptions<System_Entity> options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("data source=.;initial catalog=company;Integrated Security=True;Encrypt=False");
            base.OnConfiguring(optionsBuilder);
        }

    }
}

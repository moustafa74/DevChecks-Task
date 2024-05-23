using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevChecks_Task.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        [RegularExpression(@"^[a-zA-Z\s]{2,}$", ErrorMessage = "Please enter Valid name.")]   //regex to validate the name
        public string name { get; set; }
        [Required]
        public string  job_role { get; set; }
        [Required]
        public string gender { get; set; }
        public bool isfirst_appointment { get; set; }

        [Column (TypeName ="date")]
        [Required]
        public DateTime start_date { get; set; }
        [StringLength(255)]
        public string? notes { get; set; }


    }
}

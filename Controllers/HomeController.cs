using System.Diagnostics;
using DevChecks_Task.Models;
using Microsoft.AspNetCore.Mvc;

namespace DevChecks_Task.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() // open view 
        {
            return View();
        }
       
    }
}

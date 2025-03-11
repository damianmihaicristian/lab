using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api")]
    [ApiController]
    public class InternController : ControllerBase
    {
        private static List<Intern> _interns = new List<Intern>
        {
            new Intern { Id = 1, Name = "John Doe", Age = 22, DateOfBirth = new DateTime(2003, 1, 1) }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Intern>> GetInterns()
        {
            return Ok(_interns);
        }

        [HttpGet("get/{id}")]
        public ActionResult<Intern> GetIntern(int id)
        {
            var intern = _interns.FirstOrDefault(i => i.Id == id);
            if (intern == null)
            {
                return NotFound();
            }
            return Ok(intern);
        }

        [HttpPost("add")]
        public ActionResult<Intern> AddIntern(Intern intern)
        {
            intern.Id = _interns.Count > 0 ? _interns.Max(i => i.Id) + 1 : 1;
            _interns.Add(intern);

            if(intern.Name == null || intern.Age == 0 || intern.DateOfBirth > DateTime.Now) {
                return BadRequest();
            }
            

            return CreatedAtAction(nameof(GetIntern), new { id = intern.Id }, intern);
        }

        [HttpPut("update/{id}")]
        public ActionResult UpdateIntern(int id, Intern updatedIntern)
        {
            var intern = _interns.FirstOrDefault(i => i.Id == id);
            if (intern == null)
            {
                return NotFound();
            }
            intern.Name = updatedIntern.Name;
            intern.Age = updatedIntern.Age;
            intern.DateOfBirth = updatedIntern.DateOfBirth;
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public ActionResult DeleteIntern(int id)
        {
            var intern = _interns.FirstOrDefault(i => i.Id == id);
            if (intern == null)
            {
                return NotFound();
            }
            _interns.Remove(intern);
            return NoContent();
        }
    }
}

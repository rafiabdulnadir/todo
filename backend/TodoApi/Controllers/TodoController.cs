using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using TodoApi.Data;
using TodoApi.DTOs;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;
        private readonly ILogger<TodoController> _logger;

        public TodoController(TodoContext context, ILogger<TodoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (!int.TryParse(userIdClaim, out int userId))
            {
                throw new UnauthorizedAccessException("Invalid user token");
            }
            return userId;
        }

        // GET: api/todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoDto>>> GetTodos()
        {
            try
            {
                var userId = GetCurrentUserId();
                
                var todos = await _context.Todos
                    .Where(t => t.UserId == userId)
                    .OrderByDescending(t => t.CreatedAt)
                    .Select(t => new TodoDto
                    {
                        Id = t.Id,
                        Title = t.Title,
                        Description = t.Description,
                        IsCompleted = t.IsCompleted,
                        CreatedAt = t.CreatedAt,
                        UpdatedAt = t.UpdatedAt
                    })
                    .ToListAsync();

                return Ok(todos);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid user token");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching todos");
                return StatusCode(500, "An error occurred while fetching todos");
            }
        }

        // GET: api/todo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoDto>> GetTodo(int id)
        {
            try
            {
                var userId = GetCurrentUserId();
                
                var todo = await _context.Todos
                    .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

                if (todo == null)
                {
                    return NotFound($"Todo with ID {id} not found");
                }

                var todoDto = new TodoDto
                {
                    Id = todo.Id,
                    Title = todo.Title,
                    Description = todo.Description,
                    IsCompleted = todo.IsCompleted,
                    CreatedAt = todo.CreatedAt,
                    UpdatedAt = todo.UpdatedAt
                };

                return Ok(todoDto);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid user token");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching todo with ID {TodoId}", id);
                return StatusCode(500, "An error occurred while fetching the todo");
            }
        }

        // POST: api/todo
        [HttpPost]
        public async Task<ActionResult<TodoDto>> CreateTodo(CreateTodoDto createTodoDto)
        {
            try
            {
                var userId = GetCurrentUserId();
                
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var todo = new Todo
                {
                    Title = createTodoDto.Title,
                    Description = createTodoDto.Description,
                    IsCompleted = false,
                    CreatedAt = DateTime.UtcNow,
                    UserId = userId
                };

                _context.Todos.Add(todo);
                await _context.SaveChangesAsync();

                var todoDto = new TodoDto
                {
                    Id = todo.Id,
                    Title = todo.Title,
                    Description = todo.Description,
                    IsCompleted = todo.IsCompleted,
                    CreatedAt = todo.CreatedAt,
                    UpdatedAt = todo.UpdatedAt
                };

                return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todoDto);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid user token");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating todo");
                return StatusCode(500, "An error occurred while creating the todo");
            }
        }

        // PUT: api/todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, UpdateTodoDto updateTodoDto)
        {
            try
            {
                var userId = GetCurrentUserId();
                
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var todo = await _context.Todos
                    .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
                    
                if (todo == null)
                {
                    return NotFound($"Todo with ID {id} not found");
                }

                todo.Title = updateTodoDto.Title;
                todo.Description = updateTodoDto.Description;
                todo.IsCompleted = updateTodoDto.IsCompleted;
                todo.UpdatedAt = DateTime.UtcNow;

                _context.Entry(todo).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                var todoDto = new TodoDto
                {
                    Id = todo.Id,
                    Title = todo.Title,
                    Description = todo.Description,
                    IsCompleted = todo.IsCompleted,
                    CreatedAt = todo.CreatedAt,
                    UpdatedAt = todo.UpdatedAt
                };

                return Ok(todoDto);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid user token");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating todo with ID {TodoId}", id);
                return StatusCode(500, "An error occurred while updating the todo");
            }
        }

        // DELETE: api/todo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            try
            {
                var userId = GetCurrentUserId();
                
                var todo = await _context.Todos
                    .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
                    
                if (todo == null)
                {
                    return NotFound($"Todo with ID {id} not found");
                }

                _context.Todos.Remove(todo);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid user token");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting todo with ID {TodoId}", id);
                return StatusCode(500, "An error occurred while deleting the todo");
            }
        }

        // PATCH: api/todo/5/toggle
        [HttpPatch("{id}/toggle")]
        public async Task<ActionResult<TodoDto>> ToggleTodo(int id)
        {
            try
            {
                var userId = GetCurrentUserId();
                
                var todo = await _context.Todos
                    .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
                    
                if (todo == null)
                {
                    return NotFound($"Todo with ID {id} not found");
                }

                todo.IsCompleted = !todo.IsCompleted;
                todo.UpdatedAt = DateTime.UtcNow;

                _context.Entry(todo).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                var todoDto = new TodoDto
                {
                    Id = todo.Id,
                    Title = todo.Title,
                    Description = todo.Description,
                    IsCompleted = todo.IsCompleted,
                    CreatedAt = todo.CreatedAt,
                    UpdatedAt = todo.UpdatedAt
                };

                return Ok(todoDto);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid user token");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while toggling todo with ID {TodoId}", id);
                return StatusCode(500, "An error occurred while toggling the todo");
            }
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using WebApplication1.Controllers;
using WebApplication1.Models;
using Xunit;

namespace WebApplication1.Tests
{
    public class InternControllerTests
    {
        private readonly InternController _controller;
        private readonly List<Intern> _interns;

        public InternControllerTests()
        {
            _interns = new List<Intern>
            {
                new Intern { Id = 1, Name = "John Doe", Age = 21, DateOfBirth = new DateTime(2000, 1, 1) },
                new Intern { Id = 2, Name = "Jane Smith", Age = 23, DateOfBirth = new DateTime(1999, 2, 2) },
            };

            _controller = new InternController();
        }

        [Fact]
        public void GetInterns_ReturnsOkResult_WithListOfInterns()
        {
            // Act
            var result = _controller.GetInterns();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<List<Intern>>(okResult.Value);
            Assert.Equal(2, returnValue.Count);
        }

        [Fact]
        public void GetIntern_ReturnsOkResult_WithIntern()
        {
            // Act
            var result = _controller.GetIntern(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<Intern>(okResult.Value);
            Assert.Equal(1, returnValue.Id);
        }

        [Fact]
        public void GetIntern_ReturnsNotFoundResult()
        {
            // Act
            var result = _controller.GetIntern(3);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public void AddIntern_ReturnsCreatedAtActionResult_WithIntern()
        {
            // Arrange
            var newIntern = new Intern { Name = "New Intern", Age = 21, DateOfBirth = new DateTime(2001, 3, 3) };

            // Act
            var result = _controller.AddIntern(newIntern);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var returnValue = Assert.IsType<Intern>(createdAtActionResult.Value);
            Assert.Equal("New Intern", returnValue.Name);
        }

        [Fact]
        public void UpdateIntern_ReturnsNoContentResult()
        {
            // Arrange
            var updatedIntern = new Intern { Name = "Updated Intern", Age = 24, DateOfBirth = new DateTime(1998, 4, 4) };

            // Act
            var result = _controller.UpdateIntern(1, updatedIntern);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void UpdateIntern_ReturnsNotFoundResult()
        {
            // Arrange
            var updatedIntern = new Intern { Name = "Updated Intern", Age = 24, DateOfBirth = new DateTime(1998, 4, 4) };

            // Act
            var result = _controller.UpdateIntern(3, updatedIntern);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void DeleteIntern_ReturnsNoContentResult()
        {
            // Act
            var result = _controller.DeleteIntern(1);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void DeleteIntern_ReturnsNotFoundResult()
        {
            // Act
            var result = _controller.DeleteIntern(3);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}

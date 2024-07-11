using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class SolutionEntityAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "Tasks");

            migrationBuilder.CreateTable(
                name: "Solutions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TaskId = table.Column<int>(type: "INTEGER", nullable: false),
                    StudentId = table.Column<int>(type: "INTEGER", nullable: false),
                    FilePath = table.Column<string>(type: "TEXT", nullable: true),
                    FileName = table.Column<string>(type: "TEXT", nullable: true),
                    Submitted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Solutions", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Solutions");

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Tasks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "Tasks",
                type: "TEXT",
                nullable: true);
        }
    }
}

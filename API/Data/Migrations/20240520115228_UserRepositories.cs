using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UserRepositories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRepository",
                table: "UserRepository");

            migrationBuilder.DropIndex(
                name: "IX_UserRepository_UserId",
                table: "UserRepository");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "UserRepository",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRepository",
                table: "UserRepository",
                columns: new[] { "UserId", "RepositoryId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRepository",
                table: "UserRepository");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "UserRepository",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRepository",
                table: "UserRepository",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserRepository_UserId",
                table: "UserRepository",
                column: "UserId");
        }
    }
}

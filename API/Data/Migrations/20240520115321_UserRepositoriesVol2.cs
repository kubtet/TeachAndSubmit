using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UserRepositoriesVol2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRepository_Repositories_RepositoryId",
                table: "UserRepository");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRepository_Users_UserId",
                table: "UserRepository");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRepository",
                table: "UserRepository");

            migrationBuilder.RenameTable(
                name: "UserRepository",
                newName: "UsersRepositories");

            migrationBuilder.RenameIndex(
                name: "IX_UserRepository_RepositoryId",
                table: "UsersRepositories",
                newName: "IX_UsersRepositories_RepositoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersRepositories",
                table: "UsersRepositories",
                columns: new[] { "UserId", "RepositoryId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UsersRepositories_Repositories_RepositoryId",
                table: "UsersRepositories",
                column: "RepositoryId",
                principalTable: "Repositories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UsersRepositories_Users_UserId",
                table: "UsersRepositories",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UsersRepositories_Repositories_RepositoryId",
                table: "UsersRepositories");

            migrationBuilder.DropForeignKey(
                name: "FK_UsersRepositories_Users_UserId",
                table: "UsersRepositories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersRepositories",
                table: "UsersRepositories");

            migrationBuilder.RenameTable(
                name: "UsersRepositories",
                newName: "UserRepository");

            migrationBuilder.RenameIndex(
                name: "IX_UsersRepositories_RepositoryId",
                table: "UserRepository",
                newName: "IX_UserRepository_RepositoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRepository",
                table: "UserRepository",
                columns: new[] { "UserId", "RepositoryId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserRepository_Repositories_RepositoryId",
                table: "UserRepository",
                column: "RepositoryId",
                principalTable: "Repositories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRepository_Users_UserId",
                table: "UserRepository",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

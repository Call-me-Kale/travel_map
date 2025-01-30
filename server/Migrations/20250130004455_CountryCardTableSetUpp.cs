using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class CountryCardTableSetUpp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name_pl",
                table: "Countries",
                newName: "name_pl");

            migrationBuilder.RenameColumn(
                name: "Name_en",
                table: "Countries",
                newName: "name_en");

            migrationBuilder.RenameColumn(
                name: "Code",
                table: "Countries",
                newName: "code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "name_pl",
                table: "Countries",
                newName: "Name_pl");

            migrationBuilder.RenameColumn(
                name: "name_en",
                table: "Countries",
                newName: "Name_en");

            migrationBuilder.RenameColumn(
                name: "code",
                table: "Countries",
                newName: "Code");
        }
    }
}

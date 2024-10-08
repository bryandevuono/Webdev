using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Webdev.Migrations
{
    /// <inheritdoc />
    public partial class AddOfficeAttendanceTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OfficeAttendance",
                columns: table => new
                {
                    OfficeAttendanceId = table.Column<Guid>(type: "uuid", nullable: false),
                    Start = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    End = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfficeAttendance", x => x.OfficeAttendanceId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OfficeAttendance");
        }
    }
}

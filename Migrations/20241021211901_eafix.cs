using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Webdev.Migrations
{
    /// <inheritdoc />
    public partial class eafix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EventAttendance",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    EventId = table.Column<Guid>(type: "uuid", nullable: false),
                    AttendedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Rating = table.Column<string>(type: "text", nullable: true),
                    FeedBack = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventAttendance", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventAttendance");
        }
    }
}

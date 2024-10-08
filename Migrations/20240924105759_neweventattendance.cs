using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Webdev.Migrations
{
    /// <inheritdoc />
    public partial class neweventattendance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttendedOn",
                table: "EventAttendances");

            migrationBuilder.AddColumn<string>(
                name: "FeedBack",
                table: "EventAttendances",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Rating",
                table: "EventAttendances",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "EventAttendances",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FeedBack",
                table: "EventAttendances");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "EventAttendances");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "EventAttendances");

            migrationBuilder.AddColumn<DateTime>(
                name: "AttendedOn",
                table: "EventAttendances",
                type: "timestamp with time zone",
                nullable: true);
        }
    }
}

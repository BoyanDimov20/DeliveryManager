using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    public partial class PackageHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Price",
                table: "Packages",
                type: "REAL",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.CreateTable(
                name: "PackageHistory",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "TEXT", nullable: true),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false),
                    PackageId = table.Column<string>(type: "TEXT", nullable: true),
                    ReceiverName = table.Column<string>(type: "TEXT", nullable: true),
                    DeliveryType = table.Column<int>(type: "INTEGER", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    DeliveryAddress = table.Column<string>(type: "TEXT", nullable: true),
                    Weight = table.Column<double>(type: "REAL", nullable: false),
                    Price = table.Column<double>(type: "REAL", nullable: true),
                    ReceivedAtOfficeId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PackageHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PackageHistory_Offices_ReceivedAtOfficeId",
                        column: x => x.ReceivedAtOfficeId,
                        principalTable: "Offices",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PackageHistory_Packages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Packages",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PackageHistory_PackageId",
                table: "PackageHistory",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_PackageHistory_ReceivedAtOfficeId",
                table: "PackageHistory",
                column: "ReceivedAtOfficeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PackageHistory");

            migrationBuilder.AlterColumn<double>(
                name: "Price",
                table: "Packages",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "REAL",
                oldNullable: true);
        }
    }
}

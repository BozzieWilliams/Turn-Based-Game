// 'use strict';
(() => {
    const weapons = {
        claws: {
            damageLevel: 20,
            position: {
                row: null,
                column: null,
            },
            image: "images/claws.png"
        },
        ak47: {
            damageLevel: 50,
            position: {
                row: null,
                column: null,
            },
            image: "images/ak47.png"
        },
        axe: {
            damageLevel: 25,
            position: {
                row: null,
                column: null,
            },
            image: "images/axe.png"
        }
    };

    const players = [{
            playerCartegory: "hostPlayer",
            image: "images/hostPlayer.png",
            attack: 10,
            position: {
                row: null,
                column: null,
            },
        },
        {
            playerCartegory: "visitor",
            attack: 10,
            image: "images/visitor.png",
            position: {
                row: null,
                column: null,
            },
        },
    ];

    class BoardLayout {
        constructor(gridLines) {
            this.gridLayout = gridLines;
            this.arrangement = [];
            this.playerMakingMoves = null;
        }
        connectBoard() {
            for (let rows = 0; rows < this.gridLayout; rows++) {
                this.arrangement[rows] = [];
                for (let columns = 0; columns < this.gridLayout; columns++) {
                    $("#container").append(
                        '<div id="grid_' + rows + "_" + columns + '" class="grid"></div>'
                    );
                    this.arrangement[rows][columns] = {
                        gameComponent: null,
                        obstacle: null,
                        player: null,
                        weapon: null,
                    };
                }
            }
            $(".grid").width(550 / this.gridLayout);
            $(".grid").height(550 / this.gridLayout);
            this.playerMakingMoves = "hostPlayer";
        }
        includeObstacle(row, column, gameComponent) {
            if (this.arrangement[row][column].gameComponent != true) {
                this.arrangement[row][column].obstacle = true;
                this.arrangement[row][column].gameComponent = true;
                $("#grid_" + row + "_" + column + "").css(
                    "background-color",
                    "grey"
                );
            } else {
                this.includeObstacle(randomGameElementsPositioning(), randomGameElementsPositioning(), gameComponent);
            }
        }
        includeWeapon(row, column, gameComponent, indexedProperty) {
            if (this.arrangement[row][column].gameComponent != true) {
                this.arrangement[row][column].weapon = true;
                this.arrangement[row][column].weaponName = indexedProperty;
                this.arrangement[row][column].gameComponent = true;
                weapons[indexedProperty].position = {
                    row: row,
                    column: column,
                };
                $("#grid_" + row + "_" + column + "").css(
                    "background-image",
                    "url(" + gameComponent + ")"
                );
            } else {
                this.includeWeapon(randomGameElementsPositioning(), randomGameElementsPositioning(), gameComponent, indexedProperty);
            }
        }
        includePlayer(row, column, gameComponent, indexedProperty) {
            if (row < 9 && this.arrangement[row + 1][column].player == true) {
                this.includePlayer(randomGameElementsPositioning(), randomGameElementsPositioning(), gameComponent, indexedProperty);
            } else if (row > 0 && this.arrangement[row - 1][column].player == true) {
                this.includePlayer(randomGameElementsPositioning(), randomGameElementsPositioning(), gameComponent, indexedProperty);
            } else if (column < 9 && this.arrangement[row][column + 1].player == true) {
                this.includePlayer(randomGameElementsPositioning(), randomGameElementsPositioning(), gameComponent, indexedProperty);
            } else if (column > 0 && this.arrangement[row][column - 1].player == true) {
                this.includePlayer(randomGameElementsPositioning(), randomGameElementsPositioning(), gameComponent, indexedProperty);
            } else {
                if (this.arrangement[row][column].gameComponent != true) {
                    this.arrangement[row][column].player = true;
                    this.arrangement[row][column].playerCartegory = indexedProperty;
                    this.arrangement[row][column].gameComponent = true;
                    let player = players.find((player) => player.playerCartegory == indexedProperty);
                    player.position = {
                        row: row,
                        column: column,
                    };
                    $("#grid_" + row + "_" + column + "").css("background-color", "");
                    $("#grid_" + row + "_" + column + "").css(
                        "background-image",
                        "url(" + gameComponent + ")"
                    );
                } else {
                    if (this.arrangement[row][column].weapon) {
                        this.arrangement[row][column].player = true;
                        this.arrangement[row][column].playerCartegory = indexedProperty;
                        let player = players.find((player) => player.playerCartegory == indexedProperty);
                        player.position = {
                            row: row,
                            column: column,
                        };
                        let weaponImage;
                        for (let weapon in weapons) {
                            if (weapon == this.arrangement[row][column].weaponName) {
                                player.attack = weapons[weapon].damageLevel;
                                weaponImage = weapons[weapon].image;
                                break;
                            }
                        }
                        if (player.playerCartegory == "hostPlayer") {
                            $(".hostplayerdamage").text(player.attack);
                            $(".hostPlayerWeaponTracker").css(
                                "background-image",
                                "url(" + weaponImage + ")"
                            );
                        } else if (player.playerCartegory == "visitor") {
                            $(".visitorplayerdamage").text(player.attack);
                            $(".visitorWeaponTracker").css(
                                "background-image",
                                "url(" + weaponImage + ")"
                            );
                        }
                        $("#grid_" + row + "_" + column + "").css("background-color", "");
                        $("#grid_" + row + "_" + column + "").css(
                            "background-image",
                            "url(" + gameComponent + ")"
                        );
                    } else {
                        this.includePlayer(randomGameElementsPositioning(), randomGameElementsPositioning(), gameComponent, indexedProperty);
                    }
                }
            }
        }
    };
    let gridElement;
    $(document).ready(() => {
        gridElement = new BoardLayout(10);
        gridElement.connectBoard();
        this.weapons
        for (let weapon in weapons) {
            gridElement.includeWeapon(
                randomGameElementsPositioning(),
                randomGameElementsPositioning(),
                weapons[weapon].image,
                weapon
            );
        }
        this.players;
        players.forEach((player) => {
            gridElement.includePlayer(
                randomGameElementsPositioning(),
                randomGameElementsPositioning(),
                player.image,
                player.playerCartegory
            );
        });
        for (let i = 1; i <= 15; i++) {
            gridElement.includeObstacle(randomGameElementsPositioning(), randomGameElementsPositioning());
        }
    });
    const randomGameElementsPositioning = () => parseInt(Math.random() * (10));
})();
(() => {
    const weapons = {
        claws: {
            position: {
                row: null,
                column: null,
            },
            image: "images/claws.png"
        },
        ak47: {
            position: {
                row: null,
                column: null,
            },
            image: "images/ak47.png"
        },
        axe: {
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
            position: {
                row: null,
                column: null,
            }
        },
        {
            playerCartegory: "visitor",
            image: "images/visitor.png",
            position: {
                row: null,
                column: null,
            }
        }
    ];

    class BoardLayout {
        constructor(gridLines) {
            this.gridLayout = gridLines;
            this.arrangement = [];
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        includeObstacle(row, column, gameComponent) {
            if (this.arrangement[row][column].gameComponent != true) {
                this.arrangement[row][column].obstacle = true;
                this.arrangement[row][column].gameComponent = true;
                $("#grid_" + row + "_" + column + "").css("background-color", "grey");
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
                $("#grid_" + row + "_" + column + "").css("background-image", "url(" + gameComponent + ")");
            } else {
                this.includeWeapon(randomGameElementsPositioning(), randomGameElementsPositioning(), gameComponent, indexedProperty);
            }
        }
        includePlayer(row, column, gameComponent, indexedProperty) {
            if ((row > 0 && this.arrangement[row - 1][column].player == true) ||
                (row < 9 && this.arrangement[row + 1][column].player == true) ||
                (column > 0 && this.arrangement[row][column - 1].player == true) ||
                (column < 9 && this.arrangement[row][column + 1].player == true)) {
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

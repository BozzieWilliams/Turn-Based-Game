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
            attackingPower: 10,
            position: {
                row: null,
                column: null,
            },
        },
        {
            playerCartegory: "visitor",
            attackingPower: 10,
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
                        '<div id="grid_' + rows + "_" + columns + '" class="grid-cell"></div>'
                    );
                    this.arrangement[rows][columns] = {
                        gameComponent: null,
                        obstacle: null,
                        player: null,
                        weapon: null,
                    };
                }
            }
            $(".grid-cell").width(550 / this.gridLayout);
            $(".grid-cell").height(550 / this.gridLayout);
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
                                player.attackingPower = weapons[weapon].damageLevel;
                                weaponImage = weapons[weapon].image;
                                break;
                            }
                        }
                        if (player.playerCartegory == "hostPlayer") {
                            $(".hostplayerdamage").text(player.attackingPower);
                            $(".hostPlayerWeaponTracker").css(
                                "background-image",
                                "url(" + weaponImage + ")"
                            );
                        } else if (player.playerCartegory == "visitor") {
                            $(".visitorplayerdamage").text(player.attackingPower);
                            $(".visitorWeaponTracker").css(
                                "background-image",
                                "url(" + weaponImage + ")"
                            );
                        }
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
        statusUpdate() {
            let activePlayer = players.find((player) => player.playerCartegory == this.playerMakingMoves);
            let row = activePlayer.position.row;
            let column = activePlayer.position.column;
            gridElement.arrangement[row][column] = {
                gameComponent: null,
                obstacle: null,
                player: null,
                weapon: null,
            };
            $("#grid_" + row + "_" + column).css("background", "");
            updateResets();
        }
    };
    const upwardMovesWithHighlights = () => {
        let activePlayer = players.find((player) => player.playerCartegory == gridElement.playerMakingMoves);
        let row = activePlayer.position.row;
        let column = activePlayer.position.column;
        if (gridElement.arrangement[row][column].player == true) {
            for (let i = 1; i <= 3; i++) {
                row = row - 1;
                if (row < 0) {
                    break;
                }
                if (
                    gridElement.arrangement[row][column].obstacle == true ||
                    gridElement.arrangement[row][column].player == true
                ) {
                    break;
                }
                if (gridElement.arrangement[row][column].weapon != true) {
                    gridElement.arrangement[row][column].allowedMovePattern = true;
                    $("#grid_" + row + "_" + column).css("background", "#ec90ee");
                } else {
                    gridElement.arrangement[row][column].allowedMovePattern = true;
                    $("#grid_" + row + "_" + column).css(
                        "border",
                        "2px solid #ff0000"
                    );
                }
            }
        }
    };
    const downWardMovesWithHighlights = () => {
        let activePlayer = players.find((player) => player.playerCartegory == gridElement.playerMakingMoves);
        let row = activePlayer.position.row;
        let column = activePlayer.position.column;
        if (gridElement.arrangement[row][column].player == true) {
            for (let i = 1; i <= 3; i++) {
                row = row + 1;
                if (row >= 10) {
                    break;
                }
                if (
                    gridElement.arrangement[row][column].obstacle == true ||
                    gridElement.arrangement[row][column].player == true
                ) {
                    break;
                }
                if (gridElement.arrangement[row][column].weapon != true) {
                    gridElement.arrangement[row][column].allowedMovePattern = true;
                    $("#grid_" + row + "_" + column).css("background", "#ec90ee");
                } else {
                    gridElement.arrangement[row][column].allowedMovePattern = true;
                    $("#grid_" + row + "_" + column).css(
                        "border",
                        "2px solid #ff0000"
                    );
                }
            }
        }
    };
    const leftSideMovesWithHighlights = () => {
        let activePlayer = players.find((player) => player.playerCartegory == gridElement.playerMakingMoves);
        let row = activePlayer.position.row;
        let column = activePlayer.position.column;
        if (gridElement.arrangement[row][column].player == true) {
            for (let i = 1; i <= 3; i++) {
                column = column - 1;
                if (column < 0) {
                    break;
                }
                if (
                    gridElement.arrangement[row][column].obstacle == true ||
                    gridElement.arrangement[row][column].player == true
                ) {
                    break;
                }
                if (gridElement.arrangement[row][column].weapon != true) {
                    gridElement.arrangement[row][column].allowedMovePattern = true;
                    $("#grid_" + row + "_" + column).css("background", "#ec90ee");
                } else {
                    gridElement.arrangement[row][column].allowedMovePattern = true;
                    $("#grid_" + row + "_" + column).css(
                        "border",
                        "2px solid #ff0000"
                    );
                }
            }
        }
    };
    
    
    
    
    

    const rightSideMovesWithHighlights = () => {
        let activePlayer = players.find((player) => player.playerCartegory == gridElement.playerMakingMoves);
        let row = activePlayer.position.row;
        let column = activePlayer.position.column;
        if (gridElement.arrangement[row][column].player == true) {
            for (let i = 1; i <= 3; i++) {
                column = column + 1;
                if (column >= 10) {
                    break;
                }
                if (gridElement.arrangement[row][column].obstacle == true || gridElement.arrangement[row][column].player == true) {
                    break;
                }
                if (gridElement.arrangement[row][column].weapon != true) {
                    gridElement.arrangement[row][column].allowedMovePattern = true;
                    $("#grid_" + row + "_" + column).css("background", "#ec90ee");
                } else {
                    gridElement.arrangement[row][column].allowedMovePattern = true;
                    $("#grid_" + row + "_" + column).css(
                        "border",
                        "2px solid #ff0000"
                    );
                }
            }
        }
    };
    const bringFowardPossibleMoveDirections = () => {
        upwardMovesWithHighlights();
        downWardMovesWithHighlights();
        leftSideMovesWithHighlights();
        rightSideMovesWithHighlights();
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
        bringFowardPossibleMoveDirections();
        $("#container").click((e) => {
            e.preventDefault();
            let targetElement = e.target.id;
            let destinationRow = targetElement.split("_")[1];
            let destinationColumn = targetElement.split("_")[2];
            if (gridElement.arrangement[destinationRow][destinationColumn].allowedMovePattern) {
                gridElement.statusUpdate(); // reseting Cell Positions
                let activePlayer = players.find((player) => player.playerCartegory == gridElement.playerMakingMoves);
                if ( //weaponChange
                    gridElement.arrangement[destinationRow][destinationColumn].weapon &&
                    !activePlayer.weaponName
                ) {
                    activePlayer.weaponName = gridElement.arrangement[destinationRow][destinationColumn].weaponName;
                    activePlayer.weaponPosition = {
                        row: destinationRow,
                        column: destinationColumn,
                    };
                } else if (
                    gridElement.arrangement[destinationRow][destinationColumn].weapon &&
                    activePlayer.weaponName
                ) {
                    let oldWeaponName = activePlayer.weaponName; //weaponChange
                    let oldWeaponPosition = activePlayer.weaponPosition;
                    activePlayer.weaponName = gridElement.arrangement[destinationRow][destinationColumn].weaponName;
                    gridElement.includeWeapon(
                        oldWeaponPosition.row, oldWeaponPosition.column, weapons[oldWeaponName].image, oldWeaponName);
                }; //end of weapon change
                gridElement.includePlayer(
                    parseInt(destinationRow),
                    parseInt(destinationColumn),
                    activePlayer.image,
                    activePlayer.playerCartegory
                );
                gridElement.playerMakingMoves = gridElement.playerMakingMoves == "hostPlayer" ? "visitor" : "hostPlayer";
                bringFowardPossibleMoveDirections();
            }
        });
    });
    const resetUpMovemetHighlights = () => {
        let activePlayer = players.find((player) => player.playerCartegory == gridElement.playerMakingMoves);
        let row = activePlayer.position.row;
        let column = activePlayer.position.column;
        for (let i = 1; i <= 3; i++) {
            row = row - 1;
            if (row < 0) {
                break;
            }
            if (
                gridElement.arrangement[row][column].obstacle == true ||
                gridElement.arrangement[row][column].player == true
            ) {
                break;
            }
            if (gridElement.arrangement[row][column].weapon != true) {
                gridElement.arrangement[row][column].allowedMovePattern = false;
                $("#grid_" + row + "_" + column).css("background", "");
            } else {
                gridElement.arrangement[row][column].allowedMovePattern = false;
                $("#grid_" + row + "_" + column).css("border", "");
            }
        }
    };
    const resetDownWardMovemetHighlights = () => {
        let activePlayer = players.find((player) => player.playerCartegory == gridElement.playerMakingMoves);
        let row = activePlayer.position.row;
        let column = activePlayer.position.column;
        for (let i = 1; i <= 3; i++) {
            row = row + 1;
            if (row >= 10) {
                break;
            }
            if (
                gridElement.arrangement[row][column].obstacle == true ||
                gridElement.arrangement[row][column].player == true
            ) {
                break;
            }
            if (gridElement.arrangement[row][column].weapon != true) {
                gridElement.arrangement[row][column].allowedMovePattern = false;
                $("#grid_" + row + "_" + column).css("background", "");
            } else {
                gridElement.arrangement[row][column].allowedMovePattern = false;
                $("#grid_" + row + "_" + column).css("border", "");
            }
        }
    };
    const resetLeftSideMovemetHighlights = () => {
        let activePlayer = players.find((player) => player.playerCartegory == gridElement.playerMakingMoves);
        let row = activePlayer.position.row;
        let column = activePlayer.position.column;
        for (let i = 1; i <= 3; i++) {
            column = column - 1;
            if (column < 0) {
                break;
            }
            if (
                gridElement.arrangement[row][column].obstacle == true || gridElement.arrangement[row][column].player == true) {
                break;
            }
            if (gridElement.arrangement[row][column].weapon != true) {
                gridElement.arrangement[row][column].allowedMovePattern = false;
                $("#grid_" + row + "_" + column).css("background", "");
            } else {
                gridElement.arrangement[row][column].allowedMovePattern = false;
                $("#grid_" + row + "_" + column).css("border", "");
            }
        }
    };
    const resetRightSideMovemetHighlights = () => {
        let activePlayer = players.find((player) => player.playerCartegory == gridElement.playerMakingMoves);
        let row = activePlayer.position.row;
        let column = activePlayer.position.column;
        for (let i = 1; i <= 3; i++) {
            column = column + 1;
            if (column >= 10) {
                break;
            }
            if (gridElement.arrangement[row][column].obstacle == true || gridElement.arrangement[row][column].player == true) {
                break;
            }
            if (gridElement.arrangement[row][column].weapon != true) {
                gridElement.arrangement[row][column].allowedMovePattern = false;
                $("#grid_" + row + "_" + column).css("background", "");
            } else {
                gridElement.arrangement[row][column].allowedMovePattern = false;
                $("#grid_" + row + "_" + column).css("border", "");
            }
        }
    };
    const updateResets = () => {
        resetUpMovemetHighlights();
        resetDownWardMovemetHighlights();
        resetLeftSideMovemetHighlights();
        resetRightSideMovemetHighlights();
    }
    const randomGameElementsPositioning = () => parseInt(Math.random() * (10));
})();

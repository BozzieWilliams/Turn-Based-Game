# Project6
Web Developer(Front-end Path) @ OpenClassRooms International

In this project, you will create an online game written JavaScript in which 2 players play each turn to compete. 

![apercu15](https://user-images.githubusercontent.com/47401781/86554974-c0725600-bf57-11ea-85bf-4b9c76efb3a2.png)

# Step 1: Generate the map
Start by randomly generating the game map. Each box can be either:

Empty

Unavailable (dimmed)

On the map, a limited number of weapons (up to 4) will be placed randomly and can be collected by players who pass through.

You should invent at least 4 types of weapons in the game, each with different damage inflicted (don't worry though, your choice of weapons doesn't need to be violent or come from the classic lineup of weapons. If you count a cupcake as a weapon, that's cool too)! The default weapon which team players must inflict 10 points of damage. Each weapon has a name and associated visual.

The placement of the two players is also randomly on the map when the game loads. They should not touch (they can not be together).
# Step 2: Movements
For each turn, a player can move from one to three boxes (horizontally or vertically) before ending their turn. They obviously can not pass through obstacles directly.

If a player passes over a box containing a weapon, they leave their current weapon on site and replace it with the new one.

# Step 3: Fight!
If players cross over adjacent squares (horizontally or vertically), a battle begins.

During combat, the game works is as follows:

Each player attacks in turn.

The damage depends on the player's weapon

The player can choose to attack or defend against the next shot

If the player chooses to defend themselves, they sustain 50% less damage than normal

As soon as the life points of a player (initially 100) falls to 0, they lose. A message appears and the game is over.
# Skills

![Skills](https://user-images.githubusercontent.com/47401781/87248415-0a7c9f80-c462-11ea-8c9a-818c85aa8c03.PNG)

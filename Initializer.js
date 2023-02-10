// init fresh game

import Game from "./Game.js";
import AdvObject from "./AdvObject.js";
import Action from "./Action.js";
import Exit from "./Exit.js";
import Location from "./Location.js";


class Initializer {
    constructor() {
        // this.InitializeGame();
    }
}

function InitializeGame() {
    // Locations
    window.Game.Locations.push(new Location("L1", "Living Room", "<br/>You are in a living room. There is a couch and a coffee table. There is also a fireplace, but the fire is out right now."));
    // id, name, direction, isexitto, hidden, exitdescription, canbeused, cbutext
    var tExit = new Exit("E1", "green door", "N", "L4", 0, "It's a green door made of wood. It looks quites solid", 0, "You try to open the door, but it is locked...");
    window.Game.Locations[0].exits.push(tExit);
    var tExit = new Exit("E2", "floor Hatch", "Down", "L3", 1, "It's an floor hatch and it looks quite heavy. It's made of iron and probably not possible to open from below...", 0, "You open the hatch and look down into total darkness. Your nyctopohbia makes it impossible to go down there.");
    window.Game.Locations[0].exits.push(tExit);
    var tExit = new Exit("E3", "brown door", "S", "L2", 0, "It's a brown door and it is slightly open.", 1, "");
    window.Game.Locations[0].exits.push(tExit);
    var tExit = new Exit("E6", "main hall door", "W", 0, 0, "It's a huge set of doors. It's probably leading to the main hall.", 0, "No way you can open this set of doors from in here. They appear to be blocked from the other side.");
    window.Game.Locations[0].exits.push(tExit);

    window.Game.Locations.push(new Location("L2", "Kitchen", "<br/>You are in the kitchen. There is a stove with an oven. The table and the floor are covered with dried-out blood."));
    var tExit = new Exit("E4", "Brown door", "N", "L1", 0, "It's the brown door to the kitchen.", 1, "");
    window.Game.Locations[1].exits.push(tExit);
    var tExit = new Exit("E5", "Stainless steel door", "S", 0, 0, "It's a stainless steel door. It's cold to touch and it is locked with an industrial grade padlock.", 0, "The door is locked.");
    window.Game.Locations[1].exits.push(tExit);

    window.Game.Locations.push(new Location("L3", "Cellar", "<br/>You are in a moldy cellar with what seems to be empty shelves along three sides of the small room."));
    var tExit = new Exit("E5", "Ladder", "Up", "L1", 0, "Iron ladder leading up to the living room", 1, 0);
    window.Game.Locations[2].exits.push(tExit);

    window.Game.Locations.push(new Location("L4", "Bedroom", "It's an eerie bedroom. The room is dominated by a huge bed with a red canopy. The bed is covered with a white sheet. Along the walls are a lot of clothes on hangers. The room is very dark, but you can see a small window on the wall."));
    var tExit = new Exit("E6", "Green door", "S", "L1", 0, "It's the green door you managed to unlock. You suddenly doubt if it was a good idea...", 1, 0);
    window.Game.Locations[3].exits.push(tExit);

    // Objects by Room (for my sake)
    // constructor(id, name, type, originallocation, takeable, hidden, takeaction, examineaction, canbeused, cbutext, usecombo) {
    var tObj = new AdvObject("B1", "couch", "Object", "L1", 0, 0, 0, "A7", 0, "It's not the right time to take a nap...", new Array());
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B2", "vase", "Object", "L1", 0, 0, 0, 0, 0, "It's a vase with flowers. Nothing spectacular about it", new Array());
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B3", "flowers", "Object", "L1", 0, 0, "A5", "A6", 0, "It's the stenchy flowers.", new Array());
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B4", "coffee table", "Object", "L1", 0, 0, 0, 0, 0, "It's a wooden coffee table with a vase of flowers on it", new Array());
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B5", "fireplace", "Object", "L1", 0, 0, 0, 0, 0, "There are ashes from a recent fire, but it seems the chimney is blocked now. If you lit a fire you will probably set the house on fire and choke to death.", new Array());
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B6", "paper straw", "Object", "L1", 1, 1, "A44", "A43", 0, "", new Array("A25", "B15"));
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B7", "iron Key", "Object", "L1", 0, 1, 0, "A3", 0, "", new Array("A4", "E1"));
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B8", "carpet", "Object", "L1", 0, 0, 0, "A11", 0, "", new Array());
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B9", "note", "Object", "L1", 1, 1, 0, 0, 0, "It's a note with the numbers 2,3,5 and a fourth you can't read.", new Array());
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B10", "oven", "Object", "L2", 0, 0, 0, 0, 0, "It's a gas oven. It's on. You open the lid slightly and then you freeze. Cut off hands and feet are arranged with vegetables in a dish. Someone is eating people here!", new Array());
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B11", "cell Phone", "Object", "L4", 0, 1, "A20", "A21", 0, "The cell phone is locked with a pin code. You need the code to use it.", new Array("A22", "2357"));
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B12", "stove", "Object", "L2", 0, 0, 0, 0, "It's a gas stove with four burners. However, they don't turn on. The gas must be cut off somewhere.", new Array());
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B13", "flashlight", "Object", "L4", 1, 1, "A30", "A31", 1, 0, new Array("A24", "E2"));
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B14", "shelves", "Object", "L3", 0, 0, 0, 0, 0, "There are shelves all around the room. They are filled with huge glass jars with heads of people... They all look back at you with clear eyes! This is really scary!", new Array());
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B15", "drain hole", "Object", "L3", 0, 0, 0, "A27", 0, "", new Array());
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B16", "hacksaw", "Object", "L2", 1, 1, 0, "A45", 0, "It's a broken hacksaw...", new Array("A41", "B21"));
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B17", "small windows", "Object", "L2", 0, 0, 0, 0, 0, "The windows are small and high up. You can't reach them from the ground. You realize it's impossible to squeeze out through them", new Array());
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B18", "cardboard box", "Object", "L2", 0, 0, 0, 0, 0, "You cautiously look into the box and jump back. The box is full of eyes! On closer inspection you realize they are glass eyes");
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B19", "delivery uniforms", "Object", "L4", 0, 0, 0, "A40", 0, "Uniforms from a lot of food brands are carefully arranged on hangers along the sides of the room", new Array());
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B20", "bed", "Object", "L4", 0, 0, 0, "A47", 0, "It's a big four pillar bed with a lot of pillows. It looks very old-fashioned with a heavy red velvet blanket", new Array());
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B21", "barred window", "Object", "L4", 0, 0, 0, 0, 0, "The dirty window is barred with thick iron bars. They don't budge at all. You realize it's impossible to squeeze out through them", new Array());
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B22", "drawers", "Object", "L2", 0, 0, 0, "A28", 0, "It's kitchen drawer. It's empty...", new Array())
    window.Game.AdvObjects.push(tObj);

    // Actions
    var tAct = new Action("A3", "You examine the iron key. It's simple and sturdy. You notice some paint stains with the same color as the green door in the living room.", 0, 0, 0, 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A4", "You unlock the door leading North with the key.", "canbeused", 1, "E1", 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A5", "The smell is too much, you don't want to take the flowers.", 0, 0, "B3", 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A6", "As you look closer at the flowers you discover a paper straw between them", "hidden", 0, "B6", 0, 0, 0, "A44");
    window.Game.Actions.push(tAct);
    // find the key and also unhide it
    var tAct = new Action("A7", "You examine the couch and find a key deeply buried in the pillows", "hidden", 0, "B7", "B7", 0, 0, "A8"); //taking the key will change the examine action if the couch to 0, or default
    window.Game.Actions.push(tAct);
    // remove the key from the couch
    var tAct = new Action("A8", "", "examineaction", 0, "B1", 0, 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A9", "It's lucky the note did not get burned! You open it carefully and reads what looks like the numbers 2,3,5 and then one more number you can't read...", 0, 0, 0, 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A10", "You take the note", 0, 0, "B9", 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A11", "You take a closer look at the carpet and notice it has an almost invisible bulge in the middle. You move the carpet and discover a floor hatch!", "hidden", 0, "E2", 0, 0, 0, "A12");
    window.Game.Actions.push(tAct);
    var tAct = new Action("A12", "", "examineaction", 0, "B8", 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    // var tAct = new Action("A13", "You examine the fireplace. It's very old and has a lot of dust on it. There's a note in the middle of the fireplace.", "hidden", 0, "B9", 0, 0, 0, "A14");
    // window.Game.Actions.push(tAct);
    var tAct = new Action("A14", "", "examineaction", 0, "B5", 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A20", "You take the cell phone. It's a Samsung Galaxy S7.", 0, 0, 0, 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A21", "You examine the cell phone. It's not very old, but it's not the latest model either. It's locked with a pin code.", 0, 0, 0, 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A22", "", "usecombo", 0, "B11", 0, 0, 0, "A23", 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A23", "The code works!!! It's prime numbers of course!<br/>You call the police and they come to rescue you. Congratulations! You won the game!<br/><p style='color: red;'>Please share your time as a comment in the LinkedIn post!</p>", 0, 0, 0, 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A24", "You let the flashlight beam run around shaft leading down and discover a light switch. You turn it on and it lights up an iron ladder leading down.", "canbeused", 1, "E2", 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A25", "You carefully suck the piece of paper to you using the paper straw - It turns out to be a note!", "usecombo", 0, "B6", "B9", 0, 0, "A26");
    window.Game.Actions.push(tAct);
    var tAct = new Action("A26", "", "examineaction", 0, "B15", 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A27", "You examine the drain hole. Its dark... Suddenly you notice a piece of paper in the hole. It's too far away and too narrow to reach by hand, but maybe with something else...", 0, 0, 0, 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A28", "You search through all the drawers and discover a hacksaw. Besides that the drawers are empty", "hidden", 0, "B16", 0, 0, 0, "A29");
    window.Game.Actions.push(tAct);
    var tAct = new Action("A29", "", "examineaction", 0, "B22", 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A30", "It's a nice little flashlight. It seems handy!", 0, 0, 0, 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A31", "It's a flashlight and it works! A little luck came your way!", 0, 0, 0, 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A40", "You examine all the delivery uniforms. You are almost done when you can't believe your luck. In one of the inner pockets you find a cell phone!", "examineaction", 0, "B19", "B11", 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A41", "You use the hacksaw on the barred window. It breaks the saw!", "usecombo", 0, "B16", 0, 0, 0, "A46");
    window.Game.Actions.push(tAct);
    var tAct = new Action("A42", 0, "cbutext", "You examine the broken hacksaw. It's useless now.", "B16", 0, 0, 0, 0);
    // A43 It's a thin wooden stick about 20 centimeters long.
    var tAct = new Action("A43", "You examine the paper straw. It's pretty long.", 0, 0, 0, 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    // A44 remove the examine action on the flowers
    var tAct = new Action("A44", "", "examineaction", 0, "B3", 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A45", "The hacksaw is not very big, but it looks sharp. There are dried meat threads on the blade...", 0, 0, 0, 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A46", "", "examineaction", 0, "B16", 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A47", "You examine the bed and discover a flashlight under it.", "hidden", 0, "B13", 0, 0, 0, 0);
    window.Game.Actions.push(tAct);

}

export { InitializeGame, Initializer };


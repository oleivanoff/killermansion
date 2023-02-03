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
    window.Game.Locations.push(new Location("L1", "Living Room", "You are in a cozy living room. There is a couch and a coffee table. There is also a fireplace, but the fire is out right now, even if there is wood ready to lit."));
    // id, name, direction, isexitto, hidden, exitdescription, canbeused, cbutext
    var tExit = new Exit("E1", "Green door", "N", "L2", 0, "It's a green door made of wood. It looks quites solid", 0, "You try to open the door, but it is locked...");
    window.Game.Locations[0].exits.push(tExit);
    var tExit = new Exit("E2", "Iron Hatch", "D", "L3", 1, "It's an iron hatch and it looks quite heavy. It' probably not possible to open from below...", 1, "");
    window.Game.Locations[0].exits.push(tExit);
    var tExit = new Exit("E3", "Brown door", "S", "L4", 0, "It's a brown door and it is slightly open.", 1, "");
    window.Game.Locations[0].exits.push(tExit);

    /*  window.Game.Locations.push(new Location("L2", "Kitchen", "You are in the kitchen. There is a stove with an oven. You notice there are no knives on the table."));
     var tExit = new Exit("E4", "S", "L1");
     window.Game.Locations[1].exits.push(tExit);
 
     window.Game.Locations.push(new Location("L3", "Cellar", "You are in a moldy cellar with what seems to be empty shelves along three sides of the small room"));
     var tExit = new Exit("E5", "U", "L1");
     window.Game.Locations[2].exits.push(tExit); */

    // Objects by Room (for my sake)
    // constructor(id, name, type, originallocation, takeable, hidden, takeaction, examineaction, canbeused, cbutext, usecombo) {
    var tObj = new AdvObject("B1", "Couch", "Object", "L1", 0, 0, 0, "A7", 0, "It's not the right time to take a nap...", []);
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B2", "Vase", "Object", "L1", 0, 0, 0, 0, 0, "It's a vase with flowers. Nothing spectacualar about it", []);
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B3", "Flowers", "Object", "L1", 1, 0, "A5", 0, 0, "The flowers are dusty and withered, but they still have a strong weird smell", []);
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B4", "Coffee Table", "Object", "L1", 0, 0, 0, 0, 0, "It's a wooden coffee table with a vase of flowers on it", []);
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B5", "Fireplace", "Object", "L1", 0, 0, 0, 0, 0, "It seems the chimney is blocked. If you lit a fire you will probably set the house on fire and chole to death.", []);
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B6", "Wood", "Object", "L1", 1, "A6", 0, 0, 0, "It's a pile of wood. It's not very big, but it should be enough to light the fire", []);
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B7", "Old Iron Key", "Object", "L1", 0, 1, 0, "A3", 0, "", [["E1", "A4"]]);
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B8", "Carpet", "Object", "L1", 0, 0, 0, "A8", 0, "", []);
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B9", "Piece of paper", "Object", "L1", 0, 1, "A8", 0, 0, "", []);
    window.Game.AdvObjects.push(tObj);

    var tObj = new AdvObject("B9", "Stove", "Object", "L2", 0, 0, 0, 0, "It's a gas stove with four burners", []);
    window.Game.AdvObjects.push(tObj);
    var tObj = new AdvObject("B10", "Oven", "Object", "L2", 0, 0, 0, 0, "It's a gas oven. It's not very big, but it should be enough to cook a pizza", []);
    window.Game.AdvObjects.push(tObj);

    // Actions
    var tAct = new Action("A3", "You examine the old iron key. It's simple and sturdy. You notice some paint stains with the same color as the green door in the living room.", 0, 0, 0, 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A4", "You unlock the door leading North with the key.", 1, "E1", "E1", 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A5", "You take the flowers", 0, 0, "B3", 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A6", "You take the wood", 0, 0, "B6", 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    // find the key and also unhide it
    var tAct = new Action("A7", "You examine the couch and find a key deeply buried in the pillows", "hidden", 0, "B7", "B7", 0, 0, "A8"); //taking the key will change the examine action if the couch to 0, or default
    window.Game.Actions.push(tAct);
    // remove the key from the couch
    var tAct = new Action("A8", "", "examineaction", 0, "B1", 0, 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A9", "It's a very old folded note. You open it carefully and reads what looks like the numbers 1,3,5 and then two more you can't read...", 0, 0, 0, 0, 0, 0, 0);
    window.Game.Actions.push(tAct);
    var tAct = new Action("A10", "You take the note", 0, 0, "B9", 0, 0, 0, 0); // remove the note from examone action on fireplace

    // add flashlight action to find note...

    // add default things to inventory
}

export { InitializeGame, Initializer };


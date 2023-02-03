import Location from "./Location.js";
import AdvObject from "./AdvObject.js";
import Action from "./Action.js";
import Game from "./Game.js";
import Exit from "./Exit.js";
import { Initializer } from "./Initializer.js";
import { InitializeGame } from "./Initializer.js";

window.Game = new Game();

var initializer = new Initializer();

InitializeGame();

console.log("Game initialized");

// Get the input field
let inputField = document.getElementById("userCommand");

let currentLocation = window.Game.Locations[0];

look();

function WriteInventory() {
    console.log("You are carrying: ");
    inventory.forEach(function (obj) {
        this.writeText(obj.name + "<br/>");
    });
}

function AddToInventory(object) {
    window.Game.Inventory.push(object);
    object.originallocation = "L0";
    writeText("You take the " + object.name.toLowerCase() + "<br/>");
}

function RemoveFromInventory(object) {
    window.Game.Inventory.splice(inventory.indexOf(object), 1);
    object.originallocation = currentLocation.id;
}

// now the objects, exits and Locations are in the Game object

function EnterLocation(location) {
    currentLocation = location;
    look();
}

function inventory() {
    if (window.Game.Inventory.length > 0) {
        writeText("You are carrying: <br/>");

        window.Game.Inventory.forEach(function (obj) {
            writeText(obj.name + "<br/>");
        });
    } else {
        writeText("You are not carrying anything...<br/>");
    }
}

// Function to display the current location's description and objects
function look() {
    // console.log(currentLocation.description);
    writeText(currentLocation.description + "<br/><br/>");
    // console.log("Objects in the location: ");
    writeText("You look around in the room and also notice: <br/>");
    window.Game.AdvObjects.forEach(function (obj) {
        if (obj.originallocation == currentLocation.id && obj.hidden == 0) {
            // console.log(obj.name);
            writeText(obj.name + "<br/>");
        }
    });
}



inputField.addEventListener("keydown", function (event) {
    // Check if the key pressed was the Enter key
    if (event.key === "Enter") {
        // Get the value of the input field
        let inputValue = inputField.value;
        inputField.value = "";

        // Do something with the input value
        let cmd = (findCommand(inputValue));
        console.log(cmd);
        if (cmd != "") {
            if (cmd == "examine") {
                let fobj = findObject(inputValue)[0];
                console.log(findObject(inputValue)[0]);
                if (fobj != null) {
                    if (fobj.examineaction != 0) {
                        window.Game.Actions.forEach(function (act) {
                            if (act.id == fobj.examineaction) {
                                doAction(act);
                            }
                        });
                    } else {
                        writeText("<br/>You don't find anything interesting about the " + fobj.name.toLowerCase() + "<br/>");
                    }
                } else {
                    let fexit = findExit(inputValue);
                    if (fexit != null) {
                        writeText(fexit.exitdescription + "<br/>");
                    } else {
                        writeText("There is no such object in this location or in your bag... <br/>");
                    }
                }
            }
            if (cmd == "look") {
                look();
            }
            if (cmd == "take") {
                let fobj = findObject(inputValue)[0];
                if (fobj != null) {

                    if (fobj.originallocation == currentLocation.id) {
                        take(fobj);
                        // AddToInventory(fobj);


                    } else {
                        writeText("You are already carrying the " + fobj.name.toLowerCase() + " ...<br/>");
                    }

                } else {
                    writeText("There is no such object in this location or in your bag... <br/>");
                }
            }
            if (cmd == "inventory") {
                inventory();
            }
            if (cmd == "drop") {
                let fobj = findObject(inputValue)[0];
                if (fobj != []) {
                    if (fobj.originallocation == 0) {
                        // remove from inventory
                        RemoveFromInventory(fobj);
                        // add to location
                        fobj.originallocation = currentLocation.id;
                        writeText("You drop the " + fobj.name.toLowerCase() + "<br/>");
                    } else {
                        writeText("You can't drop the " + fobj.name.toLowerCase() + " from this location...<br/>");
                    }
                } else {
                    writeText("There is no such object in this location or in your bag... <br/>");
                }
            }
            if (cmd == "use") {
                let fobj = findObject(inputValue)[0];
                let fobj2 = null;
                // find second object or exit
                if (findObject(inputValue)[1] == null) {
                    fobj2 = findExit(inputValue);
                } else {
                    fobj2 = findObject(inputValue)[1];
                }
                if (fobj != null && fobj2 != null) {
                    if (fobj.usecombo != 0) {
                        // loop through actions
                        window.Game.Actions.forEach(function (act) {
                            if (act.id == fobj.usecombo[0]) {
                                doAction(act);
                            }
                        });
                    } else {
                        writeText("Nothing happens...<br/> ");
                    }
                } else {
                    // also if you try to use something that is not here
                    writeText("You are trying to do something with something that is not here or in your bag... <br/>");
                }
            }
            if (cmd == "go") {
                let fexit = findExit(inputValue);
                if (fexit != null) {
                    if (fexit.hidden == 0 && fexit.canbeused == 1) {
                        EnterLocation(fexit.destination);
                    } else {
                        if (fexit.hidden == 0) {

                            writeText(fexit.cbutext + "<br/>");
                        }
                    }
                } else {
                    writeText("There is no such exit in this location... <br/>");
                }
            }
            if (cmd == "exits") {
                writeText("You can go:<br/>");
                currentLocation.exits.forEach(function (exit) {
                    if (exit.hidden == 0) {
                        // writeText(exit.name + "<br/>");
                        writeText(exit.direction + " " + exit.name + "<br/>");
                    }
                });
            }

        }
        //console.log("Value of the input field: " + inputValue);


    }
});

function doAction(action) {
    // write text if any
    console.log("doing action " + action.id + "");
    if (action.text != "") {
        writeText(action.text + "<br/>");
    }
    // handle any state changes

    if (action.statechange != 0) {
        // find the target object
        window.Game.AdvObjects.forEach(function (obj) {
            if (obj.id == action.target) {
                // change the state of the target object
                if (action.statechange == "examineaction") {
                    obj.examineaction = action.newstate;
                }
                if (action.statechange == "hidden") {
                    obj.hidden = action.newstate;
                }
                if (action.statechange == "originallocation") {
                    obj.originallocation = action.newstate;
                }
                if (action.statechange == "takeable") {
                    obj.takeable = action.newstate;
                }
                if (action.statechange == "canbeused") {
                    obj.canbeused = action.newstate;
                }
                if (action.statechange == "cbutext") {
                    obj.cbutext = action.newstate;
                }
                if (action.statechange == "usecombo") {
                    obj.useaction = action.newstate;
                }

            }
        });
    }

    // handle any add to inventory
    if (action.addtoinventory != 0) {
        window.Game.AdvObjects.forEach(function (obj) {
            if (obj.id == action.addtoinventory) {
                AddToInventory(obj);
            }
        });
    }
    // handle goto location
    if (action.gotolocation != 0) {
        window.Game.Locations.forEach(function (loc) {
            if (loc.id == action.gotolocation) {
                EnterLocation(loc);
            }
        });
    }
    // handle next action
    if (action.nextactionid != 0) {
        window.Game.Actions.forEach(function (act) {
            if (act.id == action.nextactionid) {
                doAction(act);
            }
        });
    }
}

function findObject(input) {

    let robj = [];

    window.Game.AdvObjects.forEach(function (obj) {
        if ((obj.originallocation == currentLocation.id && obj.hidden == 0) || (obj.originallocation == "L0")) {
            if (input.toLowerCase().includes(obj.name.toLowerCase())) {
                robj.push(obj);
            }
        }
    });

    return robj;

}

function findExit(input) {

    let rexit = null;
    currentLocation.exits.forEach(function (exit) {
        if ((input.toLowerCase().includes(exit.name.toLowerCase()) && exit.hidden == 0) || (input.toLowerCase().includes(exit.direction.toLowerCase()) && exit.hidden == 0)) {
            rexit = exit;
        }
    });

    return rexit;
}

function findCommand(input) {
    // look
    if (input.includes("look")) { return "look" };

    if (input.includes("examine")) { return "examine" };

    if (input.includes("go")) { return "go" };

    if (input.includes("use")) { return "use" };

    if (input.includes("take")) { return "take" };

    if (input.includes("inventory")) { return "inventory" };

    if (input.includes("exits")) { return "exits" };

}

function writeText(s) {
    document.getElementById("scrollerContent").insertAdjacentHTML('beforeend', s)
    // document.getElementById("outputtext").innerHTML = s;
}



// Function to pick up an object
function take(object) {

    let found = false;
    window.Game.AdvObjects.forEach(function (obj) {
        if (obj.name.toLowerCase() == object.name.toLowerCase()) {
            // add to inventory
            if (obj.takeable) {
                AddToInventory(obj);

            } else {
                writeText("You can't take the " + obj.name + " with you...<br/>");
            }
            found = true;
        }
    });
    if (!found) {
        writeText("That object is not here... <br/>");
    }
}

// Function to use an object
// to do add you can use things that are on that location!
function use(objectName) {
    let found = false;
    window.Game.Inventory.forEach(function (obj) {
        if (obj.name.toLowerCase() === objectName.toLowerCase()) {
            writeText("You used the " + obj.name + ". <br/>");
            found = true;
        }
    });
    if (!found) {
        writeText("You do not have that object in your inventory. <br/>");
    }
}


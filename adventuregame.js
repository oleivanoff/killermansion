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

// test commit

console.log("Game initialized");

// Get the input field
let inputField = document.getElementById("userCommand");

let currentLocation = findLocationByID("L1");

writeText("You are Paxton the Pizza person - You wake up on the floor with a hurting head. The last thing you remember is driving up the driveway to a remote mansion to deliver pizzas.<br/>")
writeText("You rang the doorbell, and noticed something that looked a lot like blood seeping out under the huge main door.")
writeText("Too late you noticed a shadow behind you before something hit the back of your head very hard...<br/>")

EnterLocation(currentLocation);

function WriteInventory() {
    console.log("You are carrying: ");
    inventory.forEach(function (obj) {
        this.writeText(obj.name + "<br/>");
    });
}

function AddToInventory(object) {
    window.Game.Inventory.push(object);
    object.originallocation = "L0";
    // add triggering take action and write that text instead
    writeText("You take the " + object.name.toLowerCase() + "<br/>");
}

function RemoveFromInventory(object) {
    window.Game.Inventory.splice(inventory.indexOf(object), 1);
    object.originallocation = currentLocation.id;
}

// now the objects, exits and Locations are in the Game object

function EnterLocation(location) {
    currentLocation = location;
    writeText(currentLocation.description);
    writeExits();

}

function inventory() {
    if (window.Game.Inventory.length > 0) {
        writeText("You are carrying:");

        window.Game.Inventory.forEach(function (obj) {
            writeText(obj.name);
        });
    } else {
        writeText("You are not carrying anything...");
    }
}

// Function to display the current location's description and objects
function look() {

    writeText("You look around in the room and also notice:");
    window.Game.AdvObjects.forEach(function (obj) {
        if (obj.originallocation == currentLocation.id && obj.hidden == 0) {
            // console.log(obj.name);
            writeText(obj.name);
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
                        if (fobj.cbutext != "") {
                            writeText(fobj.cbutext + "<br/>");
                        } else {
                            writeText("You don't find anything interesting about the " + fobj.name.toLowerCase() + "<br/>");
                        }
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
            /* if (cmd == "drop") {
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
            } */
            if (cmd == "use") {
                let somethinghappens = false;
                let fobj = findObject(inputValue)[0];
                let fobj2 = null;
                // find second object or exit
                if (findObject(inputValue)[1] == null) {
                    if (findExit(inputValue) == null) {
                        // not an exit or object, could it be a special code word? liek the phoen pin code?
                        // find last word of inputvalue and compare to fobj.usecombo[1]
                        let lastWord = inputValue.split(" ").pop();
                        if (fobj.usecombo[1] == lastWord) {
                            // do action
                            window.Game.Actions.forEach(function (act) {
                                if (act.id == fobj.usecombo[0]) {
                                    doAction(act);
                                    somethinghappens = true;
                                }
                            });
                        }
                    } else {
                        fobj2 = findExit(inputValue);
                    }
                } else {
                    fobj2 = findObject(inputValue)[1];
                }

                if (fobj != null && fobj2 != null) {
                    if (fobj.usecombo != 0) {
                        // loop through actions
                        window.Game.Actions.forEach(function (act) {
                            // does an action exist and is the combo of objects correct?
                            console.log(act.id + " " + fobj.usecombo[0] + " " + fobj2.id + " " + fobj.usecombo[1]);
                            if (act.id == fobj.usecombo[0] && fobj.usecombo[1] == fobj2.id) {
                                doAction(act);
                                somethinghappens = true;
                            }
                        });
                    }
                } else {
                    // only using a single object
                    // if you are not carrying it, pick it up
                    if (fobj != null) {
                        if (fobj.usecombo.length == 1) {
                            if (fobj.originallocation == currentLocation.id && fobj.hidden == 0 && fobj.takeable == 1) {
                                take(fobj);
                                somethinghappens = true;
                            }
                            if (fobj.usecombo != 0) {
                                window.Game.Actions.forEach(function (act) {
                                    if (act.id == fobj.usecombo[0]) {
                                        doAction(act);
                                        somethinghappens = true;
                                    }
                                });
                            } else {
                                // also if you try to use something that is not here
                                somethinghappens = true;
                                if (fobj.cbutext != "" && fobj.cbutext != null) {
                                    writeText(fobj.cbutext + "<br/>");
                                } else {
                                    writeText("You are trying to do something with something that is not here or in your bag... <br/>");
                                }
                            }
                        }
                    }
                }
                if (somethinghappens == false) {
                    if (fobj.cbutext != "" && fobj.cbutext != null) {
                        writeText(fobj.cbutext + "<br/>");
                    } else {
                        writeText("Nothing happens...<br/> ");
                    }
                }
            }
            if (cmd == "go") {
                let fexit = findExit(inputValue);
                if (fexit != null) {
                    if (fexit.hidden == 0 && fexit.canbeused == 1) {
                        writeText("You go " + fexit.direction)
                        EnterLocation(findLocationByID(fexit.isexitto));
                    } else {
                        if (fexit.hidden == 0) {
                            // hidden exit
                            writeText("You can't go that way...<br/>");
                        }
                        if (fexit.canbeused == 0) {
                            // exit needs something to open it
                            writeText(fexit.cbutext + "<br/>");
                        }

                    }
                } else {
                    writeText("There is no such exit in this location... <br/>");
                }
            }
            if (cmd == "exits") {
                writeExits();
            }

        }
        //console.log("Value of the input field: " + inputValue);
    }
});

function writeExits() {
    currentLocation.exits.forEach(function (exit) {
        if (exit.hidden == 0) {
            // writeText(exit.name + "<br/>");
            writeText("A " + exit.name + " is leading " + exit.direction);
        }
    });
}


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
                    obj.usecombo = action.newstate;
                }

            }
        });
        currentLocation.exits.forEach(function (exit) {
            if (exit.id == action.target) {
                // change the state of the target object
                if (action.statechange == "hidden") {
                    exit.hidden = action.newstate;
                }
                if (action.statechange == "canbeused") {
                    exit.canbeused = action.newstate;
                }
                if (action.statechange == "cbutext") {
                    exit.cbutext = action.newstate;
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

    input = input.toLowerCase();
    let rexit = null;
    currentLocation.exits.forEach(function (exit) {
        if ((input.includes(exit.name.toLowerCase()) && exit.hidden == 0)) {
            rexit = exit;
        }
        // if the last word is n,s,e,w,u or d then it is a direction
        let words = input.split(" ");
        let lastword = words[words.length - 1];
        if (lastword == "n" || lastword == "s" || lastword == "e" || lastword == "w" || lastword == "up" || lastword == "down") {
            if (exit.direction.toLowerCase() == lastword) {
                rexit = exit;
            }
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
    s = "<br/>" + s;
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
                if (obj.takeaction != 0) {
                    window.Game.Actions.forEach(function (act) {
                        if (act.id == obj.takeaction) {
                            doAction(act);
                        }
                    });
                }

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

function findLocationByID(id) {
    let loc = null;
    window.Game.Locations.forEach(function (location) {
        if (location.id == id) {
            loc = location;
        }
    });
    return loc;
}


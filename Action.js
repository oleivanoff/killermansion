class Action {
    constructor(id, text, statechange, newstate, target, addtoinventory, timeractionid, gotolocation, nextactionid) {
        this.id = id;
        this.text = text;
        this.statechange = statechange;
        this.newstate = newstate;
        this.target = target;
        this.addtoinventory = addtoinventory;
        this.timeractionid = timeractionid;
        this.gotolocation = gotolocation;
        this.nextactionid = nextactionid;
    }
}

export default Action;
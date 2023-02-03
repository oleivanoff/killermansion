class AdvObject {
    constructor(id, name, type, originallocation, takeable, hidden, takeaction, examineaction, canbeused, cbutext, usecombo) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.originallocation = originallocation;
        this.takeable = takeable;
        this.hidden = hidden;
        this.takeaction = takeaction;
        this.examineaction = examineaction;
        this.canbeused = canbeused;
        this.cbutext = cbutext;
        this.usecombo = usecombo;
    }
}

export default AdvObject;


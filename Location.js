class Location {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.exits = [];
    }
}

export default Location;
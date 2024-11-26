let { people } = require("../data")

const addPerson = (req, res) => {
    if (req.body.name) {
        const name = req.body.name
        people.push({ id: people.length + 1, name: req.body.name });
        res.status(201).json({ success: true, name: req.body.name });
    }
    else {
        res.status(400).json({ success: false, message: "Please provide a name" });
    }
}

const getPeople = (req, res) => {
    res.json(people);
}

const getPersonById = (req, res) => {
    const personID = parseInt(req.params.id)
    const person = people.find((p) => p.id === personID)
    res.status(200).json({ success: true, name: person });
}

const updatePersonById = (req, res) => {
    const name = req.body.name
    const personID = parseInt(req.params.id)
    const person = people.find((p) => p.id === personID)
    console.log(person)

    if (!person) {
        return res.status(404).json('Person not found');
    }
    person.name = name
    return res.status(200).json({message : 'Person info has been updated' , people : people});
    }


const deletPersonById = (req, res) => {
    const personID = parseInt(req.params.id)
    
    people = people.filter((p) => p.id !== personID)

    res.json({message : `Person with id : ${personID} has been deleted`, updatedPeople : people} )
}



module.exports = { addPerson, getPeople, getPersonById,updatePersonById,deletPersonById }
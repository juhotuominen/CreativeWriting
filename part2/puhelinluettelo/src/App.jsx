import React, { useEffect, useState } from 'react';
import axios from 'axios'

import FilterForm from './components/FilterForm';
import AddPersonForm from './components/AddPersonForm';
import Persons from './components/Persons';

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personsService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if (persons.some((person) => person.name === newName)) {
      const existingPerson = persons.find((person) => person.name === newName);
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(existingPerson.id);
      }    
      return;
    } else {
      personsService
        .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
    }
  };

  const updatePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const updatedPerson = { ...person, number: newNumber }
    personsService
      .update(id, updatedPerson)
      .then(response => {
        setPersons(persons.map(person => person.id !== id ? person : response.data))
      })
  }

  const deletePerson = (id) => {
    if (window.confirm(`Delete person with ID ${id} ?`)){
      personsService
       .deletePerson(id)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a New</h2>
      <AddPersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons 
        filteredPersons={filteredPersons}
        deletePerson={deletePerson}/>
    </div>
  );
};

export default App;


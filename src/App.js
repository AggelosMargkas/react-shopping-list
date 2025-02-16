import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState } from "react";
import AddItem from './AddItem';

function App() {

  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));

  const [newItem, setNewItem] = useState('')


  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  }

  
  const addItem = (item) => {
    /* Set the new id based on the lenght of the list. If the
       list is empty set id = 1. I don't think this is going to
       work properly if we delete and add many objects.
       TODO: test the id update.  */

    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [ ...items, myNewItem ];
    setAndSaveItems(listItems);
  }


  const handleCheck = (id) => {
    /* Adding a handler to change the state of the items when checked.
      It should be added on a onClick event, because it will not listen
      To the changes of the status of the items dynamically. 

      For this reason we add it on the onChange value of the input and 
      we use and anonymous function call it using as input the id of the
      item id.
      
      We dont want to change the state directly
      we use map that is a high state function.
    */

    const listItems = items.map((item) => item.id === id ? { ...item, checked:!item.checked } : item);
    setAndSaveItems(listItems);
  }

  const handleDelete = (id) => {
      /* Using the filter function to create a new array that has filtered out
      the item ids that ARE NOT equal to the one that we pass in. */
      const listItems = items.filter((item) => item.id != id);
      setAndSaveItems(listItems);
  }


  const handleSubmit = (e) => {
  /* Handles the submission when we receive and input
    prevent default reloading of the page.
  */
    e.preventDefault();
   
    if(!newItem) return;

    addItem(newItem);
    setNewItem('');
  }

  
  return (
    <div className="App">
      <Header title="Grocery List"/>
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <Content 
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer 
      itemsCounter={items.length}/>
    </div>
  );
}

export default App;

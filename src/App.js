import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from "react";
import AddItem from './AddItem';
import SearchItem from './SearchItem';

function App() {

  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  /* useEffect basically does something when a dependency is changing
    An example use could be that you fetch an API when you reload a page
    or for example when you change another component(e.g a map)
    
    Useful information regarding useEffect from the React man page.

    1. useEffect is a Hook, so you can only call it at the top level of your component or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.
    
    2. If you’re not trying to synchronize with some external system, you probably don’t need an Effect.
    
  */

  useEffect(() => {
  localStorage.setItem('shoppinglist', JSON.stringify(items));
  }, [items])
  
  const addItem = (item) => {
    /* Set the new id based on the length of the list. If the
       list is empty set id = 1. I don't think this is going to
       work properly if we delete and add many objects.
       TODO: test the id update.  */

    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [ ...items, myNewItem ];
    setItems(listItems);
    }


  const handleCheck = (id) => {
    /* Adding a handler to change the state of the items when checked.
      It should be added on a onClick event, because it will not listen
      To the changes of the status of the items dynamically. 

      For this reason we add it on the onChange value of the input and 
      we use and anonymous function call it using as input the id of the
      item id.
      
      We don't want to change the state directly
      we use map that is a high state function.
    */

    const listItems = items.map((item) => item.id === id ? { ...item, checked:!item.checked } : item);
    setItems(listItems);
  }

  const handleDelete = (id) => {
      /* Using the filter function to create a new array that has filtered out
      the item ids that ARE NOT equal to the one that we pass in. */
      const listItems = items.filter((item) => item.id != id);
      setItems(listItems);
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
      <SearchItem 
        search={search}
        setSearch={setSearch}
      />
      <Content 
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer 
      itemsCounter={items.length}/>
    </div>
  );
}

export default App;

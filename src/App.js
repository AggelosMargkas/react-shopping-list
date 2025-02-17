import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from "react";
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

function App() {
  const API_URL = 'http://localhost:3500/items'
  
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const[isLoading, setIsLoading] = useState(true);

  /* useEffect basically does something when a dependency is changing
    An example use could be that you fetch an API when you reload a page
    or for example when you change another component(e.g a map)
    
    Useful information regarding useEffect from the React man page.

    1. useEffect is a Hook, so you can only call it at the top level of your component or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.
    
    2. If you’re not trying to synchronize with some external system, you probably don’t need an Effect.
    
  */

  useEffect(() => {
    const fetchItems = async () => {
      try{
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Didn't receive data from source");    
        const listItems = await response.json();
        setItems(listItems);
      } catch (err){
        setFetchError(err.message);
      } finally{
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      (async () => await fetchItems())();

    }, 2000)
    //fetchItems();
  }, [])
  
  const addItem = async (item) => {
    /* Set the new id based on the length of the list. If the
       list is empty set id = 1. I don't think this is going to
       work properly if we delete and add many objects.
       TODO: test the id update.  */

    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [ ...items, myNewItem ];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  }


  const handleCheck = async (id) => {
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

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked})
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  }

  const handleDelete = async (id) => {
      /* Using the filter function to create a new array that has filtered out
      the item ids that ARE NOT equal to the one that we pass in. */
      const listItems = items.filter((item) => item.id !== id);
      setItems(listItems);

      const deleteOptions = {method: 'DELETE'};
      const reqUrl = `${API_URL}/${id}`;
      const result = await apiRequest(reqUrl, deleteOptions);
      if (result) setFetchError(result);
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
      <main>
      {isLoading && <p>Loading items... </p>}
      {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}` }</p>}
      {!fetchError && !isLoading && 
        <Content 
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        />
      }
      </main>

      <Footer 
      itemsCounter={items.length}/>
    </div>
  );
}

export default App;

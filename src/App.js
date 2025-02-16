import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState } from "react";


function App() {

  /* Temporary data example */
  const [items, setItems] = useState([
    {
        id: 1,
        checked: true,
        item: "Flowers"
    },
    {
        id: 2,
        checked: false,
        item: "Item 2"
    },
    {
        id: 3,
        checked: false,
        item: "Item3"
    }
  ]);

  /* Adding a handler to change the state of the items when checked.
    It should be added on a onClick event, because it will not listen
    To the changes of the status of the items dynamically. 

    For this reason we add it on the onChange value of the input and 
    we use and anonymous function call it using as input the id of the
    item id.
  */
  const handleCheck = (id) => {
      /* We dont want to change the state directly
        we use map that is a high state function.
      */
      const listItems = items.map((item) => item.id === id ? { ...item, checked:!item.checked } : item);
      setItems(listItems);
      /* Keeping the status on local storage for potential HTTP requests. */
      localStorage.setItem('shoppinglist', JSON.stringify(listItems));
  }

  const handleDelete = (id) => {
      /* Using the filter function to create a new array that has filtered out
      the item ids that ARE NOT equal to the one that we pass in. */
      const listItems = items.filter((item) => item.id != id);
      setItems(listItems);
      localStorage.setItem('shoppinglist', JSON.stringify(listItems));
  }

  return (
    <div className="App">
      <Header title="Grocery List"/>
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

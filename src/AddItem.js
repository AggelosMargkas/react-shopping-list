import { FaPlus } from "react-icons/fa"

const AddItem = ({ newItem, setNewItem, handleSubmit} ) => {


    return(
        <form className="addForm" onSubmit={handleSubmit}>
            <label htmlFor="addItem">Add Item</label>
            <input
                autoFocus
                id="addItem"
                type="text"
                placeholder="Add Item"
                required
                /* Setting the state to be the one source of truth 
                   Then when an event happens it will trigger the 
                   set function and it will pass the value to the 
                   newItem value. By start typing on the text you
                   can see the new state of the newItem on the 
                   component on the React plugin.*/
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button
                type="submit"
                aria-label="Add Item"
            >
                <FaPlus />
            </button>
        </form>
    )

}


export default AddItem
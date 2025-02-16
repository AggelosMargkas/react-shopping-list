import { FaTrashAlt } from "react-icons/fa";
import Item from "./Item";


const ListItems = ({ items, handleCheck, handleDelete }) => {

    return(
        <ul>
        {items.map((item) => (
            <Item
                key={item.id}
                item={item} 
                handleCheck={handleCheck}
                handleDelete={handleDelete}
            />
        ))}
    </ul>
    )

}

export default ListItems


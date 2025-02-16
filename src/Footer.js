const Footer = ({itemsCounter = 0}) => {
    

    return(
        <footer>

        <p>{itemsCounter} {(itemsCounter === 1) ? "item" : "items"}</p>
        </footer>
    )

}
export default Footer
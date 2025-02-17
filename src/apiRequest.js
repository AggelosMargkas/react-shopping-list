const apiRequest = async(URL = '', optionsObj = null, errMsg = null) => {
    try{
        console.log(URL);
        console.log(optionsObj);
        const response = await fetch(URL, optionsObj);
        if (!response.ok) throw Error('Error: reload the app');
    } catch (err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }


}

export default apiRequest;
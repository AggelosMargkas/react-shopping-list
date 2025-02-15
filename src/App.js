import logo from './logo.svg';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';


function App() {
  const handleNameChange = () =>{
    const names = ['Nondas', 'Angelos', 'Kostas'];
    const randomInt = Math.floor(Math.random() * 3);

    return names[randomInt];
  }

 
  const name = "Angelos";

  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;

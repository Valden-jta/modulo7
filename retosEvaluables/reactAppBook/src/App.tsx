import Footer from "./components/Footer";
import Header from "./components/Header";
import Aside from "./components/Aside";
import BookPage from "./pages/BookPage";
import "./App.css";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header></Header>
        <main className="flex flex-1 justify-evenly items-top">
          <Aside></Aside>
          <BookPage></BookPage>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;

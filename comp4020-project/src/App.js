import { Route, Routes } from "react-router-dom";
//improt pages
import BasicLayout from "./Layouts/basicLayout";
import ExpireList from "./pages/ExpireList";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import ShoppingList from "./pages/ShoppingList";
import StorageList from "./pages/StorageList";
import Scanning from "./pages/Scanning";
import SearchComponent from "./components/SearchComponent";
import EditComponent from "./components/EditComponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route index element={<Home />} />
        <Route path="expireList" element={<ExpireList />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="shoppingList" element={<ShoppingList />} />
        <Route path="storageList" element={<StorageList />} />
        <Route path="scanning" element={<Scanning />} />
        <Route path="search" element={<SearchComponent />} />
        <Route path="edit" element={<EditComponent />} />
      </Route>
    </Routes>
  );
}

export default App;

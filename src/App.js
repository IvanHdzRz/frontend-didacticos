/* import {SearchDidactico} from './views/SearchDidactico' */

import { AppState } from "./appState/AppState";
import { AppRouter } from "./routers/AppRouter";

function App() {
  
  return (
    <AppState>
      <AppRouter />
    </AppState>
  );
}

export default App;



import React from "react";
import { createRoot} from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

//React Context Provider
import { VisionUIControllerProvider } from "context";
import store from "layouts/redux/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(<BrowserRouter>
<Provider store={store}>
  <VisionUIControllerProvider>
    <App />
  </VisionUIControllerProvider>
  </Provider>,
</BrowserRouter>)


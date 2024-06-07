import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PageNotFound from "./pages/404/PageNotFound.tsx";
import GalleryPage from "./pages/gallery/GalleryPage.tsx";
import GalleryItemDetail from "./pages/gallery-item-detail/GalleryItemDetail.tsx";
import Error from "./commons/components/Error.tsx";
import {setupStore} from "./app/store.ts";
import {theme} from "./utils/defaults.ts";
import {ThemeProvider} from "styled-components";

const store = setupStore();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error/>, // Root level error handling
    children: [
      {index: true, element: <GalleryPage/>},
      {
        path: ":id/*",
        element: <GalleryItemDetail/>,
        errorElement: <Error/> // Error handling for nested route
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound/>  // Catch-all route for unmatched paths
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)

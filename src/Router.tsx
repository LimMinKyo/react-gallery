import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Slide from './routes/Slide';
import testJson from './test.json';

interface IData {
  renderings: {
    _id: string;
  }[];
}

function Router() {
  const [data, setData] = useState<IData>(testJson);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route
          path="/slide"
          element={<Slide data={data} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

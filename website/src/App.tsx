import { ThemeProvider } from 'next-themes';
import Home from './pages/home';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Home />
    </ThemeProvider>
  );
}

export default App;

import { ThemeProvider } from './hooks/useTheme.jsx'
import Home from './pages/Home.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  )
}

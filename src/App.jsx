import { ThemeProvider } from './hooks/useTheme.jsx'
import Home from './pages/Home.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <CursorGlow />
      <Home />
    </ThemeProvider>
  )
}

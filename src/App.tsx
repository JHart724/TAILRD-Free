import Sidebar from './design-system/Sidebar'
import TopBar from './design-system/TopBar'
import FreeTierDashboard from './components/free-tier/FreeTierDashboard'

export default function App() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <TopBar />
        <main
          id="main-content"
          style={{ flex: 1, overflowY: 'auto' }}
        >
          <FreeTierDashboard />
        </main>
      </div>
    </div>
  )
}

import './App.css'
import ProfileCard from './ProfileCard'
import Feed from './Feed'

function App() {
  return (
    <div className="app-grid">
      <aside className="profile-area">
        <ProfileCard />
      </aside>
      <main className="feed-area">
        <Feed />
      </main>
    </div>
  )
}

export default App

import './ProfileCard.css'

export default function ProfileCard() {
  return (
    <div className="profile-card">
      <img className="profile-avatar" src="https://randomuser.me/api/portraits/women/44.jpg" alt="Foto de perfil" />
      <div className="profile-info">
        <strong>Leslie Alexander</strong>
        <span>UI Designer</span>
      </div>
      <button className="edit-profile-btn">Editar seu perfil</button>
    </div>
  )
} 
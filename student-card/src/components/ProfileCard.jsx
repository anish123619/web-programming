const DEFAULT_AVATAR =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='80' height='80' fill='%23cbd5e1'/><circle cx='40' cy='32' r='14' fill='%2394a3b8'/><ellipse cx='40' cy='72' rx='26' ry='20' fill='%2394a3b8'/></svg>";

function ProfileCard({ name, role, email, avatarUrl = DEFAULT_AVATAR }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, maxWidth: 300 }}>
      <img src={avatarUrl} alt={name} style={{ borderRadius: '50%', width: 80 }} />
      <h2>{name}</h2>
      <p>{role}</p>
      <a href={`mailto:${email}`}>{email}</a>
    </div>
  );
}

export default ProfileCard;
import { useState, useEffect, useRef } from 'react';

const MAJORS = [
  'Computer Engineering',
  'Software Engineering',
  'Electrical Engineering',
  'Business Administration',
  'Design',
];

const EMPTY = { name: '', studentId: '', major: '', year: '', bio: '' };

function FieldError({ id, message }) {
  return <span id={id} className="pe-error">{message}</span>;
}

function ProfileEditor() {
  const [form, setForm] = useState(EMPTY);
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [attempted, setAttempted] = useState(false);
  const [profile, setProfile] = useState(null);
  const fileRef = useRef(null);

  // Make a temporary address for the chosen photo, and free it afterwards
  useEffect(() => {
    if (!photo) {
      setPreviewUrl('');
      return;
    }
    const url = URL.createObjectURL(photo);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  // One handler for every text field, select, textarea and radio
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  // File inputs can't be controlled, so read them through a ref
  function handlePhoto() {
    setPhoto(fileRef.current.files[0] || null);
  }

  function addSkill() {
    const s = skillInput.trim();
    if (s && !skills.includes(s) && skills.length < 10) {
      setSkills(prev => [...prev, s]);
    }
    setSkillInput('');
  }

  function handleSkillKey(e) {
    if (e.key === 'Enter') {
      e.preventDefault(); // Enter must not submit the whole form
      addSkill();
    }
  }

  function removeSkill(skill) {
    setSkills(prev => prev.filter(s => s !== skill));
  }

  // Returns an errors object. An empty object means everything is valid.
  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.studentId) errs.studentId = 'Student ID is required';
    else if (!/^\d{10}$/.test(form.studentId)) errs.studentId = 'Student ID must be exactly 10 digits';
    if (!form.major) errs.major = 'Please choose a major';
    if (!form.year) errs.year = 'Please choose a year';
    if (!form.bio.trim()) errs.bio = 'Bio is required';
    else if (form.bio.length > 200) errs.bio = 'Bio must be 200 characters or fewer';
    if (!photo) errs.photo = 'Please choose a photo';
    else if (!photo.type.startsWith('image/')) errs.photo = 'The file must be an image';
    return errs;
  }

  // After the first submit attempt, errors update live as the user fixes them
  const errors = attempted ? validate() : {};

  function handleSubmit(e) {
    e.preventDefault();
    setAttempted(true);
    if (Object.keys(validate()).length > 0) return;

    const result = { ...form, skills, photoUrl: previewUrl };
    console.log(result);
    setProfile(result);
  }

  // Profile Preview card
  if (profile) {
    return (
      <div className="pe-preview">
        <h3>Profile Preview</h3>
        <div className="pe-card">
          <img src={profile.photoUrl} alt={profile.name} />
          <h4>{profile.name}</h4>
          <p>ID {profile.studentId} · Year {profile.year}</p>
          <p>{profile.major}</p>
          <p>{profile.bio}</p>
          <p className="pe-muted">bio: {profile.bio.length} / 200</p>
          {profile.skills.length > 0 && (
            <div className="pe-tags">
              {profile.skills.map(s => (
                <span className="pe-tag" key={s}>{s}</span>
              ))}
            </div>
          )}
        </div>
        <button onClick={() => setProfile(null)}>Edit profile</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="pe-form">
      <div className="pe-field">
        <label htmlFor="name">Name</label>
        <input
          id="name" name="name" value={form.name} onChange={handleChange}
          aria-invalid={!!errors.name} aria-describedby="name-error"
        />
        <FieldError id="name-error" message={errors.name} />
      </div>

      <div className="pe-field">
        <label htmlFor="studentId">Student ID (10 digits)</label>
        <input
          id="studentId" name="studentId" inputMode="numeric"
          value={form.studentId} onChange={handleChange}
          aria-invalid={!!errors.studentId} aria-describedby="studentId-error"
        />
        <FieldError id="studentId-error" message={errors.studentId} />
      </div>

      <div className="pe-field">
        <label htmlFor="major">Major</label>
        <select
          id="major" name="major" value={form.major} onChange={handleChange}
          aria-invalid={!!errors.major} aria-describedby="major-error"
        >
          <option value="">Choose a major</option>
          {MAJORS.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <FieldError id="major-error" message={errors.major} />
      </div>

      <fieldset className="pe-field">
        <legend>Year</legend>
        <div>
          {[1, 2, 3, 4].map(y => (
            <label key={y} className="pe-radio">
              <input
                type="radio" name="year" value={String(y)}
                checked={form.year === String(y)} onChange={handleChange}
              />
              {y}
            </label>
          ))}
        </div>
        <FieldError id="year-error" message={errors.year} />
      </fieldset>

      <div className="pe-field">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio" name="bio" rows={4} value={form.bio} onChange={handleChange}
          aria-invalid={!!errors.bio} aria-describedby="bio-error"
        />
        <span className={form.bio.length > 200 ? 'pe-count pe-over' : 'pe-count'}>
          {form.bio.length} / 200
        </span>
        <FieldError id="bio-error" message={errors.bio} />
      </div>

      <div className="pe-field">
        <label htmlFor="photo">Photo</label>
        <input
          id="photo" type="file" accept="image/*" ref={fileRef} onChange={handlePhoto}
          aria-invalid={!!errors.photo} aria-describedby="photo-error"
        />
        {photo && <p className="pe-muted">Selected: {photo.name}</p>}
        {previewUrl && photo.type.startsWith('image/') && (
          <img className="pe-photo" src={previewUrl} alt="Preview of the chosen photo" />
        )}
        <FieldError id="photo-error" message={errors.photo} />
      </div>

      <div className="pe-field">
        <label htmlFor="skills">Skills (optional, press Enter to add)</label>
        <input
          id="skills" value={skillInput} placeholder="e.g. React"
          onChange={e => setSkillInput(e.target.value)} onKeyDown={handleSkillKey}
        />
        <div className="pe-tags">
          {skills.map(s => (
            <span className="pe-tag" key={s}>
              {s}
              <button type="button" aria-label={`Remove ${s}`} onClick={() => removeSkill(s)}>×</button>
            </span>
          ))}
        </div>
      </div>

      <button type="submit">Save profile</button>
    </form>
  );
}

export default ProfileEditor;
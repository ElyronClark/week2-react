import { useState, useEffect } from 'react'

function App() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [newSkill, setNewSkill] = useState('')

  useEffect(() => {
    fetch('https://week2-express-production.up.railway.app/skills')
      .then(res => res.json())
      .then(data => {
        setSkills(data.skills)
        setLoading(false)
      })
  }, [])

  const addSkill = async () => {
    if (!newSkill) return
    const response = await fetch('https://week2-express-production.up.railway.app/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skill: newSkill })
    })
    const data = await response.json()
    setSkills(data.skills)
    setNewSkill('')
  }

  return (
    <div>
      <h1>My Skills</h1>
      {loading ? <p>Loading...</p> : (
        <ul>
          {skills.map(skill => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      )}
      <input
        value={newSkill}
        onChange={e => setNewSkill(e.target.value)}
        placeholder="Add a skill"
      />
      <button onClick={addSkill}>Add</button>
    </div>
  )
}

export default App
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ErrorContext, AuthContext } from "../App";

const ProfileForm = (
  user,
  description,
  setDescription,
  languages,
  setLanguages,
  media,
  setMedia,
  projects,
  setProjects,
  mediaName,
  setMediaName,
  mediaUrl,
  setMediaUrl,
  projectName,
  setProjectName,
  projectUrl,
  setProjectUrl
) => {
  return (
    <div className="profile-form">
      <div>
        <h4>Role: {user.role}</h4>
        {/* <input type="text" name="role" id="role" value={role} onChange={e => setRole(e.target.value)}/> */}
        <p>Description: </p>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <div>
          <p> Languages / Skills: </p>
          <input
            type="text"
            name="description"
            id="description"
            value={languages.map((language) => language)}
            onChange={(e) => setLanguages(e.target.value.split(","))}
          />
          <p>Media: </p>
          <ul>
            {media.map((mediaData) => (
              <li key={mediaData.name}>
                <a
                  href={mediaData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {mediaData.name}
                </a>
              </li>
            ))}
          </ul>
          <form>
            <label>
              <p>Media Name:</p>
              <input
                type="text"
                value={mediaName}
                onChange={(e) => {
                  setMediaName(e.target.value);
                }}
              />
            </label>
            <label>
              <p>Media URL:</p>
              <input
                type="text"
                value={mediaUrl}
                required
                onChange={(e) => {
                  setMediaUrl(e.target.value);
                }}
              />
            </label>
            <div>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setMedia([...media, { name: mediaName, url: mediaUrl }]);
                }}
              >
                Add Media
              </button>
            </div>
          </form>
        </div>
        <p>Projects: </p>
        <ul>
          {projects.map((project) => (
            <li key={project.name}>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
            </li>
          ))}
        </ul>
        <form>
          <label>
            <p>Project Name:</p>
            <input
              type="text"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />
          </label>
          <label>
            <p>Project URL:</p>
            <input
              type="text"
              value={projectUrl}
              required
              onChange={(e) => {
                setProjectUrl(e.target.value);
              }}
            />
          </label>
          <div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setProjects([
                  ...projects,
                  { name: projectName, url: projectUrl },
                ]);
              }}
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProfileView = (user, languages, media, projects) => {
  return (
    <div className="profile-view">
      <div>
        <h4>Role: {user.role}</h4>
        {/* <input type="text" name="role" id="role" value={role} onChange={e => setRole(e.target.value)}/> */}
        <p>Description: {user.description}</p>
      </div>
      <div>
        <div>
          <p>Languages / Skills: </p>
          <ul>
            {languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <p>Media: </p>
          <ul>
            {media.map((mediaData) => (
              <li key={mediaData.name}>
                <a
                  href={mediaData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {mediaData.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p>Projects: </p>
        <ul>
          {projects.map((project) => (
            <li key={project.name}>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function Profile() {
  const { id: userId } = useParams();
  const [canEdit, setCanEdit] = useState(false);
  //   const [role, setRole] = useState();
  const [description, setDescription] = useState();
  const [languages, setLanguages] = useState([]);
  const [media, setMedia] = useState([]);
  const [projects, setProjects] = useState([]);
  const [mediaName, setMediaName] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectUrl, setProjectUrl] = useState("");

  const errorContext = useContext(ErrorContext);
  const { user, setUser } = useContext(AuthContext);
  const { setError } = errorContext;

  useEffect(() => {
    setError({});
  }, [setError]);

  useEffect(() => {
    axios("http://localhost:3000/api/users/getUser/" + userId)
      .then((response) => setUser(response.data.user))
      .catch((err) => setError(err));
  }, [setError, setUser, userId]);

  useEffect(() => {
    // setRole(user.role)
    if (user.description && user.languages && user.media && user.projects) {
      setDescription(user.description);
      setLanguages(user.languages.length ? user.languages : []);
      setMedia(user.media.length ? user.media : []);
      setProjects(user.projects.length ? user.projects : []);
    }
  }, [user, user.description, user.languages, user.media, user.projects]);

  const handleSubmit = async () => {
    const data = {
      description,
      languages: languages.filter((lang) => lang.trim().length),
      media,
      projects,
      id: user._id,
    };

    await axios({
      url: "http://localhost:3000/api/users/updateProfile",
      method: "PUT",
      data,
    })
      .then((res) => {
        if (res.data) {
          setUser({ ...res.data.user });
          setCanEdit(false);
          setError({});
        }
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  const handleSignOut = async () => {
    await axios({
      url: "http://localhost:3000/api/users/signout",
    });
    setUser({});
  };

  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <button onClick={handleSignOut}>Sign Out</button>
      {canEdit ? (
        <button onClick={handleSubmit}>Save Profile</button>
      ) : (
        <button onClick={() => setCanEdit(true)}>Edit Profile</button>
      )}

      {canEdit
        ? ProfileForm(
            user,
            description,
            setDescription,
            languages,
            setLanguages,
            media,
            setMedia,
            projects,
            setProjects,
            mediaName,
            setMediaName,
            mediaUrl,
            setMediaUrl,
            projectName,
            setProjectName,
            projectUrl,
            setProjectUrl
          )
        : ProfileView(user, languages, media, projects)}
    </div>
  );
}

export default Profile;

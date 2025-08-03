import './About.css';
import { Link } from 'react-router-dom';
import photo from '../../assets/internMichael-JS.webp';
import { useAppContext } from '../../app/appContext';

const About = () => {
  const { theme } = useAppContext();
  const aboutClassName = `${theme} about-container`;
  return (
    <div className={aboutClassName}>
      <h2 className="about-title">About This Project</h2>

      <section className="about-section">
        <h2>📘 Project Description</h2>
        <p>
          This project is a Pokemon search app where users can search for
          Pokemon and view their stats. It was created as part of a front-end
          development course.
        </p>
        <p>
          Course link:{' '}
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            RS School React 2025 Course
          </a>
        </p>
      </section>

      <section className="about-section developer-section">
        <h2>👩‍💻 Developer</h2>
        <div className="about-dev">
          <img src={photo} alt="developer" className="developer-photo" />
          <p>
            Hi! My name is Michael, I am a front-end developer practicing
            building responsive interfaces with React and TypeScript. This
            project helped me deepen my understanding of React hooks, routing,
            testing, and working with APIs.
          </p>
        </div>
        <p>
          GitHub:{' '}
          <a
            href="https://github.com/internMichael-JS"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/internMichael-JS
          </a>
        </p>
      </section>
      <Link to="/" className="home-button">
        Go to Search page
      </Link>
    </div>
  );
};

export default About;

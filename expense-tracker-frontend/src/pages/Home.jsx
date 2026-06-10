import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="container py-5 text-center">
        <h1 className="display-2 fw-bold mb-3">ExpenseTracker Pro 💰</h1>

        <p className="lead text-secondary mb-4">
          Full Stack Personal Finance Management System built using React,
          Node.js, Express and MongoDB.
        </p>

        <Link to="/dashboard" className="btn btn-dark btn-lg px-5 me-3">
          Launch Dashboard
        </Link>

        <a href="#features" className="btn btn-outline-dark btn-lg px-5">
          View Features
        </a>
      </section>

      {/* About Project */}
      <section className="container py-5">
        <div className="card shadow border-0 p-5">
          <h2 className="fw-bold mb-4">About The Project</h2>

          <p className="fs-5 text-secondary">
            ExpenseTracker Pro is a full stack finance management application
            that allows users to securely manage income, expenses and financial
            records. The application uses JWT Authentication, MongoDB Database
            and REST APIs to provide real-time financial tracking.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-5">
        <h2 className="text-center fw-bold mb-5">Key Features</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow border-0 p-4">
              <h4>🔐 Authentication</h4>
              <p>
                Secure Login, Registration, JWT Authentication and Protected
                Routes.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow border-0 p-4">
              <h4>💰 Income Tracking</h4>
              <p>
                Add, Edit and Delete income transactions with real-time updates.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow border-0 p-4">
              <h4>📉 Expense Tracking</h4>
              <p>Manage expenses efficiently and monitor spending habits.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow border-0 p-4">
              <h4>📊 Dashboard Analytics</h4>
              <p>
                Income vs Expense charts, balance calculation and transaction
                history.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow border-0 p-4">
              <h4>☁️ Cloud Deployment</h4>
              <p>Frontend deployed on Vercel and Backend hosted on Render.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow border-0 p-4">
              <h4>⚡ REST APIs</h4>
              <p>
                Fully functional CRUD APIs built using Express.js and MongoDB.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container py-5">
        <div className="card shadow border-0 p-5">
          <h2 className="fw-bold mb-4 text-center">Technology Stack</h2>

          <div className="row text-center">
            <div className="col-md-4">
              <h4>Frontend</h4>
              <p>React.js</p>
              <p>Bootstrap 5</p>
              <p>Axios</p>
              <p>React Router</p>
            </div>

            <div className="col-md-4">
              <h4>Backend</h4>
              <p>Node.js</p>
              <p>Express.js</p>
              <p>JWT Authentication</p>
            </div>

            <div className="col-md-4">
              <h4>Database</h4>
              <p>MongoDB Atlas</p>
              <p>Mongoose ODM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-5 mt-5">
        <h4 className="fw-bold mb-2">ExpenseTracker Pro 💰</h4>

        <p className="mb-3">
          Developed by <strong>Aneek Ghosh</strong>
        </p>

        <div className="d-flex justify-content-center gap-4 mb-3">
          <a
            href="https://github.com/AneekGhosh"
            target="_blank"
            rel="noreferrer"
            className="text-decoration-none text-light"
          >
            🔗 GitHub
          </a>

          <a
            href="www.linkedin.com/in/aneek-ghosh-a93127249"
            target="_blank"
            rel="noreferrer"
            className="text-decoration-none text-light"
          >
            💼 LinkedIn
          </a>
        </div>

        <p className="small text-secondary mb-0">
          Built with React • Node.js • Express • MongoDB
        </p>

        <p className="small text-secondary">
          © 2026 ExpenseTracker Pro. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

export default Home;

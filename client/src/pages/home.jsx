import React from "react";

export default function Home() {
  return (
    <>
      <header>
        <title>Sample Invoicing App</title>
        <link rel="icon" href="/favicon.ico" />
      </header>

      <main>
        <h1 className="title">
          Welcome to <a href="/">Invoicing App!</a>
        </h1>

        <p className="description">
          Get started by clicking links below or
          <code>
            <a href="/signup">Sign Up!</a>
          </code>
        </p>

        <div className="grid">
          <a href="/signin" className="card">
            <h3>Sign In&rarr;</h3>
            <p>Dive into the App. Login using Google or Email!</p>
          </a>

          <a href="./dashboard" className="card">
            <h3>Dashboard &rarr;</h3>
            <p>Directly access the invoice dashboard!</p>
          </a>

          <a
            href="./files/Answers to technical questions.md"
            target="_blank"
            rel="noreferrer"
            className="card"
          >
            <h3>Answers &rarr;</h3>
            <p>Answers to technical questions asked in the challenge.</p>
          </a>

          <a
            href="https://cutshort.io/vc/5ffb1bb92eae780b613007a7"
            target="_blank"
            rel="noreferrer"
            className="card"
          >
            <h3>About Me &rarr;</h3>
            <p>
              Mayank Dwivedi | Web Developer experienced in React &amp; NodeJS.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

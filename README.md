# Geek Regime
![ci/cd](https://github.com/alexey-sol/geek-regime/workflows/production/badge.svg)

---

It's a collaborative blog (basically, a low-budget clone of Habr or Medium). Users sign up, write articles, vote. The app doesn't have this much features, only core ones: a basic admin panel, premoderation area, email notifications. This is due to the fact that many core things were built basically from scratch. Say, there's a homebrew ORM (a layer to work with DB) demanded a ton of refactoring (and time). Caching is performed via a layer utilizing bare Redis client. Authorization is also built from scratch: sessions, oauth, resetting a password.

## Usage
Only signed up users are able to write posts (the editor is third-party, BTW, powered with TinyMCE). You may sign up with your credentials or just using oauth providers (Google and Yandex are supported). The 1st method requires email verification but you may skip this step by switching a corresponding checkbox on when signing up (this checkbox was left for such demo purposes). If you forget your password, you can reset it.

A posted article lands in premoderation area (however you can skip this step if you want to, as well). Then an admin approves it so it gets published (and visible for other users), or rejects it with explaining comments. In the latter case you can edit your post and reaplly it. All the steps come along with emails.

Regarding other features: you can search for posts and users, edit and delete your posts, like/dislike someone else's posts, adjust account settings/profile (upload an avatar, change password). Pagination is presented.

In order to access the admin panel, you can sign in using these credentials:
```
admin@mail.com
123456
```

## Under the Hood
It's a full-stack project. As for technologies, backend is running on Node.js + Express and written in TypeScript. It's utilizing Postgres as a main DB and Redis for caching. Frontend is implemented using React + Redux, the design is responsive (styles utilize flexbox and grid layouts). All the stuff is packed into Docker services, so it's fairly easy to deploy. There's also basic CI/CD solution set up via GitHub Actions (the code that's been pushed to a certain branch, gets tested, and if everything is alright, gets deployed on a remote host with a proper environment). There's not a ton of tests, test coverage is far from 100% actually, but frontend and backend have some tests (Mocha + Chai for backend, Jest for frontend).

A funny thing: the production is running not on HTTPS but on HTTP. The reason is that the project is deployed on a virtual machine and I have no my own domain. And the existing generic domain isn't enough for Let's Encrypt.

## Quick Start
First of all, you need to have NPM, Docker, and Docker Compose installed in order to deploy the project locally.
- As for deploying, clone the repository, then create `.env` file in the project root on the basis of the provided `.env.example` file. Now you can run `npm run dev:up` from the root. The script will build all the services and run them in the foreground.
- To test the code, you first need to run the services via `npm run dev:up` (probably in a separate tab of the terminal, since the main process is running in the foreground), and then run `npm run dev:test`. Test script doesn't build a new environment, it operates on the already running one, although a new test DB gets created.
- In order to populate DB with dummy data, run `npm run dev:populate` from the root. But the services (DB at least) at this point should be spinning already.
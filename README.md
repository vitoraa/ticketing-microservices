# Ticketing Microservices App 

## Introduction 🎩
This is a web app that allows users to reserve and purchase tickets to events.

Each service is designed to act independently (from development to deployment).

Common logic, middleware, types, etc. are stored on a publicly hosted NPM repository which standardizes definitions and related content between services. This ensures that all information is uniform across each server.

### Learning Experience 📚

This project gave me a chance to work with new technolgies including:
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)

This project also taught me more about:
- [Database-per-service architectures](https://microservices.io/patterns/data/database-per-service.html)
- [Event-driven archtectures](https://aws.amazon.com/event-driven-architecture/)
- [Service workers](https://developers.google.com/web/fundamentals/primers/service-workers)
- Concurrency & data management issues

## Getting Started 🏁

### Requirements ✅
- Docker (Desktop)
- Kubernetes
- [Skaffold](https://skaffold.dev/docs/quickstart/)

### Notes 🖍
- If you try to open the url in chrome and you get a 'this connection is not safe', click anywhere on the page and type the phrase `thisisunsafe` to bypass security

## Features 🧩
This app has the following functionalities:
- Sign in/up

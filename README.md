# Graphite

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=JavierSanabriaMiranda_Graphite&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=JavierSanabriaMiranda_Graphite)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=JavierSanabriaMiranda_Graphite&metric=coverage)](https://sonarcloud.io/summary/new_code?id=JavierSanabriaMiranda_Graphite)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=JavierSanabriaMiranda_Graphite&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=JavierSanabriaMiranda_Graphite)

<p align="center">
  <img src="front/public/app_icon_rounded_square.png" height="200">
</p>


A privacy-first, local-first, and cross-platform note-taking application designed for absolute data ownership and seamless multi-device synchronization.

*Graphite was developed as a Final Degree Project (TFG) for the Software Engineering Degree at the University of Oviedo.*

---

## 🚀 Core Pillars

Graphite is built around three fundamental architectural concepts:

### 1. Local-First & Offline Functionality
* **Zero Dependency on Connectivity:** All notes are stored, processed, and managed locally on your device. You can create, edit, and organize your knowledge base without an active internet connection.
* **Instantaneous Performance:** Since data operations happen directly against local storage, UI rendering and text editing are smooth, with virtually zero latency.

### 2. Multi-Device Synchronization & Compatibility
* **Seamless Cloud Sync:** Features a robust, independent synchronization module capable of resolving conflicts and handling hierarchical data structures across different devices.
* **Platform Agnostic:** Designed to work cohesively across multiple form factors, allowing you to transition transparently from one device to another while keeping your information completely updated.

### 3. Absolute Privacy (Zero-Knowledge & E2EE)
* **End-to-End Encryption (E2EE):** Your notes are encrypted on your local device before they ever touch the network or cloud servers.
* **Zero-Knowledge Architecture:** The synchronization server acts as a blind data relay. It cannot read, index, or analyze your content. Only you hold the cryptographic keys required to decrypt your knowledge base.

---

## ✨ Features

* **Rich Text Editing:** Powered by a customizable and modern editing experience using **Tiptap**, offering a fluid block-like behavior and advanced text formatting.
* **Hierarchical Organization:** Structure your thoughts efficiently using nested structures and dynamic note relations.
* **Secure Sync Engine:** Built to exchange data reliably without compromising on the application's local-first performance or privacy guarantees.

---

## 🛠️ Tech Stack

* **Frontend/Core App:** Kotlin / Android (Material 3 UI, custom chart integrations, local storage architecture).
* **Rich Text Core:** Tiptap-based modular editor.
* **Security & Cryptography:** Industry-standard End-to-End Encryption primitives (AES-GCM, asymmetric key exchanges).
* **Backend Sincronización:** Custom synchronization server optimized for zero-knowledge data synchronization.

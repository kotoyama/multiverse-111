# multiverse-111 monorepo

This is a monorepo managing multiple web applications, built with Next.js, TypeScript, and using Bun as the package manager.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Applications](#running-the-applications)
- [Available Scripts](#available-scripts)
- [Switching Languages (English/Arabic)](#switching-languages-englisharabic)
- [Managing Bonuses](#managing-bonuses)
- [Managing Users](#managing-users)
- [Deposit Feature](#deposit-feature)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18 or higher (as specified in `package.json`)
- **Bun**: This project uses Bun as its package manager. Installation instructions can be found on the [official Bun website](https://bun.sh/).

## Installation

1.  **Clone the repository**:
    ```bash
    git clone git@github.com:kotoyama/multiverse-111.git
    cd multiverse-111
    ```
2.  **Install dependencies**:
    Using Bun, install all necessary dependencies for the monorepo:
    ```bash
    bun install
    ```

## Running the Applications

This monorepo uses Turbo to manage tasks across packages and applications.

-   **Start all applications in development mode**:
    ```bash
    bun run dev
    ```
    This command will typically start all applications defined in the `apps/` directory (e.g., `cosmoswin`) concurrently.

-   **Run a specific application** (Optional):
    If you need to run a single application (e.g., `cosmoswin`), you can often use Turbo's filtering capabilities:
    ```bash
    bun run dev --filter=cosmoswin
    ```
    *(Note: The exact filter name depends on the package name defined in its `package.json`)*

## Available Scripts

The following scripts are available at the root of the monorepo and can be run using `bun run <script-name>`:

-   `bun run build`: Builds all applications for production.
-   `bun run lint`: Lints the codebase across all packages and applications.
-   `bun run format`: Formats the code using Prettier.
-   `bun run check-types`: Runs TypeScript type checking.

## Switching Languages (English/Arabic)

The applications within this monorepo support internationalization (i18n), allowing users to switch between English and Arabic.

- Language switching is managed through the `LanguageSwitcher` component, which is part of the `packages/i18n` package.
- All translation data is stored in JSON files located within the `packages/i18n` package.
- Internationalization is implemented using the `next-intl` library. The implementation does not utilize routing for locale management, ensuring that language changes do not alter the URL structure.

## Managing Bonuses

A dedicated feature for managing new bonuses is **not implemented** in the current version of the applications. To add or modify bonus data, you can manually edit the mock files (e.g., JSON files in `packages/data`).

## Managing Users

These apps use a mock setup with NextAuth for user authentication:

- Pick a username from the mock files and enter it in the login form. Any password works.
- Manually edit the mock files to add a new user with a unique username.

## Deposit Feature

These applications include a deposit feature that allows logged-in users to simulate making a deposit.

- The feature provides a user interface where users can enter deposit amounts into the numeric input field. Once they click the deposit button, the amount will be added to the user's balance, and the deposit count will be incremented.
- Available bonuses are displayed based on the user’s personalized fields (country, current balance, total number of deposits, registration date, etc.).

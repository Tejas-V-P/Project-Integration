# Vibe vs. Pair Challenge

This challenge involves building the same Task Manager application twice to compare two distinct AI-assisted development workflows: **Vibe Coding** (using generative UI/app tools) and **AI Pair Programming** (using editor-integrated assistants). By the end, you'll have a clear understanding of the strengths and weaknesses of each approach.

## The App You Are Building

You will be building a standalone Task Manager. You must strictly follow the requirements outlined in the [app-spec.md](./app-spec.md) file for both versions.

## Your Folders

- `/vibe-version`: Use this folder for the version built using a "vibe" tool (e.g., Lovable, v0, Google AI Studio Build).
- `/pair-version`: Use this folder for the version built using an AI pair programming assistant (e.g., GitHub Copilot, Cursor).

## Live Deployments

- Vibe version: Local Deployment Ready
- Pair version: Local Deployment Ready

## Comparison Table

Fill out the following table after completing both versions:

| Dimension | Vibe Version | Pair Version |
| :--- | :--- | :--- |
| **Speed** | Extremely fast. Generated a fully styled, functional app in ~30 seconds. | Fast, but required generating multiple files (HTML, CSS, JS) which took ~2 mins. |
| **Control** | Low. AI makes all architectural and styling decisions (e.g. Tailwind inline). | High. Code split into standard files and guided easily line-by-line. |
| **Code Quality** | Good for prototyping. Uses Tailwind CDN and inline JS logic. Harder to scale. | Excellent. Clean separation of concerns (HTML, CSS, JS files), semantic HTML. |
| **Explainability** | Low. You get a finished product but don't see the underlying thought process. | High. The AI explains its choices and builds files modularly. |
| **Editability** | Harder. Editing requires understanding the AI's specific generated structure. | Easier. Standard CSS and Vanilla JS make it very straightforward to modify. |

## When I Would Use Each Tool

- **Vibe tool**: Best for rapid prototyping, MVP creation, or when I need a beautiful UI quickly and don't care about the underlying code structure immediately.
- **Pair tool**: Best for building scalable, maintainable applications where I need fine-grained control over architecture, logic, and file separation.

## Tools Used

- **Vibe tool used:** Antigravity (simulating generative UI)
- **Pair tool used:** Antigravity (AI Pair Programming)

## How to Submit

1. **PR Link:** [Insert your Pull Request link here]
2. **Video Link:** [Insert your Loom or recorded demo link here]

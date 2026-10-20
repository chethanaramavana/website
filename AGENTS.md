# Project instructions

## Canonical workspace

Use `C:\Users\cheth\OneDrive\Documents\ChatGPT\Ramavana Mathematical Centre` as the single local project folder. The former Downloads folder was consolidated here on 20 October 2026. Its two reference PDFs now live in `materials/reference-papers/Grade 12 CBSE/`.

The GitHub remote is `git@github.com:chethanaramavana/website.git`. Preserve the existing repository and history. The existing Sites project identity is in `.openai/hosting.json`; the live custom domain is https://ramavanamath.com.

## Design

Read `DESIGN.md` before changing website aesthetics. Follow later explicit owner decisions when they update the guide. Use imagegen for decorative artwork and exact SVGs for mathematical diagrams. Preserve the crest; background removal from the supplied header crest is explicitly authorised.

## GitHub synchronisation

The owner requests periodic pushes to GitHub during project work. Commit and push after meaningful, validated milestones and at the end of a change session when there are completed changes. For long tasks, push coherent checkpoints rather than leaving a large backlog until the end. This is a working convention, not a scheduled automation.

Before committing, inspect the diff and working tree. Stage only relevant project changes; preserve unrelated user work. Exclude secrets, credentials, local runtime state and generated build output. Use clear commit messages and appropriate checks. Push the working branch to its existing upstream, or set an upstream for a newly created branch. Never force-push, rewrite history or resolve divergence destructively without explicit owner authorisation.

Verify the push and report its result. If authentication, network access or permissions block synchronisation, retain the local work and state the exact limitation; do not claim the repository is synced based only on a cached tracking branch.

## Reference materials

`materials/` is intentionally excluded from Git as local teaching source material. Keep the reference PDFs there and do not publish them as website assets. Tell the owner that these local-only materials are not included in a GitHub push.

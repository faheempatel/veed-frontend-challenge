# Veed Frontend Coding Challenge V2

## Background

Hi there! First of all, thank you for your time in reviewing this :)

To give you some background information, this is a [Next.js 13](https://nextjs.org/) project. If you are already familiar with it you should be ok with navigating the project, but if not, you will find most of my code under `/src/app`.

The files you will mainly want to look at are:

- `page.tsx` (named aptly so due to Next.js 13 conventions)
- `repoList.tsx`
- `repoCell.tsx`
- `filters.tsx`

There is also an `error.tsx` which is a file that follows [Next.js 13 conventions](https://nextjs.org/docs/app/building-your-application/routing/error-handling) that allows for graceful handling of any runtime errors.

## Getting Started

First, install all dependencies:

```bash
npm install
```

Then, create a production build:

```bash
npm run build
```

Finally, start the production server:

```bash
npm run start
```

**Note:** If you would like to run a development server, you should run the following instead:

```bash
npm run dev
```

You can then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tests

The test spec can be found under: `cypress/e2e/repoList.cy.ts`.

And if you would like to run said tests:

```bash
npm run cypress
```

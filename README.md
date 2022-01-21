# Olive Helps: RxNav Example Loop

This is an Olive Helps loop used to look up drug information through the National Library of Medicine's publicly available [RxNav API](https://lhncbc.nlm.nih.gov/RxNav/APIs/RxNormAPIs.html).

The purpose of this repo is for new loop authors to see the code used to build a production-ready loop. This example loop assumes some familiarity with Node, Typescript, and React, but attempts to explain concepts in a way that anyone with that familiarity can apply it to work within the Olive Helps platform. For more in-depth explanations and walkthroughs of developing for the Olive Helps platform, please visit the [official Olive Helps developer documentation hub](https://docs.oliveai.dev/).

Some specific concepts used in this loop that that will be helpful to read about:

- [Network aptitude](https://docs.oliveai.dev/aptitudes/network)
- [UI aptitude](https://docs.oliveai.dev/aptitudes/ui)
- [JSX Whispers](https://docs.oliveai.dev/aptitudes/whisper/jsx-whispers)

---

## Requirements

For development, you will need Node.js and the Olive Helps application installed on your machine.

### Node

Go to the [official Node.js website](https://nodejs.org) and follow the instructions for your operating system.

If the installation was successful, you should be able to run the following commands:

```console
$ node --version
v16.3.2

$ npm --version
8.3.0
```

- ### Updating `npm`

  If your `npm` version is out of date, use the following command:

  ```console
  $ npm install npm -g
  ```

### Olive Helps

Go to the [official Olive Helps installation guide](https://docs.oliveai.dev/olive-helps/platform/installation) and follow the instructions for your operating system.

If installation was successful, launching the Olive Helps application should open the sidebar on the right side of your screen.

- ### Become a Loop Author

  In order to install and test the loop on your machine, you have to register to be an official loop developer (known as a "Loop Author"). Follow the ["Become a Loop Author" guide](https://docs.oliveai.dev/ldk/your-first-loop/become-a-loop-author) to see how.

---

## Install

```console
$ git clone https://github.com/open-olive/rxnav-example-loop
$ cd rxnav-example-loop
$ npm install
```

## Test and Build

```console
$ npm run lint          # Run ESLint & Prettier to check for issues
$ npm run lint:fix      # Fix all auto-fixable issues

$ npm run test          # Run Jest unit tests
$ npm run test:coverage # Run Jest unit tests with coverage report

$ npm run build         # Build the loop to be installed in Olive Helps
```

## Run

Now that the loop is built, you can install it locally to your Olive Helps to see it in action. Follow the ["Local Loop Installation" guide](https://docs.oliveai.dev/ldk/your-first-loop/local-loop-installation) to see how.

---

## _Legal Disclaimer_

_This product uses publicly available data from the U.S. National Library of Medicine (NLM), National Institutes of Health, Department of Health and Human Services; NLM is not responsible for the product and does not endorse or recommend this or any other product._

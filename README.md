# Githapp

Small application where a recruiter user can register candidate users with their Github username so they can list and filter their public repositories for evaluating purposes

## Stack

Built with [React-Native](http://facebook.github.io/react-native/) using [React Native UI Kitten](https://akveo.github.io/react-native-ui-kitten/) as main UI library. It's written in typescript and uses several support libraries like axios for http, color for color managements, lodash for utilities, etc.

## Known Issues

In the repositories listing, when an item is tapped the modal sometimes shows up miss-aligned the first time, after closing it and opening it again it shows correctly. This seems to be an issue with the Modal component from the UI Library used.

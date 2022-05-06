# About

This directory contains data necessary for the application to run.

---
### Consent_O_Matic

The source code of the [**Consent-O-matic**](https://github.com/cavi-au/Consent-O-Matic) browser extension. This extension is responsible for automatically detecting consent forms and granting or denying consent. It is loaded in the crawling application in order to fully automate the process. Currently, this extension works for some popular Consent Management Providers (CMPs).

Its implementation can be found [**here**](https://github.com/cavi-au/Consent-O-Matic/tree/master/Extension). Documentation about its implementation and the way the extension and its rules work, is available in the [**README**](https://github.com/cavi-au/Consent-O-Matic/blob/master/README.md) file.

The extension can be configured to accept specific data processing purposes. This configuration is available in `Data/Consent_O_Matci/GDPRConfig.js`. Using the `GDPRConfig.defaultValues` object, the user is able to select which data processing purposes they want to accept. There is a label and a description for each data processing purpose. In order to follow a **Reject All** scenario, each value in this object should be set to `false`. Similarly, for **Accept All**, all values should be set to `true`.

Version Info:
* **Commit**: 7d7fd2bd6bf2b662350b0eaeca74db6eba155efe
* **Date**: Sep 14, 2021

---
### EnglishDictionary

This directory contains a JSON file with words of the English dictionary. It is used to remove cookie values which are english words, and therefore, cannot uniquely identify users. This file has been generated using [**GNU Aspell**](http://aspell.net/), a popular open-source spell-checking tool. Currently, it created over 124,000 entries.

To create a new version of the dictionary:

```bash
aspell -d en dump master | aspell -l en expand | awk '{ print tolower($0) }' | sort | uniq > dictionary.dat
```
# ConsentGuard

## About

A variation of this tool was used in the following project. If you use this tool or its source code in any way, please cite our work.

Emmanouil Papadogiannakis, Panagiotis Papadopoulos, Nicolas Kourtellis, and Evangelos P Markatos, "[**User Tracking in the Post-cookie Era: How Websites Bypass GDPR Consent to Track Users**](https://arxiv.org/pdf/2102.08779.pdf)", In Proceedings of the Web Conference 2021, pages 2130-2141, April 2021.

```
@inbook{10.1145/3442381.3450056,
  title = {User Tracking in the Post-Cookie Era: How Websites Bypass GDPR Consent to Track Users},
  author = {Papadogiannakis, Emmanouil and Papadopoulos, Panagiotis and Kourtellis, Nicolas and Markatos, Evangelos P.},
  year = {2021},
  isbn = {9781450383127},
  publisher = {Association for Computing Machinery},
  address = {New York, NY, USA},
  url = {https://doi.org/10.1145/3442381.3450056},
  booktitle = {Proceedings of the Web Conference 2021},
  pages = {2130–2141},
  numpages = {12}
}
```

The paper can be found:
* [https://doi.org/10.1145/3442381.3450056](https://doi.org/10.1145/3442381.3450056)
* Open-access version in [arXiv](https://arxiv.org/abs/2102.08779)

## Introduction

During the past few years, mostly as a result of the GDPR and the CCPA, websites have started to present users with **cookie consent banners**. These banners are web forms where the users can state their preference and declare which cookies they would like to accept, if such option exists. Although requesting consent before storing any identifiable information is a good start towards respecting the user privacy, previous research has shown that websites do not always respect user choices. Furthermore, considering the ever decreasing reliance of trackers on cookies and actions browser vendors take by blocking or restricting third-party cookies, we anticipate a world where **stateless tracking** emerges, either because trackers or websites do not use cookies, or because users simply refuse to accept any.

In this paper, we explored whether websites use more persistent and sophisticated forms of tracking in order to track users who said they do not want cookies. Such forms of tracking include **first-party ID leaking**, **ID synchronization**, and **browser fingerprinting**. Our results suggest that websites do use such modern forms of tracking even before users had the opportunity to register their choice with respect to cookies. To add insult to injury, when users choose to raise their voice and reject all cookies, user tracking only intensifies. As a result, users' choices play very little role with respect to tracking: we measured that more than 75% of tracking activities happened before users had the opportunity to make a selection in the cookie consent banner, or when users chose to reject all cookies.

## Description

This is a **fully automated** tool which can be used to investigate sophisticated tracking actions taken by websites based on the user's consent. It can be used to record the following tracking mechanisms:
* First-party ID leaking
* ID synchronization
* Browser Fingerprinting

Additionally, this tool can automatically perform one of the following three actions when a consent form is detected:
* **Accept All**: grant consent for all data processing purposes to all third-parties residing in the visited website.
* **Reject All**: deny consent for all data processing purposes
to all third-parties residing in the visited website.
* **No Action**: avoid interacting with the form in any way

The tool consists of two modules:

1. **Crawler**: This module is responsible for visiting the landing page of a website and emulating a real user. This module stores, for each website, a Cookiejar (for both first-party and third-party cookies), HTTP(S) requests, JS function calls and CMP info.

2. **Detector**: This module is used to perform an offline analysis on the collected data. It examines stored cookies and application-level network traffic in order to detect First-party ID leaking and ID synchronization. Additionally, it utilizes JavaScript call frames to detect Browser Fingerprinting.

**Disclaimer**: In order to detect consent forms and automatically grant or deny consent, we make use of the [Consent-O-matic](https://github.com/cavi-au/Consent-O-Matic) tool. We are not the developers of this extension and we **are not responsible** for its behavior or correctness. The Web is a dynamic ecosystem and if this extension is not actively maintained, automatic actions on consent forms will not be posible.

## Notes

* More instructions on how to configure the interaction with the consent banner (i.e. accepted data processing purposes) can be found in `Data/README.md`

* This project is publicly available in order to contribute to the scientific community and to support further research on this topic.

* We believe that this can be an auditing tool for regulators, stakeholders and privacy-policy makers, for verifying compliance with the GDPR, ePrivacy Directive, and users' privacy rights.

## Prerequisites

Required Software:
* Node.js (tested with version v12.22.7)
* npm (tested with version 6.14.15)

Required Hardware:
* N/A

Required Files:
* *See Project Structure*

## Installation

To download the project:
```bash
git clone https://gitlab.com/papamano/consent-guard.git
```

To install the required modules:
```bash
cd consent-guard/Source/Crawler
npm install
```

## Project Structure

```
.
├── Data/
├── Documentation/
├── Source/
├── .gitignore
├── ACKNOWLEDGEMENTS.md
├── EULA.pdf
├── LICENSE
└── README.md
```

* Data: Data necessary for the project to work
* Documentation: Documents related to this tool
* Source: Source code of developed applications

## Execution

In order to crawl a website and collect data:
```bash
cd Source/Crawler
node app <website_url>
```

To perform an offline analysis on the collected data and detect consent violations:
```bash
cd Source/Detector
node app <data_directory>
```

## Lines of Code

| Version     | Files       | Code        | Comments    | Blank Lines |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| v1.0        | 28          | 1572        | 222         | 375         |

## Roadmap

See the open issues for a list of proposed features and known issues.

## Contributors

* [Papadogiannakis Manos](https://gitlab.com/papamano/)

## Support

Please contact one of the project's contributors.

## License

This project is released under under the Mozilla Public License Version 2.0

Make sure you read the provided End-User License Agreement (EULA).
By installing, copying or otherwise using this Software, you agree to be bound
by the terms of the provided End EULA
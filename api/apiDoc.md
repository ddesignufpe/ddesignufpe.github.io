# dDesign - API
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Firebase](https://img.shields.io/badge/firebase--cli-%5E3.17.4-yellow.svg)

## Why this Api?
The purpose of this api is to provide UFPE design study groups

> Turn this database into an api that presents me with this data so I can use it anyway: In a website, app, etc. (Jônathas Souza)

## Authors
🎅 [Ítalo Sousa](https://github.com/ItaloSa/ "Italo Sousa's Github")

## Usage
The API root URL: https://us-central1-ddesign-3b3a1.cloudfunctions.net/api/

## Latest Updates
~ will appears here :)

## Methods

### 1. Get Courses

    This method returns all courses

    **REQUEST**

    | Method | URL          |
    |--------|--------------|
    | GET    | api/cadeiras |


    **RESPONSE**

    | Status | Response                                                                        |
    |--------|---------------------------------------------------------------------------------|
    | 200    | Response will be an object containing the list of recipes (array) - [Example 1] |
    | 500    | {error: 'Courses can not be loaded', code: 'ECF01'}                             |


    Example 1:

    ```Json
    {
        "-L64bB8Navv2lEWmDlEA": {
            "ciclo": "Básico",
            "code": "DD001",
            "eixo": "obrigatorio",
            "ementa": "",
            "local": "Auditório",
            "name": "História do Design",
            "siga": "",
            "teacher": "Oriana Duarte",
            "vagas": "40"
        },
        "-L64bBKbhP9RPs4BZ4v9": {...},
        "-L64bBX4Kxr0T5cKaeuc": {...}, 
        ...
    }   
    
    ```

### 2. Get Courses by Key

    This method returns a specific course, which was provided its key

    **REQUEST**

    | Method | URL                        |
    |--------|----------------------------|
    | GET    | api/cadeiras/<key_cadeira> |

    | Type      | Params        | Values |
    |-----------|---------------|--------|
    | URL_PARAM | <key_cadeira> | string |

    **RESPONSE**

    | Status | Response                                           |
    |--------|----------------------------------------------------|
    | 200    | Response will be an object - [Example 2]           |
    | 404    | {error: 'Course not found'}                        |
    | 500    | {error: 'Course can not be loaded', code: 'ECF02'} |

    ```Json
    {
        "ciclo": "Básico",
        "code": "DD001",
        "eixo": "obrigatorio",
        "ementa": "",
        "local": "Auditório",
        "name": "História do Design",
        "siga": "",
        "teacher": "Oriana Duarte",
        "vagas": "40"
    }
    ```

## Conventions
  * **Status** - HTTP status code of response.
  * All the possible responses are listed under ‘Responses’ for each method. Only one of them is issued per request server.
  * All response are in JSON format.
  * The type of values accepted for a request parameter are shown the the values column
export default {
    namespace: 'learnerProfile',
    state:
    {
        activeTab: "",
        data: {
            "id": 0,
            "name": "string",
            "nickname": "string",
            "isMentor": true,
            "gender": "string",
            "status": "string",
            "birthday": "string",
            "mainPersonalIdType": "string",
            "mainPersonalId": "string",
            "age": 0,
            "ethnicity": "string",
            "phoneNumber": "string",
            "dateOfRegistration": "string",
            "reasonOfRegistration": "string",
            "previousStatus": "string",
            "dateOfLeave": "string",
            "reasonOfLeave": "string",
            "destinationOfLeave": "string",
            "notes": [
                "string"
            ],
            "mentorship": {},
            "salaryCard": "string",
            "custodianInfo": [{
                "name": "Amanda",
                "relationship": "老板"
            }],
            "emergentContact": [
                {
                    "name": "莫一夫",
                    "number": "13666666666"
                }
            ],
            "weChatContact": "string",
            "QQ": "string",
            "mailAddress": "string",
            "email": "string",
            "medicalInfo": {
                "generalHealthStatus": 0,
                "bloodType": "string",
                "lastPhysicalExam": 0,
                "previousDiagnosis": [
                    {
                        "nameOfDiagnosis": "string",
                        "hospitalOfDiagnosis": "string"
                    }
                ],
                "regularMedication": [
                    {
                        "nameOfMedication": "string",
                        "instructionOfMedication": "string"
                    }
                ],
                "foodAlergy": {
                    "lactoseIntolerance": true,
                    "eggAllergy": true,
                    "fishAllergy": true,
                    "shellAllergy": true,
                    "peanutAllergy": true,
                    "soyBeanAllergy": true,
                    "nutAllergy": true,
                    "wheatAllergy": true,
                    "otherFoodAllergy": [
                        "string"
                    ]
                },
                "medicationAllergy": {
                    "antibioticsAllergy": true,
                    "sulfonamidesAllergy": true,
                    "painkillerAllergy": true,
                    "anestheticAllergy": true,
                    "vaccineAllergy": true,
                    "otherMedicationAllergy": [
                        "string"
                    ]
                }
            }
        }
    },
    reducers: {
        setField(state, action) {
            console.log("此处action", action)
            const {name, value} = action;
            let obj = {};
            obj[name] = value;
            let newState = Object.assign({}, state, obj);
            return Object.assign({}, newState, {dirty: true});
        },
        batchSetField(state, action) {
            const {fields} = action;
            let obj = {};
            fields.map(f => (obj[f.name] = f.value));
            let newState = Object.assign({}, state, obj);
            return Object.assign({}, newState, {dirty:true});
        },
        // reset(state, action) {
        //     let newState = Object.assign({}, state, state.)
        // }

    },
    effects: {
    }

}
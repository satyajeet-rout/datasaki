export const chatBotResponse = (stage)=>{
    
    if(stage === "Initial"){
        return [
            {
                "type": "text",
                "message": "Hi I am Datasaki, your Data Science Bot"
            }, {
                "type": "text",
                "message": "To Start ur process plese select dataset first"
            }, {
                "type": "button",
                "message": "upload"
            },
            {"next_stage": "data_selection"}
        ]
    }
    else if(stage==="data_selection"){
        return  [	
            {
                "type": "text",
                "message": "Your Dataset has been collected and i can see that your dataset is realated to finance industry"
            }, {
                "type": "text",
                "message": "If it is realted to other industry please let me know i will update accordingly"
            },
            {
                "next_stage": "industry_update",
            }
        ]
    }
    else if(stage==="industry_update"){
        return    [{
            "type": "text",
            "message": "Thank you for the information, i have updated your industry to Banking"
        },
        {
            "type": "text",
            "message": "Here is the deatails of your dataset",
            "totalRows": 1000,
            "dataset":[
                {
                    " dtype ": " string ",
                    " is_categorical ": true,
                    " name ": " checking_balance ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                },
                {
                    " dtype ": " int64 ",
                    " is_categorical ": false,
                    " name ": " months_loan_duration ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                },
                {
                    " dtype ": " string ",
                    " is_categorical ": true,
                    " name ": " credit_history ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                },
                {
                    " dtype ": " string ",
                    " is_categorical ": true,
                    " name ": " purpose ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                },
                {
                    " dtype ": " int64 ",
                    " is_categorical ": false,
                    " name ": " amount ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                },
                {
                    " dtype ": " string ",
                    " is_categorical ": true,
                    " name ": " savings_balance ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                },
                {
                    " dtype ": " string ",
                    " is_categorical ": true,
                    " name ": " employment_duration ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                },
                {
                    " dtype ": " int64 ",
                    " is_categorical ": true,
                    " name ": " percent_of_income ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                },
                {
                    " dtype ": " int64 ",
                    " is_categorical ": true,
                    " name ": " years_at_residence ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                },
                {
                    " dtype ": " int64 ",
                    " is_categorical ": false,
                    " name ": " age ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                },
                {
                    " dtype ": " string ",
                    " is_categorical ": true,
                    " name ": " other_credit ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                },
                {
                    " dtype ": " string ",
                    " is_categorical ": true,
                    " name ": " housing ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                },
                {
                    " dtype ": " int64 ",
                    " is_categorical ": true,
                    " name ": " existing_loans_count ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                },
                {
                    " dtype ": " string ",
                    " is_categorical ": true,
                    " name ": " job ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                },
                {
                    " dtype ": " int64 ",
                    " is_categorical ": true,
                    " name ": " dependents ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                },
                {
                    " dtype ": " string ",
                    " is_categorical ": true,
                    " name ": " phone ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                },
                {
                    " dtype ": " string ",
                    " is_categorical ": true,
                    " name ": " default ",
                    " feature_use ": " sfsdfsdgsdgsdgsgsgsg "
                }
            ]
        },
        {
            "type": "text",
            "message": "Now could you let me know what you wana predict from your dataset so we can select the target"
        },
        {"next_stage": "Target_Selection"}
    ]
    }
    else if(stage==="Target_Selection"){

        return [{
            "type": "text",
            "message": "Based on you query the suggested target is",
        }, {
            "type": "button",
            "action": "default",
            "credit_balance":"",
            "button_text":"Credit Balance",
        }, {
            "type": "select",
            "action": [" months_loan_duration "," credit_history ",
              " purpose ",
              " amount ",
              " savings_balance ",
              " employment_duration ",
              " percent_of_income ",
              " years_at_residence ",
              " age ",
              " other_credit ",
              " housing ",
              " existing_loans_count ",
              " job ",
              " dependents ",
              " phone "
            ]
        },
        {"next_stage": "target_set"}
    ]

    }
    else if(stage==="target_set"){
        return [{
            "type": "text",
            "message": "Traget has been set",
        }, {
            "type": "text",
            "message": "Now we will clean feature one by one",
        },
        {"next_stage": "feature_cleanning"}
    ]
    }
    
    
}
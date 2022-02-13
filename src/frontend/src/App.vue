<template>
    <div id="app">
        <h3 class="is-size-6 mb-3"><strong>Configuration:</strong></h3>

        <div v-if="ui.currentTab == 'is_setup'">
            <div class="columns">

                <div class="column">
                    <field
                        label="Dataset"
                        type="select"
                        v-model="config.is_dataset"
                        :options="datasets"
                        :cssClasses="[datasets ? '' : 'is-loading']"
                    />
                </div>

                <div class="column">
                    <field
                        label="IS Action"
                        type="text"
                        placeholder="EG: JBIS_Action"
                        v-model="config.is_action"
                    />
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <field
                        label="IS Identity Attribute"
                        type="text"
                        placeholder="EG: sfmcContactKey"
                        v-model="config.is_identity_attribute_name"
                    />
                </div>
                <div class="column">
                    <field
                        label="UserID field"
                        type="select"
                        v-model="config.is_identity_attribute_value"
                        :options="{'{{Contact.Key}}': 'SubscriberKey', '{{InteractionDefaults.Email}}': 'Email'}"
                    />
                </div>
            </div>

            <div class="columns">
                <div class="column is-half">
                    <a :class="[ui.isTesting ? 'is-loading' : '', 'button is-info is-small is-fullwidth']" @click="sendTestAction()">Validate Activity and update Output Parameters</a>
                </div>
            </div>
        </div>

        <h3 class="is-size-6 mt-5 mb-5"><strong>Activity Output:</strong></h3>


        <div class="is-flex is-flex-wrap-wrap">
            <div class="tile is-6 mb-4" v-for="arg in outputArguments" :key="arg">
                <p class="mb-2">
                    <span class="tag is-link" v-html="'{{Interaction.' + (activity?.key || '') + '.' + arg + '}}'"></span> 
                </p>
                <p>
                    <span class="tag is-link is-light">{{testData[arg] || "NO VALUE"}}</span>
                </p>
            </div>
        </div>

    </div>
</template>

<script>
import Postmonger from "postmonger";

import Field from "./components/Field.vue";

export default {
    name: "App",

    data: () => {
        return {
            connection: null,
            activity: null,
            token: null,
            endpoints: null,
            datasets: null,

            outputArguments: [],

            testData: {},
            testUserId: "",

            config: {
                is_dataset: "",
                is_action: "",
                is_identity_attribute_name: "",
                is_identity_attribute_value: "",
            },

            ui: {
                currentTab: "is_setup",
                currentTabIndex: 0,
                isTesting: false,

                steps: [
                    { label: "IS Setup", key: "is_setup", active: false }
                ],
            },
        };
    },

    methods: {
        init: function (activity) {
            this.activity = activity;
            this.getArgumentValues(activity);
            this.readActivityOutputArguments(activity);
        },
        
        getDatasets: function(){
            this.waitForTokenAndEndpoints().then(() => {
                fetch('/utils/datasets', {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: { 'Content-Type': 'application/json' },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({
                        token: this.token,
                        endpoints: this.endpoints
                    })
                })
                .then(response => response.json())
                .then(data => {
                    this.datasets = data;
                });
            });
        },

        sendTestAction: function(){
            this.ui.isTesting = true;
            let userId = window.prompt('Which UserId (SubscriberKey / EmailAddress) would you like to use for this test? Click "Cancel" to use default values', 'test_jbis@test.test');

            fetch('/utils/test', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    token: this.token,
                    endpoints: this.endpoints,
                    inArguments: [
                        { is_dataset: this.config.is_dataset },
                        { is_action: this.config.is_action },
                        { is_identity_attribute_name: this.config.is_identity_attribute_name },
                        { is_identity_attribute_value: userId || "test_jbis@test.test" }
                    ]
                })
            })
            .then(response => response.json())
            .then(data => {
                this.updateActivityOutputArguments(data);
                this.testData = data;
                return data;
            })
            .catch(err => {
                alert('ERROR: ' + err.message);
            })
            .finally(() => {
                this.ui.isTesting = false;
            });
        },

        readActivityOutputArguments: function(activity){
            if(activity?.arguments?.execute?.outArguments === undefined){
                return;
            }
            
            for(const arg of activity.arguments.execute.outArguments){
                if(arg && Object.keys(arg).length > 0) this.outputArguments.push(Object.keys(arg)[0]);
            }
        },

        updateActivityOutputArguments: function(campaignResponseData){
            if(this?.activity?.metaData === undefined){
                return;
            }
            
            const outArguments = this.activity.arguments.execute.outArguments = [];
            const outArgumentsSchema = this.activity.schema.arguments.execute.outArguments = [];

            this.outputArguments = [];

            for(let prop in campaignResponseData){
                const outArg = {};
                const outSchemaArg = {}

                outArg[prop] = "";
                outSchemaArg[prop] =  { "dataType": "Text", "direction": "out", "access": "visible" };

                outArguments.push(outArg);
                outArgumentsSchema.push(outSchemaArg);
                this.outputArguments.push(prop);
            }
        },

        saveAndClose: function () {
            if (this?.activity?.metaData === undefined) {
                return;
            }

            this.setArgumentValues();
            this.activity.metaData.isConfigured = true;
            
            this.connection.trigger("updateActivity", this.activity);
            this.connection.trigger("requestInspectorClose");
        },

        getArgumentValues: function (activity) {
            if (activity?.arguments?.execute?.inArguments === undefined) {
                return;
            }

            for (let a of activity?.arguments?.execute?.inArguments) {
                for (let prop in a) {
                    if (this.config[prop] !== undefined) {
                        this.config[prop] = a[prop];
                    }
                }
            }
        },

        setArgumentValues: function () {
            if (this?.activity?.arguments?.execute?.inArguments === undefined) {
                return;
            }

            for (let a of this?.activity?.arguments?.execute?.inArguments) {
                for (let prop in a) {
                    if (this.config[prop] !== undefined) {
                        a[prop] = this.config[prop];
                    }
                }
            }
        },

        log: function (data) {
            console.log("LOG", JSON.stringify(data, null, 2));
        },

        waitForTokenAndEndpoints: function(){
            return new Promise((resolve) => {
                const now = new Date().getTime();

                if(this.token && this.token.expires > now){
                    resolve(this.token);
                }
                else{
                    this.token = null;

                    this.connection.trigger("requestTokens");
                    this.connection.trigger("requestEndpoints");
                    
                    const getTokenInterval = setInterval(() => {
                        if(this.token && this.endpoints){
                            clearInterval(getTokenInterval);
                            resolve(this.token);
                        }
                    }, 100);
                }
            });
        },

    },

    mounted: function () {
        this.connection = new Postmonger.Session();
        
        this.connection.on("initActivity", this.init);
        this.connection.on("requestedTokens", (data) => { this.token = data; });
        this.connection.on("requestedEndpoints", (data) => { this.endpoints = data; });
        this.connection.on("clickedNext", () => { this.saveAndClose(); });

        this.getDatasets();
        this.connection.trigger("ready");
    },

    components: {
        Field,
    },
};
</script>

<style>
#app {
    padding: 10px;
    margin: 0px auto;
    max-width: 800px;
}
h5 {
    padding: 10px 0px 5px 0px;
    margin: 0px;
}
input {
    width: 100%;
    padding: 3px;
    box-sizing: border-box;
}
div.tile { display: block !important; }
</style>

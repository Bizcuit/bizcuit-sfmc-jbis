<template>
	<div id="app">
		<h3 class="is-size-6 mb-3"><strong>Configuration:</strong></h3>

		<div v-if="ui.currentTab == 'is_setup'">
			<div class="columns">
				<div class="column">
					<field
						label="Account and region"
						type="text"
						placeholder="EG: cumulus.germany-2"
						:value.sync="config.is_account"
					/>
				</div>
				<div class="column">
					<field
						label="Dataset"
						type="text"
						placeholder="EG: engage"
						:value.sync="config.is_dataset"
					/>
				</div>

			</div>

			<div class="columns">
				<div class="column is-one-quarter">
					<field
						label="UserID field"
						type="select"
						placeholder="EG: abcdef"
						:value.sync="config.is_userid_field"
						:options="['SubscriberKey', 'Email']"
					/>
				</div>
				<div class="column">
					<field
						label="IS Authentication Config"
						type="password"
						placeholder="Format - [YOUR_API_Key_ID]:[YOUR_API_Key_Secret]"
						:value.sync="config.is_token"
					/>
				</div>
			</div>

			<div class="columns">
				<div class="column is-one-quarter">
					<field
						label="IS Action"
						type="text"
						placeholder="EG: JB_ACTION"
						:value.sync="config.is_action"
					/>
				</div>
				<div class="column">
					<field
						label="IS Campaign Name"
						type="text"
						placeholder="EG: JB_CAMPAIGN"
						:value.sync="config.is_campaign"
					/>
				</div>
				<div class="column is-one-quarter">
					<label class="label is-small">Test configuration</label>
					<a :class="[ui.isTesting ? 'is-loading' : '', 'button is-info is-small is-fullwidth']" @click="sendTestAction()">Send Action</a>
				</div>
			</div>
		</div>

		<h3 class="is-size-6 mt-5"><strong>Output substitution strings:</strong></h3>

		<div class="tags mt-3">
			<span class="tag is-link" v-html="'{{Interaction.' + (activity ? activity.key : '') + '.segments}}'"></span>
			<span class="tag is-link" v-html="'{{Interaction.' + (activity ? activity.key : '') + '.order}}'"></span>
			<span class="tag is-link" v-html="'{{Interaction.' + (activity ? activity.key : '') + '.userGroup}}'"></span>
			<span class="tag is-link" v-html="'{{Interaction.' + (activity ? activity.key : '') + '.recommendations}}'"></span>
			<span class="tag is-link" v-html="'{{Interaction.' + (activity ? activity.key : '') + '.experience}}'"></span>
			<span class="tag is-link" v-html="'{{Interaction.' + (activity ? activity.key : '') + '.attribute}}'"></span>
			<span class="tag is-link" v-html="'{{Interaction.' + (activity ? activity.key : '') + '.attribute2}}'"></span>
			<span class="tag is-link" v-html="'{{Interaction.' + (activity ? activity.key : '') + '.attribute3}}'"></span>
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

			testUserId: "",

			config: {
				is_account: "",
				is_dataset: "",
				is_token: "",
				is_userid_field: "",
				is_action: "",
				is_campaign: "",
				is_custom_payload: "",
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
			console.log("INIT", this.activity);
		},
		

		sendTestAction: function(){
			this.ui.isTesting = true;
			let userId = window.prompt('Which UserId (SubscriberKey / EmailAddress) would you like to use for this test? Click "Cancel" to use default values', 'test_jbis@test.test');

			fetch('/actions/execute', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: { 'Content-Type': 'application/json' },
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
				body: JSON.stringify({
					inArguments: [
						{ contactKey: userId || "test_jbis" },
						{ emailAddress: userId || "test_jbis@test.test" },
						{ is_account: this.config.is_account },
						{ is_dataset: this.config.is_dataset },
						{ is_token: this.config.is_token },
						{ is_userid_field: this.config.is_userid_field },
						{ is_action: this.config.is_action },
						{ is_campaign: this.config.is_campaign }
					]
				})
			})
			.then(response => response.json())
			.then(data => {
				let message = "Status - " + data.status;

				for(let prop in data){
					if(prop !== "status" && data[prop]){
						message += '\n===============\n' + prop + " = " + data[prop];
					}
				}
				alert(message.trim());

			})
			.catch(err => {
				alert('ERROR: ' + err.message);
			})
			.finally(() => {
				this.ui.isTesting = false;
			});
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

		toggleCurrentTab: function (offset) {
			this.ui.currentTabIndex += offset;
			
			if(this.ui.currentTabIndex < 0) {
				this.ui.currentTabIndex = 0;
			}

			if(this.ui.currentTabIndex >= this.ui.steps.length){
				this.saveAndClose();
				return;
			}

			this.ui.currentTab = this.ui.steps[this.ui.currentTabIndex].key;
		},

		log: function (data) {
			console.log("LOG", data);
		},
	},

	mounted: function () {
		this.connection = new Postmonger.Session();

		this.connection.on("initActivity", this.init);
		this.connection.on("requestedTokens", this.log);
		this.connection.on("requestEndpoints", this.log);

		this.connection.trigger("ready");
		this.connection.trigger("requestTokens");
		this.connection.trigger("requestEndpoints");

		this.connection.on("clickedNext", () => {
			this.toggleCurrentTab(1);
			this.connection.trigger("nextStep");
		});

		this.connection.on("clickedBack", () => {
			this.toggleCurrentTab(-1);
			this.connection.trigger("prevStep");
		});

		this.connection.on("gotoStep", (e) => {
			this.ui.currentTab = e.key;
			this.ui.currentTabIndex = this.ui.steps.findIndex(s => s.key == e.key);
		});

		window.addEventListener('message', function(event) {
			console.log('Message received: ', event);
		});

		/*
		connection.on('initActivity', onInitActivity);
		connection.trigger('ready');
		connection.trigger('updateActivity', activity);
		connection.trigger('setActivityDirtyState', false);
		connection.trigger('requestInspectorClose');
		connection.on("requestedTokens", onGetTokens);
		connection.on("requestedEndpoints", onGetEndpoints);

		connection.on("clickedNext", onClickedNext);
		connection.on("clickedBack", onClickedBack);
		connection.on("gotoStep", onGotoStep);
		connection.trigger("ready");

		connection.trigger("requestTokens");
		connection.trigger("requestEndpoints");
		connection.trigger("updateButton", {
			button: "next",
			enabled: Boolean(message),
		});
		connection.trigger("updateSteps", steps);

		{{Contact.Key}}
		*/
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
</style>
